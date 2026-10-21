import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];

if (scripts.length === 0) {
  throw new Error("No inline <script> found in index.html");
}

for (const [, code] of scripts) {
  new Function(code);
}

console.log(`Checked ${scripts.length} inline script(s) in index.html`);
