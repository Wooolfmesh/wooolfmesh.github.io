import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const site = "https://wooolfmesh.github.io";
const researchPath = "/research/";
const researchUrl = `${site}${researchPath}`;
const radarUrl = `${site}/research/radar/`;
const mechanicsUrl = `${site}/research/mechanics/`;
const blueprintUrl = `${site}/research/blueprint/`;
// Keep sitemap output reproducible. Advance this only when the hand-authored
// research pages change; build time is not evidence that their content changed.
const researchLastModified = "2026-08-22";

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
    if (
      !html.includes("data-nav-links") ||
      html.includes('href="/research/"')
    ) {
      continue;
    }

    html = html.replace(
      /(<div class="nav-links" data-nav-links>[\s\S]*?<a href="\/architecture\/"[^>]*>Architecture<\/a>)/,
      '$1<a href="/research/">Research</a>',
    );
    html = html.replace(
      /(<div class="footer-links">[\s\S]*?<a href="\/architecture\/"[^>]*>Architecture<\/a>)/,
      '$1<a href="/research/">Research</a>',
    );
    await writeFile(filePath, html);
  }
}

async function patchSitemap() {
  const file = "sitemap.xml";
  let sitemap = await readFile(file, "utf8");

  if (!sitemap.includes(`<loc>${researchUrl}</loc>`)) {
    const entry = `  <url><loc>${researchUrl}</loc><lastmod>${researchLastModified}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
    sitemap = sitemap.replace("</urlset>", `${entry}</urlset>`);
  }

  if (!sitemap.includes(`<loc>${radarUrl}</loc>`)) {
    const entry = `  <url><loc>${radarUrl}</loc><lastmod>${researchLastModified}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
    sitemap = sitemap.replace("</urlset>", `${entry}</urlset>`);
  }

  if (!sitemap.includes(`<loc>${mechanicsUrl}</loc>`)) {
    const entry = `  <url><loc>${mechanicsUrl}</loc><lastmod>${researchLastModified}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
    sitemap = sitemap.replace("</urlset>", `${entry}</urlset>`);
  }

  if (!sitemap.includes(`<loc>${blueprintUrl}</loc>`)) {
    const entry = `  <url><loc>${blueprintUrl}</loc><lastmod>${researchLastModified}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
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
  if (!text.includes(`[Studio Mechanics](${mechanicsUrl})`)) {
    text = text.replace(
      `- [Research Radar](${radarUrl})`,
      `- [Research Radar](${radarUrl})\n- [Studio Mechanics](${mechanicsUrl})`,
    );
  }
  if (!text.includes(`[Product Blueprint](${blueprintUrl})`)) {
    text = text.replace(
      `- [Studio Mechanics](${mechanicsUrl})`,
      `- [Studio Mechanics](${mechanicsUrl})\n- [Product Blueprint](${blueprintUrl})`,
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
  const insertAt =
    architectureIndex >= 0 ? architectureIndex + 1 : items.length;
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
  const mechanicsDataUrl = `${site}/data/research-mechanics.json`;
  const blueprintDataUrl = `${site}/data/research-blueprint.json`;

  if (!datasets.some((item) => item.url === researchDataUrl)) {
    datasets.push({
      "@type": "Dataset",
      name: "research",
      url: researchDataUrl,
    });
  }

  if (!datasets.some((item) => item.url === mechanicsDataUrl)) {
    datasets.push({
      "@type": "Dataset",
      name: "research-mechanics",
      url: mechanicsDataUrl,
    });
  }

  if (!datasets.some((item) => item.url === blueprintDataUrl)) {
    datasets.push({
      "@type": "Dataset",
      name: "research-blueprint",
      url: blueprintDataUrl,
    });
  }

  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
}

await patchHtmlTree();
await patchSitemap();
await patchLlms();
await patchNavigationSchema();
await patchDataCatalog();
