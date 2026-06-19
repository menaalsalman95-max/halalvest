import { existsSync, rmSync } from "fs";
import { join } from "path";

const nextDir = join(process.cwd(), ".next");

if (existsSync(nextDir)) {
  console.warn("\nClearing .next before production build...\n");
  rmSync(nextDir, { recursive: true, force: true });
}
