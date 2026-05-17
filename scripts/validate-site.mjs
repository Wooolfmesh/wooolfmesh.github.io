import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const required = [
  "index.html",
  "product/index.html",
  "features/index.html",
  "features/today-command-center/index.html",
  "features/tasks/index.html",
  "features/capture-inbox/index.html",
  "features/focus-sessions/index.html",
  "features/reviews/index.html",
  "features/cognitive-bites/index.html",
  "features/project-health/index.html",
  "features/signals-analytics/index.html",
  "features/local-knowledge/index.html",
  "use-cases/index.html",
  "use-cases/agentic-work-memory/index.html",
  "use-cases/local-first-personal-os/index.html",
  "use-cases/deep-work-execution/index.html",
  "use-cases/reusable-lessons/index.html",
  "use-cases/private-ai-productivity/index.html",
  "roadmap/index.html",
  "changelog/index.html",
  "privacy/index.html",
  "install/index.html",
  "about/index.html",
  "faq/index.html",
  "glossary/index.html",
  "compare/index.html",
  "ai/index.html",
  "ai/context/index.html",
  "ai/use-cases/index.html",
  "ai/entities/index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "llms-full.txt",
  "humans.txt",
  "feed.xml",
  "atom.xml",
  "feed.json",
  "data/product.json",
  "data/features.json",
  "data/roadmap.json",
  "data/glossary.json",
  "data/faq.json",
  "data/entities.json",
  "schema/site.jsonld",
  "schema/product.jsonld",
  "schema/software-application.jsonld",
  "schema/person-dzmitryi-kharlanau.jsonld",
  "schema/faq.jsonld",
  "schema/breadcrumbs.jsonld",
  "schema/navigation.jsonld",
  "schema/defined-terms.jsonld",
  "schema/data-catalog.jsonld",
];

const failures = [];
for (const file of required) {
  if (!existsSync(file)) failures.push(`Missing required file: ${file}`);
}

for (const file of required.filter(
  (item) => item.endsWith(".json") || item.endsWith(".jsonld"),
)) {
  try {
    JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    failures.push(`Invalid JSON in ${file}: ${error.message}`);
  }
}

const robots = await readFile("robots.txt", "utf8");
if (!robots.includes("Sitemap: https://wooolfmesh.github.io/sitemap.xml"))
  failures.push("robots.txt does not reference sitemap.xml");

const sitemap = await readFile("sitemap.xml", "utf8");
for (const file of required.filter((item) => item.endsWith("index.html"))) {
  const url =
    file === "index.html"
      ? "https://wooolfmesh.github.io/"
      : `https://wooolfmesh.github.io/${path.dirname(file).replaceAll(path.sep, "/")}/`;
  if (!sitemap.includes(`<loc>${url}</loc>`))
    failures.push(`Sitemap missing ${url}`);
}

const llms = await readFile("llms.txt", "utf8");
for (const must of [
  "# Wooolfmesh",
  "No private vault data",
  "https://wooolfmesh.github.io/data/product.json",
]) {
  if (!llms.includes(must)) failures.push(`llms.txt missing: ${must}`);
}

const htmlFiles = required.filter((item) => item.endsWith(".html"));
const hrefPattern = /(?:href|src)="([^"#?]+)(?:[#?][^"]*)?"/g;
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const must of [
    'rel="canonical"',
    'name="description"',
    'name="robots"',
    'property="og:title"',
    'property="og:image:alt"',
    'name="twitter:title"',
    'type="application/ld+json"',
  ]) {
    if (!html.includes(must)) failures.push(`${file} missing ${must}`);
  }
  for (const match of html.matchAll(hrefPattern)) {
    const href = match[1];
    if (href.startsWith("http") || href.startsWith("mailto:")) continue;
    let target = href;
    if (target === "/") target = "index.html";
    else if (target.endsWith("/")) target = `${target.slice(1)}index.html`;
    else if (target.startsWith("/")) target = target.slice(1);
    else target = path.join(path.dirname(file), target);
    if (!existsSync(target))
      failures.push(`${file} links to missing local target ${href}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `Validated ${required.length} required files, JSON, sitemap, llms.txt and local links.`,
);
