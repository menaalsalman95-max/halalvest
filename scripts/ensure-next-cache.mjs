import { existsSync, rmSync } from "fs";
import { join } from "path";

const nextDir = join(process.cwd(), ".next");

function clearCache(reason) {
  console.warn(`\n${reason}`);
  console.warn("Clearing .next before dev start...\n");
  rmSync(nextDir, { recursive: true, force: true });
}

if (!existsSync(nextDir)) {
  process.exit(0);
}

const buildId = join(nextDir, "BUILD_ID");
const serverDir = join(nextDir, "server");
const buildManifest = join(nextDir, "build-manifest.json");
const packageJson = join(nextDir, "package.json");
const devStaticDir = join(nextDir, "static/development");
const appPathsManifest = join(nextDir, "server/app-paths-manifest.json");

const hasProductionBuild = existsSync(buildId);
const serverExists = existsSync(serverDir);
const missingRootManifests = !existsSync(packageJson) || !existsSync(buildManifest);

// Production `next build` output must not be reused by `next dev`.
if (hasProductionBuild) {
  clearCache("Production build cache detected (BUILD_ID present).");
  process.exit(0);
}

// Partial or corrupted server cache (common after build + dev overlap).
if (serverExists && missingRootManifests) {
  clearCache("Corrupted .next cache — missing build manifests.");
  process.exit(0);
}

// Turbopack/dev static cache without required server manifests (ENOENT on page manifests).
if (existsSync(devStaticDir) && serverExists && !existsSync(appPathsManifest)) {
  clearCache("Stale development cache detected — missing app-paths-manifest.json.");
  process.exit(0);
}

// Interrupted dev session leaving server routes without manifests.
if (serverExists) {
  const portfolioManifest = join(
    nextDir,
    "server/app/dashboard/portfolio/page/app-build-manifest.json"
  );
  const screenerManifest = join(nextDir, "server/app/(public)/screener/page/app-build-manifest.json");

  if (
    existsSync(join(nextDir, "server/app/dashboard/portfolio/page")) &&
    !existsSync(portfolioManifest)
  ) {
    clearCache("Corrupted route cache detected for /dashboard/portfolio.");
    process.exit(0);
  }

  if (
    existsSync(join(nextDir, "server/app/(public)/screener/page")) &&
    !existsSync(screenerManifest)
  ) {
    clearCache("Corrupted route cache detected for /screener.");
    process.exit(0);
  }
}
