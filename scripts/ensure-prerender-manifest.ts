import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { randomBytes } from "node:crypto";

const distPath = join(process.cwd(), ".next", "prerender-manifest.json");

function ensureDir(path: string) {
  mkdirSync(dirname(path), { recursive: true });
}

if (existsSync(distPath)) {
  console.log("[ensure-prerender] prerender-manifest already exists");
  process.exit(0);
}

const devManifest = join(process.cwd(), ".next", "dev", "prerender-manifest.json");

if (existsSync(devManifest)) {
  ensureDir(distPath);
  copyFileSync(devManifest, distPath);
  console.log("[ensure-prerender] copied dev manifest into production dist");
  process.exit(0);
}

function hex(bytes: number) {
  return randomBytes(bytes).toString("hex");
}

const fallbackManifest = {
  version: 4,
  routes: {},
  dynamicRoutes: {},
  preview: {
    previewModeId: hex(16),
    previewModeSigningKey: hex(32),
    previewModeEncryptionKey: hex(32),
  },
  notFoundRoutes: [],
};

ensureDir(distPath);
writeFileSync(distPath, JSON.stringify(fallbackManifest, null, 2));
console.log("[ensure-prerender] generated fallback prerender manifest");
