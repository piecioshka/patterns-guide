#!/usr/bin/env node
/**
 * Kopiuje pliki bibliotek z node_modules/ do wersjonowanego katalogu vendor/,
 * żeby index.html ładował je lokalnie zamiast z CDN-u (unpkg.com).
 *
 * Katalog vendor/ jest commitowany do repo - hosting serwuje repo bez builda,
 * więc node_modules/ nie byłoby tam dostępne.
 *
 * Uruchomienie: npm run vendor
 */

import {
  copyFile,
  mkdir,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const NODE_MODULES = join(ROOT, "node_modules");
const VENDOR = join(ROOT, "vendor");

/**
 * UWAGA: bierzemy pliki z docsify/lib/, a nie z docsify/dist/. W paczce
 * docsify@5 katalog lib/ to legacy build 4.13.1 zostawiony dla zgodności,
 * a dist/ to właściwy v5. Trzymamy się lib/, bo dokładnie to serwował
 * dotychczas unpkg - podmiana na dist/ to osobna decyzja (migracja na v5).
 */

/** Pliki do skopiowania: [ścieżka w node_modules, ścieżka w vendor/] */
const ASSETS = [
  ["docsify/lib/themes/vue.css", "docsify/themes/vue.css"],
  ["docsify-dark-mode-toggle/index.css", "docsify-dark-mode-toggle/index.css"],
  ["mermaid/dist/mermaid.min.js", "mermaid/mermaid.min.js"],
  ["docsify/lib/docsify.min.js", "docsify/docsify.min.js"],
  ["docsify/lib/plugins/search.min.js", "docsify/plugins/search.min.js"],
  ["docsify/lib/plugins/emoji.min.js", "docsify/plugins/emoji.min.js"],
  [
    "docsify/lib/plugins/zoom-image.min.js",
    "docsify/plugins/zoom-image.min.js",
  ],
  [
    "docsify-copy-code/dist/docsify-copy-code.min.js",
    "docsify-copy-code/docsify-copy-code.min.js",
  ],
  [
    "docsify-updated/src/time-updater.min.js",
    "docsify-updated/time-updater.min.js",
  ],
  [
    "docsify-pagination/dist/docsify-pagination.min.js",
    "docsify-pagination/docsify-pagination.min.js",
  ],
  ["docsify-dark-mode-toggle/index.js", "docsify-dark-mode-toggle/index.js"],
  [
    "docsify-sidebar-scroll-to-active/index.js",
    "docsify-sidebar-scroll-to-active/index.js",
  ],
];

/** Paczki, których wersje trafiają do vendor/VERSIONS.json */
const PACKAGES = [
  "docsify",
  "docsify-dark-mode-toggle",
  "mermaid",
  "docsify-copy-code",
  "docsify-updated",
  "docsify-pagination",
  "docsify-sidebar-scroll-to-active",
];

async function readVersion(name) {
  const raw = await readFile(join(NODE_MODULES, name, "package.json"), "utf8");
  return JSON.parse(raw).version;
}

/** Wersja, którą build docsify raportuje w runtime (lib/ = legacy v4). */
async function readDocsifyRuntimeVersion() {
  const code = await readFile(
    join(NODE_MODULES, "docsify/lib/docsify.min.js"),
    "utf8",
  );
  const match = code.match(/version:"([0-9][^"]*)"/);
  return match ? match[1] : null;
}

async function main() {
  // Budujemy obok i podmieniamy dopiero po sukcesie, żeby nieudany przebieg
  // (np. brak node_modules) nie zostawił repo bez działającego vendor/.
  const staging = `${VENDOR}.tmp`;
  await rm(staging, { recursive: true, force: true });

  try {
    for (const [from, to] of ASSETS) {
      const src = join(NODE_MODULES, from);
      const dest = join(staging, to);
      await mkdir(dirname(dest), { recursive: true });
      await copyFile(src, dest);
      console.log(`vendor/${to}`);
    }

    const versions = {};
    for (const name of PACKAGES) {
      versions[name] = await readVersion(name);
    }
    versions["docsify (runtime z lib/)"] = await readDocsifyRuntimeVersion();
    await writeFile(
      join(staging, "VERSIONS.json"),
      JSON.stringify(versions, null, 2) + "\n",
    );
    console.log("vendor/VERSIONS.json");

    await rm(VENDOR, { recursive: true, force: true });
    await rename(staging, VENDOR);
  } catch (error) {
    await rm(staging, { recursive: true, force: true });
    throw error;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
