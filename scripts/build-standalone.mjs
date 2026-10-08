/**
 * Builds a single self-contained HTML file of the homepage — for offline review
 * or for sharing a preview when a live link is not available.
 *
 * Everything the page needs is inlined: the bundle as a classic script (so it
 * runs from file:// without module/CORS restrictions), the stylesheet, and the
 * portrait as a data URI. Remote assets (fonts, brand marks) load when online
 * and degrade gracefully when not.
 *
 *   npm run build:standalone  ->  anvesh-seeli-preview.html
 */
import { build } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "dist-standalone");
const target = path.join(root, "anvesh-seeli-preview.html");

await build({
  configFile: false,
  root,
  plugins: [react(), tailwindcss()],
  logLevel: "warn",
  build: {
    outDir,
    emptyOutDir: true,
    cssCodeSplit: false,
    // One chunk, so everything can be inlined.
    rollupOptions: {
      output: {
        format: "iife",
        inlineDynamicImports: true,
        entryFileNames: "app.js",
        assetFileNames: "app.[ext]",
      },
    },
  },
});

const read = (file) => fs.readFileSync(path.join(outDir, file), "utf8");
const assert = (label, condition) => {
  if (!condition) throw new Error(`standalone build failed: ${label}`);
};

let html = read("index.html");
const css = read("app.css");
let js = read("app.js");

// ---------------------------------------------------------------------------
// 1. Portrait -> data URI
//
// Match the quoted JS string literal, never a bare path: the head also contains
// "https://anveshseeli.com/anvesh-seeli.jpg" in the JSON-LD, and a substring
// match would splice base64 into the structured data.
// ---------------------------------------------------------------------------
const portrait = fs
  .readFileSync(path.join(root, "public", "anvesh-seeli.jpg"))
  .toString("base64");
const dataUri = `data:image/jpeg;base64,${portrait}`;
const portraitRef = '"/anvesh-seeli.jpg"';

assert("portrait referenced exactly once in the bundle", js.split(portraitRef).length === 2);
js = js.replaceAll(portraitRef, JSON.stringify(dataUri));
assert("portrait inlined into the bundle", js.includes(dataUri));
assert("no raw portrait path left in the bundle", !js.includes(portraitRef));

// ---------------------------------------------------------------------------
// 2. Escape any "</script" inside the bundle so it cannot close the tag early.
// ---------------------------------------------------------------------------
const safeJs = js.replaceAll("</script", "<\\/script");

// ---------------------------------------------------------------------------
// 3. Inline the stylesheet, and the bundle at the END OF <body>.
//
// Vite emits the bundle as a module in <head>. Module scripts are deferred until
// the document is parsed, but an inline classic script runs the moment it is
// reached — in <head> that is before #root exists, and createRoot() throws.
// Placing it after #root restores the ordering the module script had.
//
// NB: replace() takes a function, not a string — a minified "$&" or "$'" in the
// CSS/JS would otherwise be treated as a replacement pattern.
// ---------------------------------------------------------------------------
assert("stylesheet link found", /<link rel="stylesheet"[^>]*href="[^"]*app\.css"[^>]*>/.test(html));
html = html.replace(
  /<link rel="stylesheet"[^>]*href="[^"]*app\.css"[^>]*>/,
  () => `<style>\n${css}\n</style>`,
);

assert("bundle script tag found", /<script[^>]*src="[^"]*app\.js"[^>]*><\/script>/.test(html));
html = html.replace(/<script[^>]*src="[^"]*app\.js"[^>]*><\/script>/, "");
html = html.replace("</body>", () => `  <script>\n${safeJs}\n  </script>\n  </body>`);

// ---------------------------------------------------------------------------
// 4. Drop the icon/manifest links, which only resolve on the deployed origin.
// ---------------------------------------------------------------------------
html = html
  .replace(/\s*<link rel="manifest"[^>]*>/g, "")
  .replace(/\s*<link rel="apple-touch-icon"[^>]*>/g, "")
  .replace(/\s*<link rel="icon"[^>]*>/g, "");

// ---------------------------------------------------------------------------
// 5. Verify the result.
// ---------------------------------------------------------------------------
assert("no bundle reference survived", !html.includes("app.js") && !html.includes("app.css"));
assert(
  "JSON-LD image URL untouched",
  html.includes('"image": "https://anveshseeli.com/anvesh-seeli.jpg"'),
);
assert(
  "no base64 spliced into structured data",
  !/https:\/\/anveshseeli\.comdata:/.test(html),
);
assert(
  "inline script sits after #root",
  html.indexOf("<script>") < 0 || html.lastIndexOf(safeJs.slice(0, 200)) > html.indexOf('id="root"'),
);
for (const required of [
  "<title>Anvesh Seeli | Performance Marketing & Growth Consultant</title>",
  'rel="canonical" href="https://anveshseeli.com"',
  '"FAQPage"',
  '"ProfessionalService"',
  "G-0SZT3K2E93",
  "hi@anveshseeli.com",
]) {
  assert(`head element kept: ${required.slice(0, 40)}`, html.includes(required));
}

fs.writeFileSync(target, html);
fs.rmSync(outDir, { recursive: true, force: true });

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} kB`;
console.log(`wrote ${path.relative(root, target)} (${kb(html.length)})`);
console.log("  stylesheet inlined");
console.log("  bundle inlined after #root");
console.log("  portrait inlined as a data URI");
console.log("  head, JSON-LD and analytics untouched");
