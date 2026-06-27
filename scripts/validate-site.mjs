import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

import sharp from "sharp";

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
  "features/optional-ai/index.html",
  "screenshots/index.html",
  "guides/index.html",
  "guides/windows-install/index.html",
  "guides/macos-install/index.html",
  "guides/first-run/index.html",
  "guides/vault-setup/index.html",
  "guides/tasks/index.html",
  "guides/capture-inbox/index.html",
  "guides/focus/index.html",
  "guides/reviews/index.html",
  "guides/cognitive-bites/index.html",
  "guides/links-prompts/index.html",
  "guides/ai-setup/index.html",
  "guides/backup-restore/index.html",
  "guides/safe-update/index.html",
  "guides/windows-troubleshooting/index.html",
  "guides/diagnostics/index.html",
  "guides/limitations/index.html",
  "releases/index.html",
  "support/index.html",
  "store-readiness/index.html",
  "architecture/index.html",
  "use-cases/index.html",
  "use-cases/plan-today/index.html",
  "use-cases/capture-rough-thought-into-task/index.html",
  "use-cases/open-and-clarify-task/index.html",
  "use-cases/start-focus/index.html",
  "use-cases/review-and-approve-suggestions/index.html",
  "use-cases/reuse-lessons-and-cognitive-bites/index.html",
  "use-cases/check-project-health/index.html",
  "use-cases/work-without-ai-or-with-optional-ai/index.html",
  "use-cases/search-local-work-memory/index.html",
  "use-cases/run-routines-and-reminders/index.html",
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
  "data/releases.json",
  "data/guides.json",
  "data/store-readiness.json",
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
  "schema/organization-or-project.jsonld",
  "site.webmanifest",
  "favicon.ico",
  "favicon.svg",
  "assets/og.png",
  "assets/icons/favicon-16x16.png",
  "assets/icons/favicon-32x32.png",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/maskable-192.png",
  "assets/icons/maskable-512.png",
];

const failures = [];
for (const file of required) {
  if (!existsSync(file)) failures.push(`Missing required file: ${file}`);
}

for (const file of required.filter(
  (item) =>
    item.endsWith(".json") ||
    item.endsWith(".jsonld") ||
    item.endsWith(".webmanifest"),
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
for (const blocked of ["/.git/", "/.github/", "/docs/", "/scripts/"]) {
  if (!robots.includes(`Disallow: ${blocked}`))
    failures.push(`robots.txt does not exclude ${blocked}`);
}

const sitemap = await readFile("sitemap.xml", "utf8");
const sitemapUrls = [
  ...sitemap.matchAll(/<loc>(https:\/\/wooolfmesh\.github\.io\/[^<]*)<\/loc>/g),
].map((match) => match[1]);
if (new Set(sitemapUrls).size !== sitemapUrls.length)
  failures.push("sitemap.xml contains duplicate URLs");
for (const file of required.filter((item) => item.endsWith("index.html"))) {
  const url =
    file === "index.html"
      ? "https://wooolfmesh.github.io/"
      : `https://wooolfmesh.github.io/${path.dirname(file).replaceAll(path.sep, "/")}/`;
  if (!sitemap.includes(`<loc>${url}</loc>`))
    failures.push(`Sitemap missing ${url}`);
}

const manifest = JSON.parse(await readFile("site.webmanifest", "utf8"));
for (const icon of manifest.icons ?? []) {
  const iconPath = icon.src.startsWith("/") ? icon.src.slice(1) : icon.src;
  if (!existsSync(iconPath))
    failures.push(`site.webmanifest links to missing icon ${icon.src}`);
}
for (const purpose of ["any", "maskable"]) {
  for (const size of ["192x192", "512x512"]) {
    if (
      !manifest.icons?.some(
        (icon) => icon.purpose === purpose && icon.sizes === size,
      )
    )
      failures.push(`site.webmanifest missing ${purpose} ${size} icon`);
  }
}

for (const [file, width, height] of [
  ["assets/og.png", 1200, 630],
  ["assets/icons/apple-touch-icon.png", 180, 180],
  ["assets/icons/icon-192.png", 192, 192],
  ["assets/icons/icon-512.png", 512, 512],
  ["assets/icons/maskable-192.png", 192, 192],
  ["assets/icons/maskable-512.png", 512, 512],
]) {
  const metadata = await sharp(file).metadata();
  if (metadata.width !== width || metadata.height !== height)
    failures.push(
      `${file} is ${metadata.width}x${metadata.height}; expected ${width}x${height}`,
    );
}

const icoHeader = await readFile("favicon.ico");
if (
  icoHeader.length < 6 ||
  icoHeader.readUInt16LE(0) !== 0 ||
  icoHeader.readUInt16LE(2) !== 1
)
  failures.push("favicon.ico does not have a valid ICO header");

const llms = await readFile("llms.txt", "utf8");
for (const must of [
  "# Wooolfmesh",
  "No private vault data",
  "https://wooolfmesh.github.io/data/product.json",
  "https://github.com/dkharlanau",
  "https://www.linkedin.com/in/dkharlanau/",
]) {
  if (!llms.includes(must)) failures.push(`llms.txt missing: ${must}`);
}

const htmlFiles = required.filter((item) => item.endsWith(".html"));
const hrefPattern = /(?:href|src)="([^"#?]+)(?:[#?][^"]*)?"/g;
const titles = new Map();
const descriptions = new Map();
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const expectedCanonical =
    file === "index.html"
      ? "https://wooolfmesh.github.io/"
      : file === "404.html"
        ? "https://wooolfmesh.github.io/404.html"
        : `https://wooolfmesh.github.io/${path.dirname(file).replaceAll(path.sep, "/")}/`;
  const canonicalMatches = [
    ...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"(?:\s*\/?)?>/g),
  ];
  if (
    canonicalMatches.length !== 1 ||
    canonicalMatches[0]?.[1] !== expectedCanonical
  )
    failures.push(
      `${file} canonical must be unique and equal ${expectedCanonical}`,
    );
  const h1Count = [...html.matchAll(/<h1(?:\s|>)/g)].length;
  if (h1Count !== 1) failures.push(`${file} has ${h1Count} h1 elements`);
  for (const must of [
    'rel="canonical"',
    'name="description"',
    'name="robots"',
    'name="author"',
    'name="creator"',
    'name="application-name"',
    'name="apple-mobile-web-app-title"',
    'property="og:title"',
    'property="og:description"',
    'property="og:url"',
    'property="og:image:type"',
    'property="og:image:alt"',
    'name="twitter:card"',
    'name="twitter:title"',
    'name="twitter:description"',
    'name="twitter:image"',
    'rel="manifest"',
    'rel="apple-touch-icon"',
    'href="/favicon.ico"',
    'type="application/ld+json"',
  ]) {
    if (!html.includes(must)) failures.push(`${file} missing ${must}`);
  }
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (file !== "index.html" && !title?.endsWith(" | Wooolfmesh"))
    failures.push(`${file} does not use the title template`);
  if (title) {
    if (titles.has(title))
      failures.push(`${file} duplicates the title from ${titles.get(title)}`);
    titles.set(title, file);
  }
  const description = html.match(
    /<meta\s+name="description"\s+content="([^"]+)"(?:\s*\/?)?>/,
  )?.[1];
  if (description) {
    if (descriptions.has(description))
      failures.push(
        `${file} duplicates the description from ${descriptions.get(description)}`,
      );
    descriptions.set(description, file);
  }

  const jsonLdBlocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];
  const jsonLd = [];
  for (const block of jsonLdBlocks) {
    try {
      jsonLd.push(JSON.parse(block[1]));
    } catch (error) {
      failures.push(`${file} contains invalid JSON-LD: ${error.message}`);
    }
  }
  const jsonLdTypes = jsonLd.flatMap((item) =>
    Array.isArray(item["@type"]) ? item["@type"] : [item["@type"]],
  );
  if (!jsonLdTypes.includes("WebPage"))
    failures.push(`${file} JSON-LD missing WebPage`);
  if (file !== "404.html" && !jsonLdTypes.includes("BreadcrumbList"))
    failures.push(`${file} JSON-LD missing BreadcrumbList`);
  if (file === "index.html") {
    for (const type of [
      "WebSite",
      "SoftwareApplication",
      "Person",
      "Project",
    ]) {
      if (!jsonLdTypes.includes(type))
        failures.push(`index.html JSON-LD missing ${type}`);
    }
  }
  if (file !== "faq/index.html" && jsonLdTypes.includes("FAQPage"))
    failures.push(
      `${file} must not declare FAQPage without visible FAQ content`,
    );

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
  `Validated ${required.length} files, metadata, JSON-LD, icons, sitemap, llms.txt and local links.`,
);
