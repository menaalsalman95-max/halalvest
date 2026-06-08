import { existsSync, rmSync } from "fs";
import { join } from "path";

const nextDir = join(process.cwd(), ".next");

if (!existsSync(nextDir)) {
  process.exit(0);
}

const buildId = join(nextDir, "BUILD_ID");
const serverDir = join(nextDir, "server");
const buildManifest = join(nextDir, "build-manifest.json");
const packageJson = join(nextDir, "package.json");
const cacheDir = join(nextDir, "cache");

const hasProductionBuild = existsSync(buildId);
const serverExists = existsSync(serverDir);
const missingManifests = !existsSync(packageJson) || !existsSync(buildManifest);

// Production `next build` artifacts conflict with `next dev` (Turbopack chunk errors).
if (hasProductionBuild) {
  console.warn("\nClearing production .next cache before dev start...\n");
  rmSync(nextDir, { recursive: true, force: true });
  process.exit(0);
}

if (serverExists && missingManifests) {
  console.warn("\nDetected corrupted .next cache — clearing before dev start...\n");
  rmSync(nextDir, { recursive: true, force: true });
  process.exit(0);
}

// Stale partial cache from interrupted builds
if (serverExists && !existsSync(cacheDir) && missingManifests) {
  console.warn("\nDetected incomplete .next cache — clearing before dev start...\n");
  rmSync(nextDir, { recursive: true, force: true });
}
