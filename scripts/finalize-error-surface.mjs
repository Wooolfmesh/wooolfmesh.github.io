import { readFile, writeFile } from "node:fs/promises";

const path = "404.html";
let html = await readFile(path, "utf8");

html = html
  .replace(/\n?\s*<link\s+rel="canonical"\s+href="[^"]+"\s*\/?>/i, "")
  .replace(/\n?\s*<meta\s+property="og:url"\s+content="[^"]+"\s*\/?>/i, "")
  .replace(/\n?\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i, "");

if (!html.includes('name="robots" content="noindex, follow"')) {
  throw new Error("404.html lost its noindex, follow directive");
}
if (/rel="canonical"/i.test(html)) {
  throw new Error("404.html still advertises a canonical URL");
}
if (/property="og:url"/i.test(html)) {
  throw new Error("404.html still advertises og:url");
}
if (/type="application\/ld\+json"/i.test(html)) {
  throw new Error("404.html still advertises structured content identity");
}

await writeFile(path, html);
console.log("Finalized 404.html as a noindex error surface without canonical, og:url, or JSON-LD identity.");
