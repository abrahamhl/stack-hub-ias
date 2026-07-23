import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("build emits the AI Forge worker and client assets", async () => {
  await Promise.all([
    access(new URL("dist/server/index.js", root)),
    access(new URL("dist/server/wrangler.json", root)),
    access(new URL("dist/client/", root)),
  ]);

  const assets = await readdir(new URL("dist/client/assets/", root));
  assert.ok(assets.some((file) => file.startsWith("forge-dashboard-")));
  assert.ok(assets.some((file) => file.endsWith(".css")));
});

test("product source contains the control-plane contract", async () => {
  const [page, dashboard, layout, css] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/forge-dashboard.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  assert.match(page, /Centro de mando \| AI Forge/);
  assert.match(dashboard, /Construir la fábrica/);
  assert.match(dashboard, /ABRAHAM_OS/);
  assert.match(dashboard, /LOCAL SAFE/);
  assert.match(dashboard, /MCP Bridge/);
  assert.match(layout, /<html lang="es">/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width:\s*620px\)/);
  assert.doesNotMatch(page, /codex-preview|react-loading-skeleton/i);
});
