import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const site = "https://wooolfmesh.github.io";
const researchPath = "/research/";
const researchUrl = `${site}${researchPath}`;
const radarUrl = `${site}/research/radar/`;
const today = new Date().toISOString().slice(0, 10);

async function patchHtmlTree(directory = ".") {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if ([".git", "node_modules", "scripts"].includes(entry.name)) continue;

    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await patchHtmlTree(filePath);
      continue;
    }

    if (!entry.name.endsWith(".html")) continue;

    let html = await readFile(filePath, "utf8");
    if (!html.includes("data-nav-links") || html.includes('href="/research/"')) {
      continue;
    }

    html = html.replaceAll(
      /(<a href="\/architecture\/"[^>]*>Architecture<\/a>)/g,
      '$1<a href="/research/">Research</a>',
    );
    await writeFile(filePath, html);
  }
}

async function patchSitemap() {
  const file = "sitemap.xml";
  let sitemap = await readFile(file, "utf8");

  if (!sitemap.includes(`<loc>${researchUrl}</loc>`)) {
    const entry = `  <url><loc>${researchUrl}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
    sitemap = sitemap.replace("</urlset>", `${entry}</urlset>`);
  }

  if (!sitemap.includes(`<loc>${radarUrl}</loc>`)) {
    const entry = `  <url><loc>${radarUrl}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
    sitemap = sitemap.replace("</urlset>", `${entry}</urlset>`);
  }

  await writeFile(file, sitemap);
}

async function patchLlms() {
  const file = "llms.txt";
  let text = await readFile(file, "utf8");
  if (!text.includes(`[Research](${researchUrl})`)) {
    text = text.replace(
      `- [Guides](${site}/guides/)`,
      `- [Guides](${site}/guides/)\n- [Research](${researchUrl})`,
    );
  }
  if (!text.includes(`[Research Radar](${radarUrl})`)) {
    text = text.replace(
      `- [Research](${researchUrl})`,
      `- [Research](${researchUrl})\n- [Research Radar](${radarUrl})`,
    );
  }
  await writeFile(file, text);
}

async function patchNavigationSchema() {
  const file = "schema/navigation.jsonld";
  const data = JSON.parse(await readFile(file, "utf8"));
  const items = data.itemListElement ?? [];
  if (items.some((item) => item.url === researchUrl)) return;

  const architectureIndex = items.findIndex(
    (item) => item.url === `${site}/architecture/`,
  );
  const insertAt = architectureIndex >= 0 ? architectureIndex + 1 : items.length;
  items.splice(insertAt, 0, {
    "@type": "SiteNavigationElement",
    name: "Research",
    url: researchUrl,
  });
  items.forEach((item, index) => {
    item.position = index + 1;
  });

  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
}

async function patchDataCatalog() {
  const file = "schema/data-catalog.jsonld";
  const data = JSON.parse(await readFile(file, "utf8"));
  const datasets = data.dataset ?? [];
  const researchDataUrl = `${site}/data/research.json`;
  if (!datasets.some((item) => item.url === researchDataUrl)) {
    datasets.push({
      "@type": "Dataset",
      name: "research",
      url: researchDataUrl,
    });
  }
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
}

await patchHtmlTree();
await patchSitemap();
await patchLlms();
await patchNavigationSchema();
await patchDataCatalog();
