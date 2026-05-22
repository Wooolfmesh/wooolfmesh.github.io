import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const site = "https://wooolfmesh.github.io";
const today = "2026-05-22";
const updatedIso = "2026-05-22T00:00:00+03:00";
const siteName = "Wooolfmesh";

const author = {
  name: "Dzmitryi Kharlanau",
  url: "https://dkharlanau.github.io/",
  description:
    "SAP consultant and builder focused on local-first productivity systems, agentic work memory and practical execution loops.",
};

const targetKeywords = [
  "local-first memory for agentic work",
  "agentic work memory",
  "private local command center",
  "Markdown vault productivity system",
  "private work memory",
  "focus sessions",
  "cognitive bites",
  "review-driven productivity",
  "local-first AI productivity",
  "WorkOS Local legacy name",
];

const nav = [
  ["Home", "/"],
  ["Product", "/product/"],
  ["Features", "/features/"],
  ["Screenshots", "/screenshots/"],
  ["Guides", "/guides/"],
  ["Releases", "/releases/"],
  ["Roadmap", "/roadmap/"],
  ["Privacy", "/privacy/"],
  ["Store", "/store-readiness/"],
  ["Support", "/support/"],
];

const loop = [
  "Capture",
  "Clarify",
  "Plan",
  "Focus",
  "Review",
  "Learn",
  "Reuse",
];

const statusCopy = {
  built: "Built",
  partial: "Partial",
  optional: "Optional",
  planned: "Planned",
  missing: "Missing",
  unknown: "Unknown",
};

const features = [
  {
    slug: "today-command-center",
    title: "Today command center",
    status: "built",
    short:
      "A daily operating layer for next action, routines, reminders, freshness, focus readiness and work queues.",
    problem:
      "Daily work gets split across task lists, notes, reviews, interruptions and system status.",
    does: "Wooolfmesh gathers local work context into one starting surface so the next useful action is visible.",
    why: "The app is strongest when it reduces decision drag before work starts.",
    loop: ["Clarify", "Plan", "Focus", "Review"],
  },
  {
    slug: "tasks",
    title: "Tasks and planning",
    status: "built",
    short:
      "Markdown-backed tasks with next action, definition of done, effort, energy, work mode, links and reminders.",
    problem:
      "A title-only task is rarely enough to restart serious work after interruption.",
    does: "Wooolfmesh treats a task as executable local memory, not just an item in a list.",
    why: "Tasks become useful context for focus sessions, reviews and future retrieval.",
    loop: ["Clarify", "Plan", "Focus"],
  },
  {
    slug: "capture-inbox",
    title: "Capture and inbox",
    status: "built",
    short:
      "Preview-first capture for raw notes, tasks, memory, cognitive bites and later processing.",
    problem:
      "Useful fragments arrive faster than they can be organized safely.",
    does: "Capture can propose structured items, but the user decides what becomes durable.",
    why: "No silent mutation is a product trust requirement.",
    loop: ["Capture", "Clarify"],
  },
  {
    slug: "focus-sessions",
    title: "Focus sessions",
    status: "built",
    short:
      "Deep work sessions connected to a task, definition of done, interruptions, outcome and next action.",
    problem:
      "A timer alone does not preserve why the work mattered or what changed.",
    does: "Wooolfmesh keeps focus context and session outcome together as local work memory.",
    why: "Focus becomes something reviewable and reusable, not only time spent.",
    loop: ["Plan", "Focus", "Review"],
  },
  {
    slug: "reviews",
    title: "Reviews",
    status: "partial",
    short:
      "Daily, weekly, project and experience reviews with suggested actions and approval flows.",
    problem: "Reflection does not matter if it never reaches future execution.",
    does: "Reviews can generate follow-up actions and lessons while keeping suggestions preview-first.",
    why: "Review-driven productivity turns work history into practical next moves.",
    loop: ["Review", "Learn", "Reuse"],
  },
  {
    slug: "cognitive-bites",
    title: "Cognitive bites",
    status: "built",
    short:
      "Reusable lessons, decisions, mistakes, playbooks, principles and patterns.",
    problem:
      "Lessons are often buried in long notes and forgotten by the next project.",
    does: "Wooolfmesh stores compact lessons that can be retrieved during later planning and review.",
    why: "Experience becomes reusable execution memory.",
    loop: ["Review", "Learn", "Reuse"],
  },
  {
    slug: "project-health",
    title: "Project health",
    status: "partial",
    short:
      "Project momentum, blockers, stale work, related lessons and suggested next moves.",
    problem:
      "Projects drift when blockers, stale tasks and review debt are scattered.",
    does: "Wooolfmesh connects project tasks, memory, bites and reviews into a local health picture.",
    why: "The app should show where execution is stuck before a backlog becomes noise.",
    loop: ["Plan", "Focus", "Review"],
  },
  {
    slug: "signals-analytics",
    title: "Signals and analytics",
    status: "built",
    short:
      "Local patterns over focus, completion, routines, signals, planning quality and app health.",
    problem:
      "Useful self-calibration often becomes cloud telemetry in other tools.",
    does: "Wooolfmesh keeps analytics local and clearable while surfacing work patterns.",
    why: "The goal is better personal calibration, not surveillance.",
    loop: ["Review", "Learn", "Plan"],
  },
  {
    slug: "local-knowledge",
    title: "Local knowledge and search",
    status: "partial",
    short:
      "Markdown vault storage, vault registry, search, retrieval, citations and provenance.",
    problem:
      "Knowledge work loses context when notes, decisions and tasks cannot be retrieved together.",
    does: "Wooolfmesh indexes and retrieves local context while keeping Markdown as the ownership layer.",
    why: "Your Markdown vault stays yours.",
    loop: ["Capture", "Clarify", "Learn", "Reuse"],
  },
  {
    slug: "optional-ai",
    title: "Optional AI providers",
    status: "optional",
    short:
      "Ollama, hosted provider settings, ADK previews and OCR paths are optional and provider-dependent.",
    problem:
      "AI productivity tools often require uploading private context before they are useful.",
    does: "Wooolfmesh keeps manual/local workflows primary and treats AI as optional assistance.",
    why: "AI can help, but the app works without it.",
    loop: ["Capture", "Clarify", "Review"],
  },
];

const useCases = [
  {
    slug: "agentic-work-memory",
    title: "Agentic work memory",
    forWhom:
      "Builders and consultants who want durable local context for human and AI-assisted work.",
    problem:
      "AI chats forget the real execution system: tasks, decisions, reviews and lessons.",
    helps:
      "Wooolfmesh gives humans and agents a structured local memory layer.",
    modules: ["Tasks", "Reviews", "Cognitive bites", "Search"],
  },
  {
    slug: "local-first-personal-os",
    title: "Local-first personal operating system",
    forWhom:
      "People who want a private command center over a Markdown/Obsidian-style vault.",
    problem:
      "Work systems split planning, notes, reviews and lessons into disconnected tools.",
    helps: "Wooolfmesh connects the pieces into one local execution loop.",
    modules: ["Today", "Vault", "Tasks", "Signals"],
  },
  {
    slug: "deep-work-execution",
    title: "Deep work execution",
    forWhom: "Knowledge workers who need to protect and resume complex work.",
    problem:
      "Interruptions destroy context when the goal and stopping point are not recorded.",
    helps:
      "Focus sessions keep the goal, interruptions, outcome and next action together.",
    modules: ["Focus", "Tasks", "Reviews"],
  },
  {
    slug: "reusable-lessons",
    title: "Reusable lessons",
    forWhom: "People who want project experience to shape future decisions.",
    problem: "Lessons learned are often too buried to affect the next task.",
    helps: "Cognitive bites make lessons compact, searchable and reusable.",
    modules: ["Reviews", "Bites", "Memory"],
  },
  {
    slug: "private-ai-productivity",
    title: "Private AI productivity",
    forWhom:
      "Users who want AI assistance without making hosted AI the center of the system.",
    problem: "Many AI tools ask users to upload the whole work system.",
    helps:
      "Wooolfmesh keeps the local-first loop primary and makes providers optional.",
    modules: ["Capture", "AI settings", "Reviews"],
  },
];

const screenshots = [
  [
    "today-command-center",
    "Today command center",
    "Start from one local command center for next action, routines, reminders and work queues.",
  ],
  [
    "task-detail-planning",
    "Task detail",
    "Tasks carry next action, definition of done, effort, energy, work mode, links and notes.",
  ],
  [
    "capture-inbox",
    "Capture and inbox",
    "Capture raw thoughts and preview extracted entities before anything becomes durable.",
  ],
  [
    "focus-session",
    "Focus session",
    "Focus sessions preserve the goal, interruptions, outcome and next action.",
  ],
  [
    "reviews-actions",
    "Reviews",
    "Reviews turn work history into suggested actions and reusable lessons.",
  ],
  [
    "project-health",
    "Project health",
    "Project health shows blockers, stale work and movement signals.",
  ],
  [
    "memory-bites",
    "Memory and cognitive bites",
    "Cognitive bites and memory make lessons reusable across future work.",
  ],
  [
    "search-retrieval",
    "Search and retrieval",
    "Local search and provenance help retrieve context from private work memory.",
  ],
  [
    "settings-trust-ai",
    "Settings, trust and AI",
    "Settings show local runtime, vaults, AI providers, data controls and diagnostics.",
  ],
];

const guides = [
  [
    "windows-install",
    "Windows install",
    "Current developer/portable Windows setup and Store packaging caveat.",
  ],
  [
    "macos-install",
    "macOS install",
    "Local script setup for macOS; not an App Store package.",
  ],
  [
    "first-run",
    "First run",
    "Choose a vault, confirm local runtime, start from Today.",
  ],
  [
    "vault-setup",
    "Vault setup",
    "WORKOS_VAULT_PATH must point to the `_WorkOS` folder. Your Markdown vault stays yours.",
  ],
  [
    "tasks",
    "Tasks",
    "Use next action, definition of done, effort, energy and work mode to make tasks executable.",
  ],
  [
    "capture-inbox",
    "Capture and inbox",
    "Capture is preview-first. Nothing is saved until you decide.",
  ],
  [
    "focus",
    "Focus sessions",
    "Start with a ready task, capture interruptions, close with outcome and next action.",
  ],
  [
    "reviews",
    "Reviews",
    "Daily, weekly, project and experience reviews feed actions and lessons.",
  ],
  [
    "cognitive-bites",
    "Cognitive bites",
    "Turn repeated lessons and mistakes into reusable local memory.",
  ],
  [
    "links-prompts",
    "Quick links and prompts",
    "Keep recurring resources and thinking templates local and reusable.",
  ],
  [
    "ai-setup",
    "AI setup",
    "AI can help, but the app works without it. Ollama is local; hosted providers are explicit.",
  ],
  [
    "backup-restore",
    "Backup and restore",
    "Back up the Markdown vault and understand what SQLite stores at runtime.",
  ],
  [
    "safe-update",
    "Safe update",
    "App code can change; updates must not mutate the user vault.",
  ],
  [
    "windows-troubleshooting",
    "Windows troubleshooting",
    "Diagnose ports, stale processes, stale config, wrong clone and PWA cache.",
  ],
  [
    "diagnostics",
    "Diagnostics",
    "Export safe diagnostics, review before sharing, never include secrets.",
  ],
  [
    "limitations",
    "Limitations",
    "Store package, Microsoft sync and some AI/OCR paths are not complete.",
  ],
];

const roadmap = {
  Now: [
    "Refresh public site from the real product state",
    "Publish sanitized screenshots and guide structure",
    "Keep Store readiness marked incomplete",
    "Clarify privacy, support, AI and diagnostics disclosure",
  ],
  Next: [
    "Package-mode launcher contract",
    "Final Store-sized screenshot export",
    "Windows install/update/uninstall validation",
    "Partner Center draft submission data",
  ],
  Later: [
    "Store-ready MSIX/upload package",
    "Optional external commitment sync",
    "Public starter vault or templates",
    "More demo videos and release posts",
  ],
};

const releases = [
  {
    version: "0.19.3 public-site-prep",
    date: today,
    summary:
      "Public documentation and site refresh prepared from the real local-first product state.",
    user: [
      "Added public screenshots from isolated QA data.",
      "Added guide structure for install, vault setup, capture, focus, reviews and diagnostics.",
      "Added Store readiness and support pages with honest blockers.",
    ],
    technical: [
      "Added isolated demo vault generator.",
      "Added repeatable screenshot capture script for a locally running demo app.",
      "Expanded crawler and AI-readable site data.",
    ],
    limitations: [
      "No Microsoft Store package is available yet.",
      "WACK/MSIX validation has not been run.",
    ],
  },
];

const storeReadiness = [
  [
    "App name and brand",
    "pass",
    "Public brand is Wooolfmesh; legacy WorkOS Local remains internal compatibility name.",
  ],
  [
    "Public site",
    "pass",
    "GitHub Pages target is https://wooolfmesh.github.io/.",
  ],
  [
    "Privacy URL",
    "partial",
    "Target page exists in the refreshed site; verify live before submission.",
  ],
  [
    "Support URL",
    "partial",
    "Target page exists in the refreshed site; verify live before submission.",
  ],
  [
    "Screenshots",
    "partial",
    "Sanitized QA screenshots prepared; final Store export/review pending.",
  ],
  ["MSIX/upload package", "missing", "No Store-ready package exists."],
  [
    "Windows install/update/uninstall validation",
    "missing",
    "Not run for a Store package.",
  ],
  [
    "Partner Center account/name reservation",
    "unknown",
    "Manual verification required.",
  ],
  ["Age rating", "unknown", "Partner Center questionnaire required."],
  [
    "Legal review",
    "partial",
    "Draft privacy, support, EULA and notices exist; human/legal review required.",
  ],
];

const faq = [
  [
    "What is Wooolfmesh?",
    "A private local-first command center for tasks, capture, focus, reviews, lessons, routines, analytics, search and optional AI.",
  ],
  [
    "Was Wooolfmesh previously called WorkOS Local?",
    "Yes. Wooolfmesh began as WorkOS Local. The old name remains legacy/internal for compatibility.",
  ],
  [
    "Where does user data live?",
    "Durable work memory lives in a user-owned Markdown vault. SQLite supports runtime state.",
  ],
  ["Is AI required?", "No. AI can help, but the app works without it."],
  [
    "Is Wooolfmesh Store-ready?",
    "No. Store submission is blocked until package, screenshots, public URLs and Windows lifecycle validation are complete.",
  ],
  [
    "What are cognitive bites?",
    "Compact reusable lessons, decisions, playbooks, mistakes and patterns captured from work history.",
  ],
  [
    "Does this site publish private vault data?",
    "No. Public screenshots and demo data must be fictional or isolated.",
  ],
];

const glossary = [
  [
    "Wooolfmesh",
    "A private local-first command center and memory system for agentic work.",
  ],
  ["WorkOS Local", "Legacy/internal name for Wooolfmesh."],
  [
    "Markdown vault",
    "A local `_WorkOS` folder that stores durable user-owned work memory.",
  ],
  [
    "SQLite runtime support",
    "Local database support for reminders, events, indexes, diagnostics and local analytics.",
  ],
  [
    "Preview-first",
    "Generated or extracted changes are shown before the user saves anything.",
  ],
  [
    "No silent mutation",
    "The app must not alter private work memory without explicit user action.",
  ],
  [
    "Cognitive bite",
    "A reusable lesson, decision, mistake, playbook, principle or pattern.",
  ],
  [
    "Optional AI provider",
    "A local or hosted model provider that assists workflows but is not required.",
  ],
];

const pages = [];
const addPage = (page) => pages.push(page);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pagePath(urlPath) {
  if (urlPath === "/") return "index.html";
  if (urlPath.endsWith(".html")) return urlPath.slice(1);
  return path.join(urlPath.slice(1), "index.html");
}

function statusBadge(status) {
  return `<span class="status-badge ${status}">${statusCopy[status] ?? status}</span>`;
}

function cards(items, base = "") {
  return `<div class="index-grid">${items
    .map(
      (item) => `<article class="index-card reveal">
        <div class="card-meta">${item.status ? statusBadge(item.status) : ""}</div>
        <h2><a href="${base}/${item.slug}/">${escapeHtml(item.title)}</a></h2>
        <p>${escapeHtml(item.short ?? item.problem ?? item.forWhom)}</p>
        <a class="text-link" href="${base}/${item.slug}/">Read more</a>
      </article>`,
    )
    .join("")}</div>`;
}

function hero(title, subtitle, ctas = "") {
  return `<section class="page-hero compact"><div class="shell reveal"><h1>${title}</h1><p class="lead">${subtitle}</p>${ctas}</div></section>`;
}

function breadcrumbs(page) {
  const parts = page.url.split("/").filter(Boolean);
  const items = [{ name: "Home", item: site + "/" }];
  let current = "";
  for (const part of parts) {
    current += `/${part}`;
    items.push({ name: part.replaceAll("-", " "), item: `${site}${current}/` });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

const siteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site}/#website`,
  name: "Wooolfmesh",
  alternateName: ["WorkOS Local", "work-os-local", "Work OS Local"],
  url: site + "/",
  description: "Private local-first command center for agentic work.",
  inLanguage: "en",
  dateModified: today,
  publisher: { "@id": `${site}/#person-dzmitryi-kharlanau` },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${site}/#software`,
  name: "Wooolfmesh",
  alternateName: "WorkOS Local",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Windows, macOS, local web app",
  url: site + "/",
  image: `${site}/assets/og.png`,
  author: { "@id": `${site}/#person-dzmitryi-kharlanau` },
  description:
    "Wooolfmesh is a private local-first command center for tasks, capture, focus, reviews, lessons, routines, analytics, search and optional AI.",
  isAccessibleForFree: true,
  keywords: targetKeywords,
  featureList: features.map(
    (feature) => `${feature.title} (${statusCopy[feature.status]})`,
  ),
  sameAs: ["https://github.com/dkharlanau/work-os-local"],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site}/#person-dzmitryi-kharlanau`,
  name: author.name,
  url: author.url,
  jobTitle: "SAP consultant and builder",
  description: author.description,
  sameAs: [author.url],
};

function webPageSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site}${page.url === "/" ? "/" : page.url}#webpage`,
    name: page.title.replace(" — Wooolfmesh", ""),
    url: `${site}${page.url === "/" ? "/" : page.url}`,
    description: page.description,
    inLanguage: "en",
    datePublished: today,
    dateModified: today,
    isPartOf: { "@id": `${site}/#website` },
    author: { "@id": `${site}/#person-dzmitryi-kharlanau` },
  };
}

function pageJsonLd(page) {
  const declared = page.jsonLd ?? [];
  const has = (type) =>
    declared.some((item) => {
      const itemType = item?.["@type"];
      return Array.isArray(itemType)
        ? itemType.includes(type)
        : itemType === type;
    });
  const automatic = [];
  if (!has("WebPage")) automatic.push(webPageSchema(page));
  if (page.url !== "/404.html" && !has("BreadcrumbList"))
    automatic.push(breadcrumbs(page));
  return [...automatic, ...declared];
}

function layout(page) {
  const canonical = `${site}${page.url === "/" ? "/" : page.url}`;
  const active = page.active ?? page.url.split("/")[1] ?? "";
  const robots =
    page.robots ??
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const keywords = [...new Set([...(page.keywords ?? []), ...targetKeywords])]
    .slice(0, 16)
    .join(", ");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <meta name="robots" content="${robots}">
    <meta name="author" content="${author.name}">
    <meta name="application-name" content="${siteName}">
    <meta name="keywords" content="${escapeHtml(keywords)}">
    <link rel="canonical" href="${canonical}">
    <link rel="author" href="${author.url}">
    <link rel="sitemap" type="application/xml" href="/sitemap.xml">
    <meta property="og:type" content="${page.ogType ?? "website"}">
    <meta property="og:site_name" content="${siteName}">
    <meta property="og:title" content="${escapeHtml(page.ogTitle ?? page.title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${site}/assets/og.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Wooolfmesh local-first command center">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(page.ogTitle ?? page.title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    <meta name="twitter:image" content="${site}/assets/og.png">
    <meta name="twitter:image:alt" content="Wooolfmesh local-first command center">
    <meta name="theme-color" content="#050505">
    <link rel="alternate" type="application/rss+xml" title="Wooolfmesh RSS" href="/feed.xml">
    <link rel="alternate" type="application/atom+xml" title="Wooolfmesh Atom" href="/atom.xml">
    <link rel="alternate" type="application/feed+json" title="Wooolfmesh JSON Feed" href="/feed.json">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/styles.css">
    ${pageJsonLd(page)
      .map(
        (item) =>
          `<script type="application/ld+json">${JSON.stringify(item)}</script>`,
      )
      .join("\n    ")}
  </head>
  <body>
    <header class="site-header">
      <nav class="nav-shell" aria-label="Main navigation">
        <a class="brand" href="/" aria-label="Wooolfmesh home"><img src="/assets/logo.svg" alt="">Wooolfmesh</a>
        <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-label="Open menu"><span></span></button>
        <div class="nav-links" data-nav-links>
          ${nav
            .map(
              ([label, href]) =>
                `<a href="${href}"${active && href.startsWith(`/${active}`) ? ' aria-current="page"' : ""}>${label}</a>`,
            )
            .join("")}
        </div>
      </nav>
    </header>
    <main>${page.body}</main>
    <footer class="site-footer">
      <div class="footer-shell">
        <div class="footer-brand">
          <strong>Wooolfmesh</strong>
          <p>Private local-first command center for tasks, capture, focus, reviews, lessons and optional AI.</p>
          <p class="footer-small">Wooolfmesh began as WorkOS Local. No private vault data is published here.</p>
        </div>
        <div class="footer-links">
          ${nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
          <a href="/ai/">AI disclosure</a>
          <a href="https://github.com/dkharlanau/work-os-local">App source</a>
          <a href="https://github.com/wooolfmesh/wooolfmesh.github.io">Site repo</a>
        </div>
      </div>
    </footer>
    <script src="/assets/script.js"></script>
  </body>
</html>`;
}

addPage({
  url: "/",
  title: "Wooolfmesh — Private local-first command center",
  description:
    "Wooolfmesh is a private local-first command center for tasks, capture, focus, reviews, lessons, routines, analytics, search and optional AI.",
  active: "",
  jsonLd: [siteSchema, softwareSchema],
  body: `<section class="hero"><div class="shell hero-grid"><div class="reveal"><p class="hero-kicker">local vault // daily execution // optional AI</p><h1>Wooolfmesh</h1><h2>Private local-first command center for agentic work.</h2><p class="lead">Turn tasks, notes, reviews, lessons and work history into daily execution memory. Your Markdown vault stays yours.</p><div class="signal-row"><span class="signal-pill hot">Markdown owned</span><span class="signal-pill">SQLite runtime</span><span class="signal-pill red">No silent mutation</span><span class="signal-pill">AI optional</span></div><div class="hero-actions"><a class="button primary" href="/screenshots/">View product</a><a class="button" href="/store-readiness/">Store readiness</a></div><p class="privacy-note">AI can help, but the app works without it.</p></div><div class="terminal-visual reveal"><div class="terminal-top">wooolfmesh://today</div><div class="terminal-line strong">next_action: Write local-first positioning page</div><div class="terminal-line">vault: _WorkOS markdown</div><div class="terminal-line">runtime: sqlite local</div><div class="terminal-line">ai_provider: optional</div><div class="terminal-grid">${loop.map((step) => `<span>${step}</span>`).join("")}</div></div></div></section>
  <section class="section tight"><div class="shell"><div class="section-heading center reveal"><p class="system-label">core loop</p><h2>${loop.join(" -> ")}</h2><p>Capture the work, clarify it, focus, review, learn, and reuse the result next time.</p></div></div></section>
  <section class="section"><div class="shell note-grid"><article class="note-block reveal"><h2>Why it exists</h2><p>Real work is not only tasks. It is decisions, interruptions, focus attempts, reviews and lessons that should become easier to reuse.</p></article><article class="note-block reveal"><h2>What it connects</h2><p>Today, tasks, capture, focus sessions, reviews, cognitive bites, memory, routines, signals, analytics, search and local knowledge.</p></article><article class="note-block reveal"><h2>Local-first by design</h2><p>Markdown is the user-owned memory layer. SQLite supports runtime behavior. Hosted services are not required for core use.</p></article><article class="note-block reveal"><h2>Not AI theatre</h2><p>AI is optional and provider-dependent. The product is a private execution loop first.</p></article></div></section>
  <section class="section"><div class="shell"><div class="section-heading reveal"><h2>Current product surface</h2><p>These pages use sanitized screenshots from isolated demo/QA data, not private vault content.</p></div>${screenshotGrid()}</div></section>`,
});

addPage({
  url: "/product/",
  title: "Product — Wooolfmesh",
  description:
    "Wooolfmesh is a local-first work memory layer that connects tasks, capture, focus, reviews, lessons, routines, analytics, search and optional AI.",
  active: "product",
  jsonLd: [softwareSchema],
  body: `${hero("Product", "A private local command center over your Markdown knowledge base. It is useful without cloud AI and stronger when capture, focus, review and lessons stay connected.", `<div class="page-actions"><a class="button primary" href="/features/">Feature status</a><a class="button" href="/architecture/">Architecture</a></div>`)}
  <section class="section"><div class="shell content-flow"><div class="definition"><strong>Definition</strong>Wooolfmesh turns personal tasks, notes, reviews, lessons and work history into reusable local execution memory.</div><p>It is not a generic SaaS task manager and not an AI chatbot. The durable layer is a user-owned Markdown vault. SQLite supports runtime state such as reminders, event history, indexes, diagnostics and local analytics.</p></div></section>
  <section class="section"><div class="shell">${cards(features, "/features")}</div></section>`,
});

addPage({
  url: "/features/",
  title: "Feature status — Wooolfmesh",
  description:
    "Built, partial, optional and planned Wooolfmesh features from the current product state.",
  active: "features",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Wooolfmesh feature status",
      itemListElement: features.map((feature, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${feature.title} (${statusCopy[feature.status]})`,
        url: `${site}/features/${feature.slug}/`,
      })),
    },
  ],
  body: `${hero("Feature status", "A factual map of what is built, partial, optional and planned.")}
  <section class="section"><div class="shell">${cards(features, "/features")}</div></section>`,
});

for (const feature of features) {
  addPage({
    url: `/features/${feature.slug}/`,
    title: `${feature.title} — Wooolfmesh feature`,
    description: `${feature.title}: ${feature.short}`,
    active: "features",
    body: `${hero(feature.title, `${statusCopy[feature.status]}: ${feature.short}`)}
    <section class="section"><div class="shell content-grid"><div class="content-flow">
      <div class="definition"><strong>Status</strong>${statusBadge(feature.status)} ${escapeHtml(feature.short)}</div>
      <section><h2>User problem</h2><p>${escapeHtml(feature.problem)}</p></section>
      <section><h2>What Wooolfmesh does</h2><p>${escapeHtml(feature.does)}</p></section>
      <section><h2>Why it matters</h2><p>${escapeHtml(feature.why)}</p></section>
      <section><h2>How it fits the loop</h2><p>${feature.loop.join(" -> ")}</p></section>
    </div><aside class="sidebar-box"><h2>Related</h2><ul><li><a href="/features/">All features</a></li><li><a href="/screenshots/">Screenshots</a></li><li><a href="/privacy/">Privacy</a></li></ul></aside></div></section>`,
  });
}

addPage({
  url: "/screenshots/",
  title: "Screenshots — Wooolfmesh",
  description:
    "Sanitized Wooolfmesh screenshots from isolated demo/QA data covering Today, tasks, capture, focus, reviews, projects, memory, search and settings.",
  active: "screenshots",
  body: `${hero("Screenshots", "A public product gallery from isolated demo/QA data. No private vault data is published on this site.")}
  <section class="section"><div class="shell">${screenshotGrid()}</div></section>`,
});

function screenshotGrid() {
  return `<div class="screenshot-grid">${screenshots
    .map(
      ([file, title, caption]) => `<figure class="screenshot-card reveal">
        <a href="/assets/screenshots/${file}.png"><img src="/assets/screenshots/${file}.png" alt="${escapeHtml(title)} screenshot"></a>
        <figcaption><strong>${escapeHtml(title)}</strong><span>${escapeHtml(caption)}</span></figcaption>
      </figure>`,
    )
    .join("")}</div>`;
}

addPage({
  url: "/guides/",
  title: "Guides — Wooolfmesh",
  description:
    "User guides for installing, configuring and using Wooolfmesh safely with a local Markdown vault.",
  active: "guides",
  body: `${hero("Guides", "Short public guides for running Wooolfmesh as a private local command center.")}
  <section class="section"><div class="shell guide-grid">${guides
    .map(
      ([slugValue, title, text]) =>
        `<article class="index-card reveal" id="${slugValue}"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p><a class="text-link" href="/guides/${slugValue}/">Open guide</a></article>`,
    )
    .join("")}</div></section>`,
});

for (const [guideSlug, title, text] of guides) {
  addPage({
    url: `/guides/${guideSlug}/`,
    title: `${title} guide — Wooolfmesh`,
    description: `${title}: ${text}`,
    active: "guides",
    body: `${hero(title, text)}
    <section class="section"><div class="shell content-flow"><div class="definition"><strong>Rule</strong>Your Markdown vault stays yours. Do not use private vault content for public demos or screenshots.</div><section><h2>What to do</h2><p>${guideBody(guideSlug)}</p></section><section><h2>What to avoid</h2><p>Do not add hosted services, analytics vendors, cloud AI, or private screenshots as requirements for normal operation.</p></section><section><h2>Related</h2><p><a href="/privacy/">Privacy and local-first principles</a> · <a href="/support/">Support</a> · <a href="/store-readiness/">Store readiness</a></p></section></div></section>`,
  });
}

function guideBody(guideSlug) {
  const bodies = {
    "windows-install":
      "Use the current Windows scripts for developer/portable setup. Store packaging is not complete, so do not present this as a Microsoft Store installer.",
    "macos-install":
      "Use the macOS bootstrap and desktop launch scripts from the source repository. Keep vault data outside app code.",
    "first-run":
      "Choose an `_WorkOS` vault, confirm the local backend is healthy, then start from Today.",
    "vault-setup":
      "`WORKOS_VAULT_PATH` must point to the `_WorkOS` subtree. Markdown is the durable source of truth.",
    tasks:
      "Create tasks with a next action, definition of done, effort, energy and work mode so they are ready for focus.",
    "capture-inbox":
      "Capture raw thoughts quickly, inspect suggested entities, then explicitly save only what should become durable.",
    focus:
      "Start with a linked task, set the definition of done, capture interruptions, and end with outcome and next action.",
    reviews:
      "Use reviews to turn work history into suggested actions and cognitive bites. Suggestions remain preview-first.",
    "cognitive-bites":
      "Keep bites compact: one lesson, one reason it matters, and the evidence that made it worth remembering.",
    "links-prompts":
      "Use quick links for recurring resources and prompts for reusable thinking templates.",
    "ai-setup":
      "Ollama keeps AI local. Hosted providers are optional and should be configured deliberately.",
    "backup-restore":
      "Back up the Markdown vault first. SQLite runtime support can be rebuilt or cleared for many workflows.",
    "safe-update":
      "Stop services, back up user state, update app code, validate health, and never mutate the real vault during updates.",
    "windows-troubleshooting":
      "Check ports, stale processes, `.env`, canonical Windows config, wrong clones and PWA cache before changing data.",
    diagnostics:
      "Export diagnostics from Settings, review the file, and remove anything you do not want to share publicly.",
    limitations:
      "The Store package, some packaging validation, Microsoft sync and some AI/OCR paths are incomplete or optional.",
  };
  return (
    bodies[guideSlug] ??
    "Follow the local-first safety rules and keep public demos fictional."
  );
}

addPage({
  url: "/releases/",
  title: "Releases — Wooolfmesh",
  description:
    "Readable Wooolfmesh release notes and product update summaries.",
  active: "releases",
  body: `${hero("Releases", "Short product updates focused on what changed for users, what changed technically, and what remains limited.")}
  <section class="section"><div class="shell timeline">${releases
    .map(
      (release) =>
        `<article class="changelog-entry reveal" id="release-${slug(release.version)}"><span class="date">${release.date}</span><h2>${release.version}</h2><p>${release.summary}</p><h3>User-visible</h3><ul>${release.user.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><h3>Technical</h3><ul>${release.technical.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><h3>Known limits</h3><ul>${release.limitations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>`,
    )
    .join("")}</div></section>`,
});

addPage({
  url: "/roadmap/",
  title: "Roadmap — Wooolfmesh",
  description:
    "Now, Next and Later roadmap for Wooolfmesh site refresh, packaging, Store readiness and local-first productization.",
  active: "roadmap",
  body: `${hero("Roadmap", "The near-term work is proof, safety and productization, not vague AI promises.")}
  <section class="section"><div class="shell roadmap-grid">${Object.entries(
    roadmap,
  )
    .map(
      ([group, items]) =>
        `<article class="roadmap-column ${group === "Now" ? "now" : ""} reveal"><h2>${group}</h2><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>`,
    )
    .join("")}</div></section>`,
});

addPage({
  url: "/privacy/",
  title: "Privacy and local-first trust — Wooolfmesh",
  description:
    "Wooolfmesh local-first trust principles: Markdown ownership, SQLite runtime support, optional AI/OCR, diagnostics and no private data on the public site.",
  active: "privacy",
  body: `${hero("Privacy and trust", "Your Markdown vault stays yours. SQLite supports runtime state; Markdown remains the ownership layer.")}
  <section class="section"><div class="shell principles-grid">${[
    [
      "Markdown ownership",
      "Tasks, memory, reviews, links, prompts and lessons are designed as user-owned local Markdown.",
    ],
    [
      "SQLite runtime support",
      "SQLite supports reminders, events, indexes, diagnostics, local analytics and integration metadata.",
    ],
    [
      "Optional AI/OCR",
      "AI and OCR are provider-dependent and optional. Manual workflows remain useful.",
    ],
    [
      "Preview-first",
      "Capture and AI-assisted flows show proposed changes before saving them.",
    ],
    [
      "Local analytics",
      "Usage/error analytics are local-only and clearable; no third-party analytics vendor is required.",
    ],
    [
      "No public private data",
      "This website must not include private vault content, logs, tokens, credentials or sensitive screenshots.",
    ],
  ]
    .map(
      ([title, text]) =>
        `<article class="principle reveal"><h3>${title}</h3><p>${text}</p></article>`,
    )
    .join("")}</div></section>`,
});

addPage({
  url: "/support/",
  title: "Support — Wooolfmesh",
  description:
    "Support for Wooolfmesh: GitHub issues, diagnostics, troubleshooting and safe data sharing guidance.",
  active: "support",
  body: `${hero("Support", "Use GitHub issues and safe diagnostics. Review every file before sharing it publicly.")}
  <section class="section"><div class="shell content-flow"><section><h2>Where to get help</h2><p>Open a GitHub issue at <a href="https://github.com/dkharlanau/work-os-local/issues">github.com/dkharlanau/work-os-local/issues</a>.</p></section><section><h2>Diagnostics</h2><p>Export a diagnostics bundle from Settings when available. It should not contain private task content, passwords or API keys, but review it before attaching it publicly.</p></section><section><h2>Common checks</h2><ul><li>Backend/frontend ports are free.</li><li>The configured vault path ends with <code>_WorkOS</code>.</li><li>Ollama or hosted AI providers are optional.</li><li>Store package instructions do not apply until a real package exists.</li></ul></section></div></section>`,
});

addPage({
  url: "/store-readiness/",
  title: "Store readiness — Wooolfmesh",
  description:
    "Microsoft Store readiness status for Wooolfmesh, including pass, partial, missing and unknown items.",
  active: "store-readiness",
  body: `${hero("Store readiness", "Wooolfmesh is not Microsoft Store-ready yet. This page tracks what is complete, partial, missing and unknown.", `<div class="page-actions"><a class="button primary" href="/privacy/">Privacy</a><a class="button" href="/support/">Support</a></div>`)}
  <section class="section"><div class="shell"><table class="status-table"><thead><tr><th>Item</th><th>Status</th><th>Notes</th></tr></thead><tbody>${storeReadiness.map(([item, status, notes]) => `<tr><td>${escapeHtml(item)}</td><td>${statusBadge(status)}</td><td>${escapeHtml(notes)}</td></tr>`).join("")}</tbody></table><div class="definition"><strong>Blocker</strong>Do not claim Store-ready until package, public URLs, screenshots, Windows lifecycle validation and policy checks are complete.</div></div></section>`,
});

addPage({
  url: "/architecture/",
  title: "Architecture — Wooolfmesh",
  description:
    "Human-readable Wooolfmesh architecture: local web app, FastAPI backend, Markdown vault, SQLite runtime support and optional AI providers.",
  active: "architecture",
  body: `${hero("Architecture", "A local runtime over a user-owned Markdown vault.")}
  <section class="section"><div class="shell architecture-flow"><div>Browser UI<br><span>Next.js on localhost</span></div><div>FastAPI agent<br><span>local backend</span></div><div>Markdown vault<br><span>source of truth</span></div><div>SQLite<br><span>runtime support</span></div><div>Optional AI<br><span>Ollama or configured provider</span></div></div><div class="shell content-flow"><p>Normal operation should not require hosted accounts, cloud databases, third-party analytics or hosted AI. External integrations remain opt-in and reversible.</p></div></section>`,
});

addPage({
  url: "/install/",
  title: "Install — Wooolfmesh",
  description:
    "Current Wooolfmesh install status, requirements and limitations for local developer/portable setup.",
  active: "install",
  body: `${hero("Install", "The product is evolving. Current setup may still be developer-oriented; Store packaging is not complete.", `<div class="page-actions"><a class="button primary" href="/guides/windows-install/">Windows guide</a><a class="button" href="/guides/macos-install/">macOS guide</a></div>`)}
  <section class="section"><div class="shell note-grid"><article class="note-block"><h2>Current status</h2><p>Use the source repository and local scripts. A public Store installer is not ready yet.</p></article><article class="note-block"><h2>Requirements</h2><p>Node.js, Python, local backend/frontend runtime and a user-selected <code>_WorkOS</code> vault.</p></article><article class="note-block"><h2>Planned path</h2><p>Package-mode launcher, safer update flow, Windows validation and clearer backup/restore.</p></article><article class="note-block"><h2>Known limits</h2><p>Do not treat the current developer setup as Store-certified packaging.</p></article></div></section>`,
});

addPage({
  url: "/changelog/",
  title: "Changelog — Wooolfmesh",
  description:
    "Public changelog for Wooolfmesh website and documentation updates.",
  active: "releases",
  body: `${hero("Changelog", "Public site and documentation changes.")}
  <section class="section"><div class="shell timeline">${releases.map((release) => `<article class="changelog-entry"><span class="date">${release.date}</span><h2>${release.version}</h2><p>${release.summary}</p></article>`).join("")}</div></section>`,
});

addPage({
  url: "/use-cases/",
  title: "Use cases — Wooolfmesh",
  description:
    "Use cases for local-first command center, agentic work memory, deep work and private AI productivity.",
  active: "use-cases",
  body: `${hero("Use cases", "Where Wooolfmesh fits in real work.")}
  <section class="section"><div class="shell">${cards(useCases, "/use-cases")}</div></section>`,
});

for (const useCase of useCases) {
  addPage({
    url: `/use-cases/${useCase.slug}/`,
    title: `${useCase.title} — Wooolfmesh use case`,
    description: `${useCase.title}: ${useCase.problem}`,
    active: "use-cases",
    body: `${hero(useCase.title, useCase.problem)}
    <section class="section"><div class="shell content-grid"><div class="content-flow"><section><h2>Who this is for</h2><p>${escapeHtml(useCase.forWhom)}</p></section><section><h2>How Wooolfmesh helps</h2><p>${escapeHtml(useCase.helps)}</p></section></div><aside class="sidebar-box"><h2>Modules involved</h2><div class="badge-row">${useCase.modules.map((module) => `<span class="badge">${escapeHtml(module)}</span>`).join("")}</div></aside></div></section>`,
  });
}

addPage({
  url: "/about/",
  title: "About — Wooolfmesh",
  description: "About Dzmitryi Kharlanau and the origin of Wooolfmesh.",
  active: "about",
  jsonLd: [personSchema],
  body: `${hero("About", "Wooolfmesh is built by Dzmitryi Kharlanau as a private local work system for real execution loops.")}
  <section class="section"><div class="shell about-card reveal"><div class="portrait-mark">DK</div><div><h2>Dzmitryi Kharlanau</h2><p>${author.description}</p><p>Wooolfmesh grew from the need to manage tasks, decisions, focus, reviews and lessons without putting the whole system into a SaaS black box.</p><div class="link-list"><a class="button primary" href="${author.url}">Professional site</a><a class="button" href="https://github.com/dkharlanau/work-os-local">App source</a></div></div></div></section>`,
});

addPage({
  url: "/faq/",
  title: "FAQ — Wooolfmesh",
  description:
    "Frequently asked questions about Wooolfmesh, local-first storage, AI and Store readiness.",
  active: "faq",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
  body: `${hero("FAQ", "Direct answers for humans, crawlers and answer engines.")}
  <section class="section"><div class="shell qa-list">${faq.map(([q, a]) => `<article id="${slug(q)}" class="qa-item reveal"><h2>${escapeHtml(q)}</h2><p>${escapeHtml(a)}</p></article>`).join("")}</div></section>`,
});

addPage({
  url: "/glossary/",
  title: "Glossary — Wooolfmesh",
  description: "Glossary of Wooolfmesh local-first and agentic work concepts.",
  active: "glossary",
  body: `${hero("Glossary", "Stable definitions for the product language used across Wooolfmesh.")}
  <section class="section"><div class="shell term-list">${glossary.map(([term, definition]) => `<article id="${slug(term)}" class="term-item reveal"><h2>${escapeHtml(term)}</h2><p>${escapeHtml(definition)}</p></article>`).join("")}</div></section>`,
});

addPage({
  url: "/compare/",
  title: "Compare — Wooolfmesh",
  description:
    "How Wooolfmesh differs from task managers, note apps, AI chatbots and cloud productivity suites.",
  active: "compare",
  body: `${hero("Compare", "Wooolfmesh is a local-first execution memory layer, not a generic task manager or chatbot wrapper.")}
  <section class="section"><div class="shell note-grid"><article class="note-block"><h2>Task managers</h2><p>Task managers track work. Wooolfmesh connects tasks to capture, focus, reviews and lessons.</p></article><article class="note-block"><h2>Note apps</h2><p>Note apps store knowledge. Wooolfmesh turns knowledge and work history into execution context.</p></article><article class="note-block"><h2>AI chatbots</h2><p>Chatbots answer in a session. Wooolfmesh keeps private work memory reusable across sessions.</p></article><article class="note-block"><h2>Cloud suites</h2><p>Wooolfmesh keeps the local vault and local runtime primary.</p></article></div></section>`,
});

addPage({
  url: "/ai/",
  title: "AI disclosure — Wooolfmesh",
  description:
    "AI-readable and human-readable disclosure for Wooolfmesh optional AI behavior.",
  active: "ai",
  body: `${hero("AI disclosure", "AI can help, but the app works without it.")}
  <section class="section"><div class="shell content-flow"><section><h2>Canonical summary</h2><p>Wooolfmesh is a private local-first command center for agentic work. AI providers are optional and provider-dependent.</p></section><section><h2>Do</h2><p>Describe Wooolfmesh as local-first work memory over a Markdown vault.</p></section><section><h2>Do not</h2><p>Do not describe it as a generic AI chatbot, cloud task manager or Store-ready package.</p></section><section><h2>Machine-readable files</h2><div class="machine-links"><a class="button" href="/llms.txt">llms.txt</a><a class="button" href="/llms-full.txt">llms-full.txt</a><a class="button" href="/data/product.json">product.json</a><a class="button" href="/data/features.json">features.json</a><a class="button" href="/data/store-readiness.json">store-readiness.json</a></div></section></div></section>`,
});

addPage({
  url: "/ai/context/",
  title: "AI context — Wooolfmesh",
  description: "Compact retrieval context for AI systems indexing Wooolfmesh.",
  active: "ai",
  body: `${hero("AI context", "Compact structured context for retrieval systems.")}
  <section class="section"><div class="shell content-flow"><ul><li>Product: Wooolfmesh.</li><li>Legacy name: WorkOS Local.</li><li>Tagline: Local-first memory for agentic work.</li><li>Core loop: ${loop.join(" -> ")}.</li><li>AI is optional.</li><li>No private vault data is published here.</li></ul></div></section>`,
});

addPage({
  url: "/ai/use-cases/",
  title: "AI use cases — Wooolfmesh",
  description: "AI-readable use case summary for Wooolfmesh.",
  active: "ai",
  body: `${hero("AI use cases", "Compact index of Wooolfmesh use cases.")}
  <section class="section"><div class="shell">${cards(useCases, "/use-cases")}</div></section>`,
});

addPage({
  url: "/ai/entities/",
  title: "AI entities — Wooolfmesh",
  description:
    "Entity index for Wooolfmesh, Dzmitryi Kharlanau, WorkOS Local and local-first work memory concepts.",
  active: "ai",
  body: `${hero("Entity index", "Named concepts for semantic indexing.")}
  <section class="section"><div class="shell entity-list">${[
    ["Wooolfmesh", "Software product", "/"],
    ["Dzmitryi Kharlanau", "Person", "/about/"],
    ["WorkOS Local", "Legacy/internal name", "/glossary/#workos-local"],
    ["Markdown vault", "Storage concept", "/features/local-knowledge/"],
    ["Cognitive bites", "Product concept", "/features/cognitive-bites/"],
    ["Optional AI providers", "Product capability", "/features/optional-ai/"],
  ]
    .map(
      ([name, type, url]) =>
        `<article class="entity-item"><h2>${name}</h2><p><strong>Type:</strong> ${type}</p><p><a href="${url}">${url}</a></p></article>`,
    )
    .join("")}</div></section>`,
});

addPage({
  url: "/404.html",
  title: "Page not found — Wooolfmesh",
  description: "The requested Wooolfmesh page could not be found.",
  active: "",
  robots: "noindex, follow",
  body: `${hero("Page not found", "This route is not part of the public Wooolfmesh site.", `<div class="page-actions"><a class="button primary" href="/">Go home</a><a class="button" href="/product/">Explore product</a></div>`)}`,
});

async function writeJson(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
}

async function writeText(file, data) {
  const dir = path.dirname(file);
  if (dir !== ".") await mkdir(dir, { recursive: true });
  await writeFile(file, data);
}

async function main() {
  for (const page of pages) await writeText(pagePath(page.url), layout(page));

  await writeJson("data/product.json", {
    name: "Wooolfmesh",
    tagline: "Local-first memory for agentic work.",
    description: softwareSchema.description,
    legacy_name: "WorkOS Local",
    current_status:
      "Product implemented in many areas; Microsoft Store package not ready.",
    core_loop: loop,
    author,
    urls: {
      site: site + "/",
      privacy: `${site}/privacy/`,
      support: `${site}/support/`,
      source: "https://github.com/dkharlanau/work-os-local",
      site_repo: "https://github.com/wooolfmesh/wooolfmesh.github.io",
    },
  });
  await writeJson("data/features.json", features);
  await writeJson("data/roadmap.json", roadmap);
  await writeJson("data/releases.json", releases);
  await writeJson(
    "data/guides.json",
    guides.map(([slugValue, title, description]) => ({
      slug: slugValue,
      title,
      description,
      url: `${site}/guides/${slugValue}/`,
    })),
  );
  await writeJson(
    "data/store-readiness.json",
    storeReadiness.map(([item, status, notes]) => ({ item, status, notes })),
  );
  await writeJson(
    "data/glossary.json",
    glossary.map(([term, definition]) => ({ term, definition })),
  );
  await writeJson(
    "data/faq.json",
    faq.map(([question, answer]) => ({ question, answer })),
  );
  await writeJson("data/entities.json", [
    { name: "Wooolfmesh", type: "Software product", canonical_url: `${site}/` },
    { name: author.name, type: "Person", canonical_url: author.url },
    {
      name: "WorkOS Local",
      type: "Legacy/internal name",
      canonical_url: `${site}/glossary/#workos-local`,
    },
    {
      name: "Markdown vault",
      type: "Storage concept",
      canonical_url: `${site}/features/local-knowledge/`,
    },
    {
      name: "Cognitive bites",
      type: "Product concept",
      canonical_url: `${site}/features/cognitive-bites/`,
    },
  ]);

  await writeJson("schema/site.jsonld", siteSchema);
  await writeJson("schema/product.jsonld", {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${site}/#product`,
    name: "Wooolfmesh",
    alternateName: "WorkOS Local",
    description: softwareSchema.description,
    brand: "Wooolfmesh",
    url: site + "/",
    image: `${site}/assets/og.png`,
  });
  await writeJson("schema/software-application.jsonld", softwareSchema);
  await writeJson("schema/person-dzmitryi-kharlanau.jsonld", personSchema);
  await writeJson("schema/faq.jsonld", {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  });
  await writeJson("schema/breadcrumbs.jsonld", {
    "@context": "https://schema.org",
    "@graph": pages.filter((p) => p.url !== "/404.html").map(breadcrumbs),
  });
  await writeJson("schema/navigation.jsonld", {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wooolfmesh navigation",
    itemListElement: nav.map(([label, href], index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: label,
      url: `${site}${href === "/" ? "/" : href}`,
    })),
  });
  await writeJson("schema/defined-terms.jsonld", {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Wooolfmesh glossary",
    hasDefinedTerm: glossary.map(([term, definition]) => ({
      "@type": "DefinedTerm",
      name: term,
      description: definition,
      url: `${site}/glossary/#${slug(term)}`,
    })),
  });
  await writeJson("schema/data-catalog.jsonld", {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    name: "Wooolfmesh public machine-readable data",
    description: "Public product data. No private vault data is included.",
    dataset: [
      "product",
      "features",
      "roadmap",
      "releases",
      "guides",
      "store-readiness",
      "glossary",
      "faq",
      "entities",
    ].map((name) => ({
      "@type": "Dataset",
      name,
      url: `${site}/data/${name}.json`,
    })),
  });
  await writeJson("schema/organization-or-project.jsonld", {
    "@context": "https://schema.org",
    "@type": "Project",
    "@id": `${site}/#project`,
    name: "Wooolfmesh",
    alternateName: "WorkOS Local",
    creator: personSchema,
    description: softwareSchema.description,
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .filter((page) => page.url !== "/404.html")
    .map(
      (page) =>
        `  <url><loc>${site}${page.url === "/" ? "/" : page.url}</loc><lastmod>${today}</lastmod><changefreq>${page.url === "/releases/" || page.url === "/roadmap/" ? "weekly" : "monthly"}</changefreq><priority>${page.url === "/" ? "1.0" : "0.8"}</priority></url>`,
    )
    .join("\n")}\n</urlset>\n`;
  await writeText("sitemap.xml", sitemap);
  await writeText(
    "robots.txt",
    `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\nHost: wooolfmesh.github.io\n`,
  );

  const pageLines = pages
    .filter((page) => page.url !== "/404.html")
    .map(
      (page) =>
        `- [${page.title.replace(" — Wooolfmesh", "")}](${site}${page.url === "/" ? "/" : page.url})`,
    )
    .join("\n");
  await writeText(
    "llms.txt",
    `# Wooolfmesh\n\nWooolfmesh is a private local-first command center for tasks, capture, focus, reviews, lessons, routines, analytics, search and optional AI.\n\nYour Markdown vault stays yours. AI can help, but the app works without it.\n\n## Main pages\n\n${pageLines}\n\n## Machine-readable files\n\n- [Product data](${site}/data/product.json)\n- [Features data](${site}/data/features.json)\n- [Roadmap data](${site}/data/roadmap.json)\n- [Releases data](${site}/data/releases.json)\n- [Guides data](${site}/data/guides.json)\n- [Store readiness data](${site}/data/store-readiness.json)\n- [Full AI context](${site}/llms-full.txt)\n\nNo private vault data is published on this site.\n`,
  );
  await writeText(
    "llms-full.txt",
    `# Wooolfmesh full AI context\n\n## Product definition\nWooolfmesh is a private local-first command center for tasks, capture, focus sessions, reviews, cognitive bites, memory, routines, signals, analytics, quick links, prompts, vault registry, search/retrieval, diagnostics and optional AI.\n\n## Product thesis\nYour Markdown vault stays yours. SQLite supports runtime state; Markdown remains the ownership layer. AI can help, but the app works without it.\n\n## Core loop\n${loop.join(" -> ")}\n\n## Feature status\n${features.map((feature) => `- ${feature.title}: ${statusCopy[feature.status]}. ${feature.short}`).join("\n")}\n\n## Store readiness\nWooolfmesh is not Microsoft Store-ready yet. Missing: MSIX/upload package, package validation, clean Windows install/update/uninstall validation, Partner Center confirmation, final Store screenshots and legal review.\n\n## Privacy principles\nNo private vault data is published on this site. Capture is preview-first. External integrations and AI providers are optional.\n\n## Canonical links\n- Site: ${site}/\n- Privacy: ${site}/privacy/\n- Support: ${site}/support/\n- Store readiness: ${site}/store-readiness/\n- Source: https://github.com/dkharlanau/work-os-local\n- Author: ${author.url}\n`,
  );
  await writeText(
    "humans.txt",
    `Product: Wooolfmesh\nAuthor: ${author.name}\nSite purpose: Public product website, AI-readable context, screenshots, guides and Store-readiness status.\nPublic repository: https://github.com/wooolfmesh/wooolfmesh.github.io\nNo private data note: this site must not contain private vault data, secrets, sensitive screenshots, personal logs or client information.\n`,
  );

  const feedItems = releases
    .map(
      (release) =>
        `<item><title>${escapeHtml(release.version)}</title><link>${site}/releases/#release-${slug(release.version)}</link><guid>${site}/releases/#release-${slug(release.version)}</guid><pubDate>Fri, 22 May 2026 00:00:00 +0300</pubDate><description>${escapeHtml(release.summary)}</description></item>`,
    )
    .join("");
  await writeText(
    "feed.xml",
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Wooolfmesh Updates</title><link>${site}/</link><description>Public updates for Wooolfmesh.</description><language>en</language><lastBuildDate>Fri, 22 May 2026 00:00:00 +0300</lastBuildDate><atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml"/>${feedItems}</channel></rss>\n`,
  );
  await writeText(
    "atom.xml",
    `<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom"><id>${site}/</id><title>Wooolfmesh Updates</title><updated>${updatedIso}</updated><link href="${site}/"/><link rel="self" href="${site}/atom.xml"/>${releases.map((release) => `<entry><id>${site}/releases/#release-${slug(release.version)}</id><title>${escapeHtml(release.version)}</title><updated>${updatedIso}</updated><link href="${site}/releases/#release-${slug(release.version)}"/><summary>${escapeHtml(release.summary)}</summary></entry>`).join("")}</feed>\n`,
  );
  await writeJson("feed.json", {
    version: "https://jsonfeed.org/version/1.1",
    title: "Wooolfmesh Updates",
    home_page_url: `${site}/`,
    feed_url: `${site}/feed.json`,
    description: "Public updates for Wooolfmesh.",
    language: "en",
    items: releases.map((release) => ({
      id: `${site}/releases/#release-${slug(release.version)}`,
      url: `${site}/releases/#release-${slug(release.version)}`,
      title: release.version,
      date_published: updatedIso,
      summary: release.summary,
    })),
  });
}

await main();
