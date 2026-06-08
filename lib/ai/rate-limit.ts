import "server-only";

/**
 * In-memory rate limiter for chat API abuse prevention.
 *
 * SECURITY: Limits requests by IP and anonymous session ID.
 * NOTE: For multi-instance production deployments, replace with Redis or
 * a distributed rate limiter (e.g. Upstash) so limits apply globally.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const ipLimits = new Map<string, RateLimitEntry>();
const sessionLimits = new Map<string, RateLimitEntry>();

/** Periodic cleanup to prevent memory leaks from stale entries */
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleEntries(store: Map<string, RateLimitEntry>) {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

function maybeCleanup() {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    cleanupStaleEntries(ipLimits);
    cleanupStaleEntries(sessionLimits);
    lastCleanup = now;
  }
}

function checkLimit(
  store: Map<string, RateLimitEntry>,
  key: string,
  maxRequests: number,
  windowMs: number
): boolean {
  maybeCleanup();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) return false;

  entry.count++;
  return true;
}

/** Extract client IP from request headers (supports reverse proxies) */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function checkRateLimit(
  ip: string,
  sessionId: string,
  limits: { perMinute: number; perSessionHour: number }
): { allowed: boolean; retryAfterSeconds?: number } {
  const ipAllowed = checkLimit(ipLimits, ip, limits.perMinute, 60_000);
  const sessionAllowed = checkLimit(
    sessionLimits,
    sessionId,
    limits.perSessionHour,
    3_600_000
  );

  if (!ipAllowed || !sessionAllowed) {
    return { allowed: false, retryAfterSeconds: 60 };
  }

  return { allowed: true };
}
