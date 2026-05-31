import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const site = "https://wooolfmesh.github.io";
const today = "2026-05-27";
const updatedIso = "2026-05-27T00:00:00+03:00";
const siteName = "Wooolfmesh";
const productRepo = "https://github.com/dkharlanau/work-os-local";
const publicIssues =
  "https://github.com/Wooolfmesh/wooolfmesh.github.io/issues";
const siteRepo = "https://github.com/Wooolfmesh/wooolfmesh.github.io";
const seoDescription =
  "Wooolfmesh is local-first memory for agentic work: a private command center for tasks, capture, focus, reviews, learning, analytics, search, and optional AI over user-owned Markdown.";
const oneSentence =
  "Wooolfmesh is local-first memory for agentic work: a private command center that turns Markdown-owned work memory into daily execution.";

const author = {
  name: "Dzmitryi Kharlanau",
  url: "https://dkharlanau.github.io/",
  description:
    "SAP consultant and builder focused on local-first productivity systems, agentic work memory, and practical execution loops.",
};

const targetKeywords = [
  "private local operating system",
  "local-first productivity",
  "Markdown vault productivity system",
  "personal knowledge management",
  "agentic work memory",
  "daily execution loop",
  "focus sessions",
  "cognitive bites",
  "review-driven productivity",
  "WorkOS Local",
];

const nav = [
  ["Home", "/"],
  ["Product", "/product/"],
  ["Docs", "/guides/"],
  ["Architecture", "/architecture/"],
  ["Install", "/install/"],
  ["Privacy", "/privacy/"],
  ["Support", "/support/"],
];

const loop = [
  "Capture",
  "Clarify",
  "Plan",
  "Focus",
  "Track",
  "Review",
  "Learn",
  "Reuse",
];

const statusCopy = {
  implemented: "Implemented",
  partial: "Partial",
  optional: "Optional",
  roadmap: "Roadmap",
  blocked: "Blocked",
  unknown: "Unknown",
  pass: "Pass",
  missing: "Missing",
};

const implementationStatus = [
  {
    group: "Implemented now",
    status: "implemented",
    items: [
      "Today command center with next action, due/overdue work, blocked/waiting queues, routines, reminders, stats, and capacity cues.",
      "Markdown-backed tasks with planning fields: next action, definition of done, effort, energy, work mode, dates, reminders, links, and notes.",
      "Preview-first capture for task, memory, and cognitive bite candidates.",
      "Focus sessions with task context, interruptions, outcome, next action, and local analytics.",
      "Cognitive bites, memory, quick links, reusable prompts, routines, signals, analytics, local notifications, weekly outcomes, and task shaping.",
      "Knowledge search with scope controls, citations, result grouping, and read-only vault boundaries.",
    ],
  },
  {
    group: "Partial or still being connected",
    status: "partial",
    items: [
      "Review, project, agent, and import suggestions exist, but the single daily follow-through rail is still being consolidated.",
      "Project health exists, but the richer project workbench for movement, milestones, decisions, and recovery actions remains in progress.",
      "Capture can save explicit entities, but capture queue discipline and multi-candidate processing need deeper product work.",
      "Microsoft account connection and one-shot imports exist behind local control, but background polling sync is not implemented.",
      "Package/store readiness, final installer validation, and public distribution hardening remain incomplete.",
    ],
  },
  {
    group: "Roadmap",
    status: "roadmap",
    items: [
      "Calendar-aware capacity planning with richer external calendar context.",
      "Microsoft To Do, Outlook Calendar, and Outlook Mail commitment sync beyond manual proposal import.",
      "Operating manual rules surfaced at task shaping, Today recommendation, and focus start.",
      "Custom Markdown-authored routines, local ritual automation, and store/package readiness.",
    ],
  },
];

const features = [
  {
    slug: "today-command-center",
    title: "Today operating layer",
    status: "implemented",
    short:
      "A daily start surface for next action, planned work, routines, reminders, blockers, capacity, and local context.",
    problem:
      "Daily work gets split across tasks, notes, reminders, review debt, and project drift.",
    behavior:
      "Today gathers local context into one operating layer and points the user toward the next useful action.",
    value:
      "The user starts from a concrete move instead of re-reading the whole system every morning.",
    loop: ["Clarify", "Plan", "Focus", "Review"],
  },
  {
    slug: "tasks",
    title: "Executable tasks",
    status: "implemented",
    short:
      "Markdown-backed tasks with next action, definition of done, effort, energy, work mode, dates, reminders, and links.",
    problem:
      "Title-only tasks are hard to resume after interruption and easy to confuse with vague intentions.",
    behavior:
      "Wooolfmesh treats a task as execution memory with enough context to start, focus, and review.",
    value: "Tasks become reusable work context, not just items in a list.",
    loop: ["Clarify", "Plan", "Focus"],
  },
  {
    slug: "capture-inbox",
    title: "Capture and inbox",
    status: "partial",
    short:
      "Preview-first capture for raw notes, commitments, tasks, memory, and cognitive bite candidates.",
    problem:
      "Useful fragments arrive faster than they can be organized safely.",
    behavior:
      "Capture can propose structured candidates, but the user explicitly decides what becomes durable Markdown.",
    value:
      "Fast capture does not turn into silent mutation of a private vault.",
    loop: ["Capture", "Clarify"],
  },
  {
    slug: "focus-sessions",
    title: "Focus sessions",
    status: "implemented",
    short:
      "Deep work sessions connected to a ready task, interruptions, outcomes, time logs, and next actions.",
    problem:
      "A timer records time but not why the work mattered, what interrupted it, or what changed.",
    behavior:
      "Focus sessions keep task intent, interruptions, outcome, and follow-up together.",
    value:
      "Deep work becomes reviewable and reusable instead of disappearing into a timer log.",
    loop: ["Plan", "Focus", "Review"],
  },
  {
    slug: "reviews",
    title: "Reviews and follow-through",
    status: "partial",
    short:
      "Daily, weekly, project, and experience reviews with suggested actions and preview-first approval flows.",
    problem:
      "Reflection does not matter if lessons and suggested actions never reach future execution.",
    behavior:
      "Reviews summarize patterns and produce follow-up candidates without auto-applying them.",
    value:
      "Work history can become tasks, cognitive bites, and operating rules.",
    loop: ["Review", "Learn", "Reuse"],
  },
  {
    slug: "cognitive-bites",
    title: "Memory and cognitive bites",
    status: "implemented",
    short:
      "Reusable decisions, lessons, mistakes, principles, playbooks, and patterns stored locally.",
    problem:
      "Lessons are often buried in long notes and missing when similar work appears later.",
    behavior:
      "Wooolfmesh stores compact lessons and retrieves them during planning, review, and project work.",
    value: "Experience compounds into practical operating memory.",
    loop: ["Review", "Learn", "Reuse"],
  },
  {
    slug: "project-health",
    title: "Project health",
    status: "partial",
    short:
      "Signals for stale, blocked, overloaded, or missing-next-action projects with concrete recovery direction.",
    problem:
      "Projects drift when blockers, stale tasks, missing next actions, and lessons are scattered.",
    behavior:
      "Project health connects tasks, memory, bites, reviews, and local signals into a health picture.",
    value:
      "The system shows where execution is stuck before the backlog becomes noise.",
    loop: ["Plan", "Focus", "Review"],
  },
  {
    slug: "signals-analytics",
    title: "Signals and analytics",
    status: "implemented",
    short:
      "Local patterns over focus, planning quality, routines, signals, app health, and learning loops.",
    problem:
      "Personal calibration often becomes cloud telemetry in other tools.",
    behavior:
      "Wooolfmesh keeps analytics local and uses them to inform planning and reviews.",
    value:
      "The user can see patterns without handing them to a third-party analytics system.",
    loop: ["Review", "Learn", "Plan"],
  },
  {
    slug: "local-knowledge",
    title: "Local knowledge search",
    status: "implemented",
    short:
      "Search across Wooolfmesh entities and indexed knowledge notes with citations, scope controls, and provenance.",
    problem:
      "Knowledge work loses leverage when tasks, notes, decisions, and lessons cannot be retrieved together.",
    behavior:
      "Wooolfmesh indexes local context while keeping Markdown ownership and read-only vault boundaries clear.",
    value:
      "The user can search local work memory without turning the vault into an opaque cloud database.",
    loop: ["Capture", "Clarify", "Learn", "Reuse"],
  },
  {
    slug: "optional-ai",
    title: "Optional AI assistance",
    status: "optional",
    short:
      "Ollama/local AI and configured hosted providers can assist capture, shaping, summaries, and reflection, but normal use does not require AI.",
    problem:
      "AI productivity tools often make private context upload the center of the workflow.",
    behavior:
      "Wooolfmesh keeps manual/local workflows primary and treats AI output as suggestions.",
    value:
      "AI can help when configured, but the product remains useful without it.",
    loop: ["Capture", "Clarify", "Review"],
  },
];

const scenarios = [
  {
    slug: "daily-command-center",
    title: "Daily command center",
    status: "implemented",
    problem:
      "The user starts the day with too many possible inputs: overdue tasks, routines, blocked projects, reminders, and review debt.",
    flow: "Open Today, scan the next action, check due and overdue work, clear routine nudges, notice blocked or unhealthy projects, and start from one clear action.",
    behavior:
      "Today combines focus candidates, due work, reminders, routines, stats, capacity cues, task quality cues, and project signals.",
    benefit:
      "The morning decision becomes one selected move instead of manual synthesis across pages.",
  },
  {
    slug: "capture-chaos-to-structured-work",
    title: "Capture chaos to structured work",
    status: "partial",
    problem:
      "Raw notes, screenshots, ideas, and email-like commitments arrive before the user knows whether they are tasks, memory, or lessons.",
    flow: "Capture raw input, review proposed task/memory/bite candidates, edit or reject them, then explicitly save only the useful records.",
    behavior:
      "Capture is preview-first. Suggestions can be generated, but durable writes happen through explicit user action.",
    benefit: "The user can unload quickly while preserving trust in the vault.",
  },
  {
    slug: "vague-task-to-executable-task",
    title: "Vague task to executable task",
    status: "implemented",
    problem:
      "A rough task such as 'look into X' is not enough for deep work or future review.",
    flow: "Shape the rough task into a title, next action, definition of done, effort, energy, work mode, project, tags, and links.",
    behavior:
      "Task shaping and task fields make missing execution context visible before the user starts work.",
    benefit:
      "The user can restart the task later without rediscovering the intent.",
  },
  {
    slug: "deep-work-session",
    title: "Deep work session",
    status: "implemented",
    problem:
      "Deep work loses context when interruptions and outcomes are not captured with the task.",
    flow: "Choose a ready task, start focus, capture interruptions without leaving the session, then end with outcome, time log, and next action.",
    behavior:
      "Focus sessions are Markdown-backed and linked to tasks, analytics, and later reviews.",
    benefit:
      "Time spent becomes an inspectable work record, not only elapsed minutes.",
  },
  {
    slug: "review-to-learning",
    title: "Review to learning",
    status: "partial",
    problem:
      "Daily and weekly reviews often produce insight without follow-through.",
    flow: "Run a daily, weekly, project, or experience review, inspect suggested actions, convert approved items into tasks or bites, and carry lessons forward.",
    behavior:
      "Reviews can generate suggested actions and lessons while keeping approval explicit.",
    benefit:
      "Reflection feeds the next execution loop instead of becoming archived prose.",
  },
  {
    slug: "project-health",
    title: "Project health recovery",
    status: "partial",
    problem:
      "Projects become stale, overloaded, blocked, or missing a next action before the user notices.",
    flow: "Open project health, inspect stale tasks, blockers, related lessons, and suggested recovery actions, then create or update the next task deliberately.",
    behavior:
      "The product derives project health from tasks, memory, bites, reviews, and retrieval.",
    benefit:
      "The user can rescue a project from drift with concrete next moves.",
  },
  {
    slug: "personal-memory-and-reusable-lessons",
    title: "Personal memory and reusable lessons",
    status: "implemented",
    problem:
      "Decisions, mistakes, and reusable knowledge disappear into old notes.",
    flow: "Save decisions and lessons as memory or cognitive bites, then retrieve them when planning, reviewing, or preparing focus.",
    behavior:
      "Bites and memory are first-class local entities with search and retrieval support.",
    benefit: "The system reminds the user of what they have already learned.",
  },
  {
    slug: "local-knowledge-search",
    title: "Local knowledge search",
    status: "implemented",
    problem:
      "Tasks and knowledge notes are difficult to search together without uploading private context.",
    flow: "Search across Wooolfmesh entities and selected indexed knowledge notes, filter scope, and follow citations back to local sources.",
    behavior:
      "Indexed reference vaults are read-only by default; search writes runtime index/cache data, not knowledge-note mutations.",
    benefit:
      "The user can retrieve context while preserving local ownership and boundaries.",
  },
  {
    slug: "routines-reminders",
    title: "Routines and reminders",
    status: "implemented",
    problem:
      "Recurring rituals and nudges should support execution without becoming ordinary backlog noise.",
    flow: "Use routines and reminders for repeated attention, planning, health, or shutdown rituals, then act on due nudges from Today.",
    behavior:
      "Routine state and reminders are SQLite-backed runtime support, with local notifications available.",
    benefit:
      "Recurring behavior has a lightweight rail without polluting task history.",
  },
  {
    slug: "optional-ai-provider-setup",
    title: "Optional AI provider setup",
    status: "optional",
    problem:
      "The user may want extraction or reflection help without making AI mandatory.",
    flow: "Use manual workflows by default, configure Ollama/local AI or a hosted provider if desired, and treat generated output as preview data.",
    behavior:
      "AI provider settings, Ollama controls, ADK readiness, OCR paths, and hosted providers are optional and degrade gracefully.",
    benefit:
      "The product remains local-first and useful when no model is running.",
  },
  {
    slug: "agentic-work-memory",
    title: "Agentic work memory",
    status: "partial",
    problem:
      "Agent-assisted work often happens in chat sessions that forget the durable task, decision, review, and lesson system.",
    flow: "Use Wooolfmesh as the local context layer: capture inputs, shape tasks, store decisions and bites, review outcomes, and expose only approved context to agents or AI-assisted flows.",
    behavior:
      "The product keeps Markdown and explicit approval as the durable boundary while optional AI assists with suggestions.",
    benefit:
      "Human and agent work can share a local memory substrate without turning private knowledge into an uncontrolled chatbot log.",
  },
  {
    slug: "local-first-personal-os",
    title: "Local-first personal operating system",
    status: "implemented",
    problem:
      "Planning, notes, reviews, reminders, focus history, and lessons are usually scattered across disconnected tools.",
    flow: "Run the daily loop from Today, use Markdown-backed entities as the durable layer, and let SQLite handle reminders, indexes, routines, and analytics.",
    behavior:
      "Wooolfmesh acts as a local operating layer over the `_WorkOS` vault rather than a hosted account.",
    benefit:
      "The user keeps ownership while still getting one execution surface for daily work.",
  },
  {
    slug: "deep-work-execution",
    title: "Deep work execution",
    status: "implemented",
    problem:
      "Complex work is hard to protect when the finish line, interruptions, and outcome are not recorded together.",
    flow: "Clarify the task, start focus, capture interruptions, end with outcome and next action, then review the session later.",
    behavior:
      "Focus sessions link task readiness, interruption capture, session outcome, analytics, and reviewable Markdown history.",
    benefit:
      "The user can restart and improve deep work rather than only measuring time spent.",
  },
  {
    slug: "reusable-lessons",
    title: "Reusable lessons",
    status: "implemented",
    problem:
      "Project lessons, repeated mistakes, and decisions are easy to forget when similar work appears later.",
    flow: "Turn review outcomes and decisions into cognitive bites, then search or retrieve them during future planning, project health checks, and focus preparation.",
    behavior:
      "Cognitive bites and memory are local first-class entities with retrieval and analytics support.",
    benefit:
      "Experience becomes an active planning input instead of archived notes.",
  },
  {
    slug: "private-ai-productivity",
    title: "Private AI productivity",
    status: "optional",
    problem:
      "Many AI productivity products require private context upload or make the model the center of the workflow.",
    flow: "Use manual workflows by default, configure local Ollama or explicit hosted providers only when desired, and review suggestions before saving them.",
    behavior:
      "AI is optional, provider-dependent, and preview-first across capture, shaping, summaries, and reflection.",
    benefit:
      "The user gets assistance without making cloud AI a requirement for normal operation.",
  },
];

const screenshots = [
  [
    "today-command-center",
    "Today operating layer",
    "Start from one local surface for next action, routines, reminders, queues, and capacity.",
  ],
  [
    "task-detail-planning",
    "Executable task detail",
    "Tasks carry next action, definition of done, effort, energy, work mode, links, and notes.",
  ],
  [
    "capture-inbox",
    "Preview-first capture",
    "Capture raw thoughts and confirm structured candidates before anything becomes durable.",
  ],
  [
    "focus-session",
    "Focus session",
    "Focus preserves task intent, interruptions, outcome, and next action.",
  ],
  [
    "reviews-actions",
    "Reviews and actions",
    "Reviews turn work history into suggested actions and reusable lessons.",
  ],
  [
    "project-health",
    "Project health",
    "Project health shows blockers, stale work, movement signals, and recovery direction.",
  ],
  [
    "memory-bites",
    "Memory and cognitive bites",
    "Decisions, mistakes, and lessons become reusable local memory.",
  ],
  [
    "search-retrieval",
    "Search and retrieval",
    "Local search retrieves WorkOS entities and indexed knowledge notes with provenance.",
  ],
  [
    "settings-trust-ai",
    "Settings, trust, and AI",
    "Settings expose vaults, runtime health, AI providers, data controls, and diagnostics.",
  ],
];

const landingWorkflows = [
  [
    "Today",
    "A quiet command center for due work, routines, reminders, blockers, capacity, and the next useful action.",
  ],
  [
    "Capture",
    "Raw notes become proposed tasks, memory, or cognitive bites only after review and explicit save.",
  ],
  [
    "Focus",
    "Sessions keep intent, interruptions, outcome, time, and next action attached to the work.",
  ],
  [
    "Reviews",
    "Daily, weekly, project, and experience reviews turn history into reusable follow-through.",
  ],
  [
    "Project Health",
    "Stale work, blockers, overloaded projects, and missing next actions surface before they become backlog noise.",
  ],
  [
    "Cognitive Bites",
    "Decisions, mistakes, principles, and playbooks stay compact enough to reuse later.",
  ],
  [
    "Local Search",
    "Search Wooolfmesh entities and indexed knowledge with citations and clear provenance.",
  ],
];

const trustPrinciples = [
  [
    "Private by default",
    "Normal operation does not require hosted accounts, cloud LLMs, SaaS databases, or third-party analytics.",
  ],
  [
    "No silent writes",
    "Capture, review, import, and AI suggestions stay proposals until the user explicitly saves or applies them.",
  ],
  [
    "User-owned Markdown",
    "Durable work memory lives in an inspectable `_WorkOS` Markdown vault, not an opaque cloud workspace.",
  ],
  [
    "Optional AI",
    "Local Ollama or configured providers can help, but manual workflows remain first-class when no model is running.",
  ],
];

const homeFeatures = [
  [
    "Deep work",
    "Focus sessions keep intent, interruption, outcome, and next action together.",
  ],
  [
    "Tasks",
    "Executable work items with definition of done, energy, effort, and links.",
  ],
  [
    "Reviews",
    "Daily, weekly, project, and experience reflection feeds the next loop.",
  ],
  [
    "Cognitive bites",
    "Small reusable lessons, mistakes, principles, and project memory.",
  ],
  [
    "Project memory",
    "Stale work, blockers, decisions, and recovery signals in one place.",
  ],
  [
    "Local search",
    "Find tasks, notes, decisions, and lessons without uploading context.",
  ],
];

const guides = [
  {
    slug: "windows-install",
    title: "Windows install",
    short: "Current portable/developer setup and Store packaging caveat.",
    body: "Use the Windows setup and launch scripts from the source repository. Treat this as a local app/developer setup until package validation is complete. Keep your real vault outside the app repository and point configuration at the `_WorkOS` subtree.",
  },
  {
    slug: "macos-install",
    title: "macOS install",
    short: "Local script setup for macOS.",
    body: "Use the macOS bootstrap and desktop launch scripts from the source repository. Start backend and frontend locally, then open the local web app. Keep vault data outside app code.",
  },
  {
    slug: "first-run",
    title: "First run",
    short: "Choose a vault, confirm local runtime, and start from Today.",
    body: "On first run, confirm the backend is healthy, set `WORKOS_VAULT_PATH` to an `_WorkOS` folder, and open Today. Use Today as the daily operating layer, not as a decorative dashboard.",
  },
  {
    slug: "vault-setup",
    title: "Vault setup",
    short: "Where local data lives and why `_WorkOS` matters.",
    body: "`WORKOS_VAULT_PATH` must point to the `_WorkOS` subtree. Wooolfmesh-owned entities live there as Markdown. Registered reference vaults are read-only by default and can be indexed without being silently mutated.",
  },
  {
    slug: "tasks",
    title: "Good tasks",
    short: "Make tasks executable instead of vague.",
    body: "A good task has a next action, definition of done, effort, energy, work mode, useful links, and enough context to resume later. Use task shaping for rough intent, then review before saving.",
  },
  {
    slug: "capture-inbox",
    title: "Capture and inbox",
    short: "Capture quickly without losing control.",
    body: "Capture raw text, commitments, or ideas quickly. Inspect proposed tasks, memory, and cognitive bites. Nothing becomes durable until you explicitly create or resolve it.",
  },
  {
    slug: "focus",
    title: "Focus sessions",
    short: "Protect deep work and close the loop.",
    body: "Start focus from a ready task, check the finish line, capture interruptions without switching context, and close the session with outcome and next action. Reviews and analytics can use that history later.",
  },
  {
    slug: "reviews",
    title: "Reviews",
    short: "Turn work history into action and learning.",
    body: "Use daily, weekly, project, and experience reviews to find patterns. Suggested actions and lessons stay preview-first until you approve them.",
  },
  {
    slug: "cognitive-bites",
    title: "Memory and cognitive bites",
    short: "Store lessons so they can be reused.",
    body: "Use memory for durable facts, decisions, blockers, and preferences. Use cognitive bites for compact lessons, mistakes, playbooks, and principles that should reappear during future planning.",
  },
  {
    slug: "links-prompts",
    title: "Quick links and prompts",
    short: "Keep recurring resources and thinking templates close to the work.",
    body: "Use quick links for repeated local resources and prompts for reusable thinking templates. They should support the execution loop rather than becoming another disconnected library.",
  },
  {
    slug: "ai-setup",
    title: "Optional AI setup",
    short: "Use local or hosted providers deliberately.",
    body: "Ollama is the preferred local AI path. Hosted providers can be configured only when desired. AI output is suggestion data and should not be treated as an automatic write authority.",
  },
  {
    slug: "backup-restore",
    title: "Backup and restore",
    short: "Back up Markdown first and understand runtime state.",
    body: "Back up the `_WorkOS` Markdown vault first. SQLite stores runtime support such as reminders, events, indexes, registry data, and local analytics. Some runtime state can be rebuilt from Markdown.",
  },
  {
    slug: "safe-update",
    title: "Safe update",
    short: "Update app code without mutating personal data.",
    body: "Stop services, back up user state, update app code, validate health, and never run update scripts that mutate a real user vault without explicit approval.",
  },
  {
    slug: "windows-troubleshooting",
    title: "Windows troubleshooting",
    short:
      "Diagnose ports, stale processes, config, wrong clone, and PWA cache.",
    body: "Check whether backend/frontend ports are occupied, stale PID files exist, `.env` points to the wrong vault, the wrong clone is running, or the browser/PWA cache is stale.",
  },
  {
    slug: "diagnostics",
    title: "Diagnostics",
    short: "Export safe diagnostics and review before sharing.",
    body: "Use diagnostics for support, but review every bundle before attaching it publicly. Remove secrets, private task content, personal logs, or anything sensitive.",
  },
  {
    slug: "limitations",
    title: "Limitations",
    short: "What not to overclaim.",
    body: "The product is not a generic team SaaS app, not a chatbot wrapper, and not ready for Microsoft Store distribution yet. Microsoft sync, package validation, calendar-aware capacity, and some OCR/AI paths are partial, optional, or roadmap.",
  },
];

const docsGroups = [
  {
    title: "Getting Started",
    text: "Install locally, choose a vault, and start from the daily command center.",
    links: [
      [
        "Install status",
        "/install/",
        "Current setup path and distribution limits.",
      ],
      [
        "Windows install",
        "/guides/windows-install/",
        "Local setup on Windows.",
      ],
      ["macOS install", "/guides/macos-install/", "Local setup on macOS."],
      [
        "First run",
        "/guides/first-run/",
        "Confirm backend health and open Today.",
      ],
    ],
  },
  {
    title: "Product Concept",
    text: "Understand the execution loop and the main surfaces before diving into details.",
    links: [
      [
        "Product overview",
        "/product/",
        "Who it is for and how the loop works.",
      ],
      ["Good tasks", "/guides/tasks/", "Make work executable, not vague."],
      ["Capture", "/guides/capture-inbox/", "Review proposals before saving."],
      [
        "Focus and reviews",
        "/guides/focus/",
        "Protect deep work and close the loop.",
      ],
    ],
  },
  {
    title: "Local Data Model",
    text: "See what stays in Markdown, what SQLite supports, and what never mutates silently.",
    links: [
      [
        "Vault setup",
        "/guides/vault-setup/",
        "Point configuration at `_WorkOS`.",
      ],
      [
        "Architecture",
        "/architecture/",
        "Markdown, SQLite, runtime, and AI boundaries.",
      ],
      [
        "Backup and restore",
        "/guides/backup-restore/",
        "Back up Markdown first.",
      ],
      [
        "Safe update",
        "/guides/safe-update/",
        "Update app code without touching personal data.",
      ],
    ],
  },
  {
    title: "Optional AI",
    text: "Use local or configured providers only when they help, with preview-first output.",
    links: [
      [
        "AI setup",
        "/guides/ai-setup/",
        "Configure optional assistance deliberately.",
      ],
      ["AI disclosure", "/ai/", "Machine-readable AI positioning and limits."],
      [
        "Privacy model",
        "/privacy/",
        "Approval boundaries and local ownership.",
      ],
    ],
  },
  {
    title: "Troubleshooting",
    text: "Recover from setup, runtime, cache, diagnostics, and packaging confusion.",
    links: [
      [
        "Windows troubleshooting",
        "/guides/windows-troubleshooting/",
        "Ports, stale processes, config, and cache.",
      ],
      ["Diagnostics", "/guides/diagnostics/", "Export support data safely."],
      [
        "Limitations",
        "/guides/limitations/",
        "What the product does not claim yet.",
      ],
    ],
  },
  {
    title: "Support",
    text: "Find privacy, support, source, and public feedback routes quickly.",
    links: [
      ["Support", "/support/", "Report bugs or request workflow improvements."],
      ["Privacy", "/privacy/", "Local-first trust principles."],
      ["Product source", productRepo, "Canonical application repository."],
    ],
  },
];

const roadmap = {
  "Now / implemented": [
    "Today operating layer with next action, due and overdue work, blocked/waiting queues, routines, reminders, task-quality cues, and capacity signals.",
    "Markdown-backed tasks, memory, cognitive bites, focus sessions, reviews, prompts, quick links, releases, and operating manual content.",
    "Preview-first capture, task shaping, review suggestions, local analytics, routines, local notifications, weekly outcomes, project health, and knowledge search.",
    "Local-first architecture: Next.js frontend, FastAPI backend, Markdown source of truth, SQLite runtime support, optional AI providers.",
  ],
  "Next / P0": [
    "Make Today the canonical daily orchestration contract, not only a page-level aggregation.",
    "Upgrade focus activation and closeout so readiness, interruptions, outcomes, and lessons feed the learning loop.",
    "Consolidate review, project, agent, and import suggestions into one follow-through rail.",
    "Keep product docs, backlog, release notes, and public website stewardship aligned with implemented reality.",
  ],
  "Later / P1": [
    "Weekly outcomes planner refinements and stronger outcome-to-review comparison.",
    "Operating manual rules and cognitive bites surfaced during planning, task shaping, Today recommendations, and focus start.",
    "Project health workbench with movement, milestones, decisions, stale work, blockers, and next-action creation.",
    "Capture processing discipline that supports fast capture without becoming a hidden dumping ground.",
    "Knowledge vault search completion across read-only indexed vaults, citations, and scoped retrieval.",
  ],
  "Exploratory / P2": [
    "Calendar-aware capacity planning with richer external calendar context.",
    "Microsoft To Do, Outlook Calendar, and Outlook Mail commitment sync with opt-in, inspectable, reversible behavior.",
    "Local notifications and ritual automation beyond current routine nudges.",
    "Packaging, Store readiness, distribution, and update authority when validation is complete.",
  ],
};

const releases = [
  {
    version: "2026-05-27 public positioning refresh",
    date: today,
    summary:
      "Refreshes the public site around Wooolfmesh as a private local operating system for daily execution.",
    user: [
      "Repositions the product around Capture -> Clarify -> Plan -> Focus -> Review -> Learn -> Reuse.",
      "Adds scenario-led documentation for daily operation, capture, focus, reviews, project health, search, routines, and optional AI.",
      "Separates implemented capabilities from partial and roadmap work.",
      "Moves public feedback CTAs to the public site issue tracker.",
    ],
    technical: [
      "Keeps the static generator as the source of truth for pages, JSON, JSON-LD, feeds, sitemap, and LLM files.",
      "Refreshes metadata, structured data, OpenGraph copy, machine-readable product data, and public support links.",
      "Softens the visual system into a calmer product/documentation site without adding dependencies.",
    ],
    limitations: [
      "The canonical product source repository may not be publicly accessible to all users.",
      "A GitHub Pages cache delay can briefly serve the previous build after push.",
      "The product is not packaged for Store distribution and should not be described as packaged distribution.",
    ],
  },
];

const storeReadiness = [
  [
    "Public site",
    "pass",
    "The canonical public site is https://wooolfmesh.github.io/.",
  ],
  [
    "Feedback URL",
    "pass",
    "Public bugs and ideas go to the public site issue tracker.",
  ],
  [
    "Product source URL",
    "partial",
    "Canonical source is dkharlanau/work-os-local, but access may be restricted until visibility changes.",
  ],
  [
    "Privacy/support pages",
    "partial",
    "Public pages exist; final distribution review is still needed before Store submission.",
  ],
  [
    "Screenshots",
    "partial",
    "Sanitized QA screenshots exist; final Store export and human review remain pending.",
  ],
  ["MSIX/upload package", "missing", "No Microsoft Store package exists."],
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
    "Draft privacy/support material exists; human/legal review is required before public distribution claims.",
  ],
];

const faq = [
  ["What is Wooolfmesh?", oneSentence],
  [
    "Was Wooolfmesh previously called WorkOS Local?",
    "Yes. WorkOS Local remains the compatibility name for package names, paths, environment variables, and the `_WorkOS` vault layout.",
  ],
  [
    "Where does data live?",
    "Durable user-owned entities live as Markdown under the configured `_WorkOS` vault. SQLite stores runtime support such as reminders, events, indexes, registry data, and analytics.",
  ],
  [
    "Is AI required?",
    "No. AI is optional. Ollama/local AI and configured hosted providers can assist, but normal workflows remain usable without a model.",
  ],
  [
    "Can Wooolfmesh write into my other notes?",
    "The control vault is writable for Wooolfmesh-owned entities. Registered reference vaults are read-only by default and should not be silently mutated.",
  ],
  [
    "Where should I report bugs or product ideas?",
    `Open a public issue at ${publicIssues}.`,
  ],
  [
    "Is Wooolfmesh ready for Microsoft Store distribution?",
    "No. Packaging, package validation, final Store screenshots, Windows lifecycle validation, and policy review are still incomplete.",
  ],
];

const glossary = [
  ["Wooolfmesh", oneSentence],
  ["WorkOS Local", "Legacy/internal compatibility name for Wooolfmesh."],
  [
    "Markdown vault",
    "The local `_WorkOS` subtree where durable Wooolfmesh-owned entities are stored as Markdown.",
  ],
  [
    "SQLite runtime support",
    "Local database support for reminders, events, indexes, diagnostics, local analytics, and integration metadata.",
  ],
  [
    "Preview-first",
    "Generated, extracted, or imported changes are shown before the user saves or applies anything durable.",
  ],
  [
    "No silent mutation",
    "The product must not alter private work memory without explicit user action.",
  ],
  [
    "Cognitive bite",
    "A compact reusable lesson, decision, mistake, principle, playbook, or pattern.",
  ],
  [
    "Operating manual",
    "A user-authored local rulebook for recurring preferences, principles, and work habits.",
  ],
  [
    "Read-only knowledge vault",
    "A registered vault that Wooolfmesh may index for search but must not write to by default.",
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

function cardGrid(items, base = "") {
  return `<div class="index-grid">${items
    .map(
      (item) => `<article class="index-card reveal">
        <div class="card-meta">${item.status ? statusBadge(item.status) : ""}</div>
        <h2><a href="${base}/${item.slug}/">${escapeHtml(item.title)}</a></h2>
        <p>${escapeHtml(item.short ?? item.problem)}</p>
        <a class="text-link" href="${base}/${item.slug}/">Read more</a>
      </article>`,
    )
    .join("")}</div>`;
}

function hero(title, subtitle, ctas = "") {
  return `<section class="page-hero compact"><div class="shell reveal"><h1>${escapeHtml(title)}</h1><p class="lead">${escapeHtml(subtitle)}</p>${ctas}</div></section>`;
}

function sectionHeading(label, title, text = "") {
  return `<div class="section-heading reveal">${label ? `<p class="system-label">${escapeHtml(label)}</p>` : ""}<h2>${escapeHtml(title)}</h2>${text ? `<p>${escapeHtml(text)}</p>` : ""}</div>`;
}

function bullets(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
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
  description: seoDescription,
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
  description: seoDescription,
  isAccessibleForFree: true,
  keywords: targetKeywords,
  featureList: features.map(
    (feature) => `${feature.title} (${statusCopy[feature.status]})`,
  ),
  sameAs: [productRepo, siteRepo],
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
    name: page.title.replace(" - Wooolfmesh", "").replace(" — Wooolfmesh", ""),
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
    <meta property="og:image:alt" content="Wooolfmesh local-first memory for agentic work">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(page.ogTitle ?? page.title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    <meta name="twitter:image" content="${site}/assets/og.png">
    <meta name="twitter:image:alt" content="Wooolfmesh local-first memory for agentic work">
    <meta name="theme-color" content="#2f654d">
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
        <a class="brand" href="/" aria-label="Wooolfmesh home"><img src="/assets/wooolfmesh.png" alt="">Wooolfmesh</a>
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
          <p>${oneSentence}</p>
          <p class="footer-small">Formerly WorkOS Local. No private vault data is published here.</p>
        </div>
        <div class="footer-links">
          ${nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
          <a href="/use-cases/">Use cases</a>
          <a href="/roadmap/">Roadmap</a>
          <a href="/ai/">AI disclosure</a>
          <a href="${publicIssues}">Report a bug</a>
          <a href="${productRepo}">Product source</a>
          <a href="${siteRepo}">Site source</a>
        </div>
      </div>
    </footer>
    <script src="/assets/script.js"></script>
  </body>
</html>`;
}

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

function statusColumns() {
  return `<div class="status-columns">${implementationStatus
    .map(
      (group) => `<article class="status-column reveal">
        ${statusBadge(group.status)}
        <h3>${escapeHtml(group.group)}</h3>
        ${bullets(group.items)}
      </article>`,
    )
    .join("")}</div>`;
}

addPage({
  url: "/",
  title: "Wooolfmesh - Local-first memory for agentic work",
  description: seoDescription,
  active: "",
  jsonLd: [siteSchema, softwareSchema],
  body: `<section class="hero landing-hero">
    <div class="shell indie-hero-grid">
      <div class="indie-hero-copy reveal">
        <div class="hero-logo-line"><img src="/assets/wooolfmesh.png" alt=""><span>Wooolfmesh</span></div>
        <p class="system-label">Local-first work memory</p>
        <h1>Agentic workbench for builders.</h1>
        <p class="lead">Capture ideas, shape tasks, run focus, review the loop. Your Markdown stays yours.</p>
        <div class="hero-actions"><a class="button primary" href="/install/">Install locally</a><a class="button" href="/guides/">Docs</a><a class="button ghost" href="${productRepo}">GitHub</a></div>
      </div>
      <div class="workbench-visual reveal" role="img" aria-label="Wooolfmesh workbench visual">
        <div class="mascot-chip"><img src="/assets/wooolfmesh.png" alt="Wooolfmesh mascot"></div>
        <div class="terminal-card">
          <span class="terminal-dot"></span><span class="terminal-dot"></span><span class="terminal-dot"></span>
          <pre><code>vault: ./_WorkOS
 capture.md
 task.next_action
 focus.session
 review.lessons
 bite.reuse</code></pre>
        </div>
        <div class="stack-card stack-card-a">no silent writes</div>
        <div class="stack-card stack-card-b">AI optional</div>
        <div class="stack-card stack-card-c">local-first</div>
      </div>
    </div>
  </section>
  <section class="section loop-section">
    <div class="shell compact-section">
      <p class="system-label">Product loop</p>
      <div class="loop-orbit" role="list" aria-label="Wooolfmesh product loop">
        ${loop.map((step, index) => `<article class="loop-orbit-step reveal" role="listitem"><span>${String(index + 1).padStart(2, "0")}</span><strong>${step}</strong></article>`).join("")}
      </div>
    </div>
  </section>
  <section class="section architecture-section">
    <div class="shell data-map-layout">
      <div class="section-heading reveal"><p class="system-label">Local-first map</p><h2>Private context, visible boundaries.</h2></div>
      <div class="data-map reveal" role="img" aria-label="Local-first architecture diagram">
        <div class="data-node data-node-user">Builder</div>
        <div class="data-arrow">capture / plan / review</div>
        <div class="data-node data-node-app">Wooolfmesh</div>
        <div class="data-split">
          <div class="data-node data-node-vault">Markdown vault<br><small>owned, readable, portable</small></div>
          <div class="data-node data-node-runtime">SQLite runtime<br><small>reminders, events, indexes</small></div>
        </div>
        <div class="data-node data-node-ai">Optional AI<br><small>suggestions only</small></div>
      </div>
    </div>
  </section>
  <section class="section feature-slab">
    <div class="shell">
      <div class="feature-slab-head reveal"><p class="system-label">Built for the loop</p><h2>Deep work, tasks, reviews, bites, project memory.</h2></div>
      <div class="home-feature-grid">
        ${homeFeatures
          .map(
            ([title, text], index) =>
              `<article class="home-feature-card reveal"><span>${String(index + 1).padStart(2, "0")}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`,
          )
          .join("")}
      </div>
    </div>
  </section>
  <section class="trust-ribbon" aria-label="Wooolfmesh trust principles">
    <div class="shell trust-ribbon-inner">
      <span>Your Markdown stays yours</span>
      <span>AI is optional</span>
      <span>No silent writes</span>
      <span>Local-first by default</span>
    </div>
  </section>
  <section class="section landing-link-section">
    <div class="shell landing-link-grid reveal">
      <a href="/guides/"><strong>Docs</strong><span>Setup, vaults, AI, troubleshooting.</span></a>
      <a href="${productRepo}"><strong>GitHub</strong><span>Read the source and run locally.</span></a>
      <a href="/support/"><strong>Support</strong><span>Report issues and request workflow fixes.</span></a>
    </div>
  </section>`,
});

addPage({
  url: "/product/",
  title: "Product - Wooolfmesh",
  description:
    "Detailed product overview for Wooolfmesh: thesis, target users, local-first storage, optional AI, and long-term value.",
  active: "product",
  jsonLd: [softwareSchema],
  body: `${hero("Product overview", oneSentence, `<div class="page-actions"><a class="button primary" href="/features/">Feature status</a><a class="button" href="/architecture/">Architecture</a></div>`)}
  <section class="section"><div class="shell content-grid"><div class="content-flow">
    <section><h2>Product thesis</h2><p>Wooolfmesh is a local operating layer for a single technical user who wants tasks, knowledge, lessons, focus, reviews, signals, and local AI assistance to participate in one execution loop.</p></section>
    <section><h2>Who it is for</h2><p>It is for builders, consultants, researchers, and independent knowledge workers who already treat their notes as valuable infrastructure and want a private command layer over that knowledge.</p></section>
    <section><h2>Who it is not for</h2><p>It is not a team project-management SaaS, not a hosted collaboration workspace, not a cloud database product, and not a generic AI chatbot interface.</p></section>
    <section><h2>Why Markdown plus local runtime matters</h2><p>Markdown gives the user inspectable durable ownership. SQLite supports reminders, events, indexes, registry state, diagnostics, and local analytics without becoming the canonical store for user-owned work memory.</p></section>
    <section><h2>How AI is used safely</h2><p>AI can propose capture candidates, task shapes, summaries, review ideas, and reflection prompts. Generated output is suggestion data. Durable writes require explicit approval through normal create or apply flows.</p></section>
    <section><h2>Value over time</h2><p>The value compounds when yesterday's focus outcomes, review lessons, project signals, and cognitive bites reappear during today's planning and execution.</p></section>
  </div><aside class="sidebar-box"><h2>Core loop</h2><div class="badge-row">${loop.map((step) => `<span class="badge">${step}</span>`).join("")}</div></aside></div></section>
  <section class="section"><div class="shell">${sectionHeading("Current state", "Implemented, partial, and roadmap", "Status is grounded in the current WorkOS Local product docs and backlog.")}${statusColumns()}</div></section>`,
});

addPage({
  url: "/features/",
  title: "Feature status - Wooolfmesh",
  description:
    "Built, partial, optional, and roadmap Wooolfmesh features from the current product state.",
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
  body: `${hero("Feature status", "A factual map of what is implemented, partial, optional, and roadmap.")}
  <section class="section"><div class="shell">${cardGrid(features, "/features")}</div></section>`,
});

for (const feature of features) {
  addPage({
    url: `/features/${feature.slug}/`,
    title: `${feature.title} - Wooolfmesh feature`,
    description: `${feature.title}: ${feature.short}`,
    active: "features",
    body: `${hero(feature.title, `${statusCopy[feature.status]}: ${feature.short}`)}
    <section class="section"><div class="shell content-grid"><div class="content-flow">
      <div class="definition"><strong>Status</strong>${statusBadge(feature.status)} ${escapeHtml(feature.short)}</div>
      <section><h2>User problem</h2><p>${escapeHtml(feature.problem)}</p></section>
      <section><h2>Product behavior</h2><p>${escapeHtml(feature.behavior)}</p></section>
      <section><h2>Benefit</h2><p>${escapeHtml(feature.value)}</p></section>
      <section><h2>Loop fit</h2><p>${feature.loop.join(" -> ")}</p></section>
    </div><aside class="sidebar-box"><h2>Related</h2><ul><li><a href="/features/">All features</a></li><li><a href="/use-cases/">Use cases</a></li><li><a href="/guides/">Guides</a></li></ul></aside></div></section>`,
  });
}

addPage({
  url: "/use-cases/",
  title: "Use cases - Wooolfmesh",
  description:
    "Scenario-led documentation for daily command center, capture, task shaping, focus, reviews, project health, memory, search, routines, and optional AI.",
  active: "use-cases",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Wooolfmesh use cases",
      itemListElement: scenarios.map((scenario, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: scenario.title,
        url: `${site}/use-cases/${scenario.slug}/`,
      })),
    },
  ],
  body: `${hero("Use cases", "Wooolfmesh is easiest to understand as usage scenarios, not as a list of isolated features.")}
  <section class="section"><div class="shell">${cardGrid(scenarios, "/use-cases")}</div></section>`,
});

for (const scenario of scenarios) {
  addPage({
    url: `/use-cases/${scenario.slug}/`,
    title: `${scenario.title} - Wooolfmesh use case`,
    description: `${scenario.title}: ${scenario.problem}`,
    active: "use-cases",
    body: `${hero(scenario.title, scenario.problem)}
    <section class="section"><div class="shell content-grid"><div class="content-flow scenario-detail">
      <section><h2>Problem</h2><p>${escapeHtml(scenario.problem)}</p></section>
      <section><h2>User flow</h2><p>${escapeHtml(scenario.flow)}</p></section>
      <section><h2>Product behavior</h2><p>${escapeHtml(scenario.behavior)}</p></section>
      <section><h2>Benefit</h2><p>${escapeHtml(scenario.benefit)}</p></section>
    </div><aside class="sidebar-box"><h2>Implementation status</h2>${statusBadge(scenario.status)}<p>${statusCopy[scenario.status]}</p><p><a href="/roadmap/">View roadmap</a></p></aside></div></section>`,
  });
}

addPage({
  url: "/guides/",
  title: "Docs - Wooolfmesh",
  description:
    "Practical user-facing documentation for using Wooolfmesh safely day to day.",
  active: "guides",
  body: `${hero("Docs", "Start here for local setup, product concepts, Markdown ownership, optional AI, troubleshooting, and support.")}
  <section class="section docs-section"><div class="shell docs-grid">${docsGroups
    .map(
      (group) => `<article class="docs-card reveal">
        <h2>${escapeHtml(group.title)}</h2>
        <p>${escapeHtml(group.text)}</p>
        <div class="docs-link-list">
          ${group.links
            .map(
              ([label, href, text]) =>
                `<a class="docs-link" href="${href}"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(text)}</span></a>`,
            )
            .join("")}
        </div>
      </article>`,
    )
    .join("")}</div></section>`,
});

for (const guide of guides) {
  addPage({
    url: `/guides/${guide.slug}/`,
    title: `${guide.title} guide - Wooolfmesh`,
    description: `${guide.title}: ${guide.short}`,
    active: "guides",
    body: `${hero(guide.title, guide.short)}
    <section class="section"><div class="shell content-flow">
      <div class="definition"><strong>Safety rule</strong>Keep real user data local. Do not publish private vault content, secrets, screenshots, or logs.</div>
      <section><h2>How to use this</h2><p>${escapeHtml(guide.body)}</p></section>
      <section><h2>What remains explicit</h2><p>Capture, AI, review, import, and agent suggestions require user approval before durable writes. Configuration should point at <code>_WorkOS</code>, and reference vaults should remain read-only unless deliberately reconfigured.</p></section>
      <section><h2>Related</h2><p><a href="/privacy/">Privacy and trust</a> · <a href="/architecture/">Architecture</a> · <a href="/support/">Support</a></p></section>
    </div></section>`,
  });
}

addPage({
  url: "/architecture/",
  title: "Architecture - Wooolfmesh",
  description:
    "Human-readable Wooolfmesh architecture: Next.js frontend, FastAPI backend, Markdown vault, SQLite runtime, optional AI, and preview-first write boundaries.",
  active: "architecture",
  body: `${hero("Architecture", "A local web app and local backend over a user-owned Markdown vault.")}
  <section class="section"><div class="shell">
    <div class="architecture-flow">
      <div>Next.js frontend<span>Local browser UI for Today, tasks, capture, focus, reviews, settings, and search.</span></div>
      <div>FastAPI backend<span>Validates requests, owns Markdown IO, scheduler/runtime services, and optional AI calls.</span></div>
      <div>Markdown vault<span>Durable source of truth for user-owned entities under <code>_WorkOS</code>.</span></div>
      <div>SQLite runtime<span>Reminders, task events, indexes, cache, diagnostics, registry, routines, and analytics.</span></div>
      <div>Optional AI<span>Ollama/local AI or configured providers. Useful, but never required for normal operation.</span></div>
    </div>
    <div class="content-flow architecture-copy">
      <section><h2>Preview-first AI boundary</h2><p>Capture, task shaping, review generation, ADK/agent output, and import proposals are suggestions. Saving or applying them is a separate explicit action.</p></section>
      <section><h2>Explicit write policy</h2><p>The control vault configured by <code>WORKOS_VAULT_PATH</code> is the writable Wooolfmesh area. Registered reference or archive vaults are read-only by default. Indexing writes runtime cache rows, not source note edits.</p></section>
      <section><h2>No silent mutation of personal knowledge</h2><p>Wooolfmesh should not mutate, delete, reformat, migrate, or overwrite real user vault data without explicit user approval.</p></section>
    </div>
  </div></section>`,
});

addPage({
  url: "/roadmap/",
  title: "Roadmap - Wooolfmesh",
  description:
    "Public Wooolfmesh roadmap split into implemented Now, Next P0, Later P1, and Exploratory P2 categories.",
  active: "roadmap",
  body: `${hero("Roadmap", "Implemented work and future work are separated deliberately.")}
  <section class="section"><div class="shell roadmap-grid">${Object.entries(
    roadmap,
  )
    .map(
      ([group, items]) =>
        `<article class="roadmap-column ${group.startsWith("Now") ? "now" : ""} reveal"><h2>${escapeHtml(group)}</h2>${bullets(items)}</article>`,
    )
    .join("")}</div></section>`,
});

addPage({
  url: "/support/",
  title: "Support - Wooolfmesh",
  description:
    "Report Wooolfmesh bugs, request features, discuss improvements, and find the source and roadmap links.",
  active: "support",
  body: `${hero("Support and feedback", "Found a bug or have a product idea? Open a GitHub issue so it can be tracked publicly.", `<div class="page-actions"><a class="button primary" href="${publicIssues}">Open public issue</a><a class="button" href="${productRepo}">View product source</a></div>`)}
  <section class="section"><div class="shell note-grid">
    <article class="note-block"><h2>Report bugs</h2><p>Use the public issue tracker for broken pages, confusing docs, install problems, or product behavior that needs triage.</p><a class="text-link" href="${publicIssues}">Report a bug</a></article>
    <article class="note-block"><h2>Request features</h2><p>Describe the workflow, the problem, and what would make the local-first loop better.</p><a class="text-link" href="${publicIssues}">Request a feature</a></article>
    <article class="note-block"><h2>Read docs first</h2><p>Use the docs index for setup, local data model, optional AI, troubleshooting, and current limitations.</p><a class="text-link" href="/guides/">Open docs</a></article>
    <article class="note-block"><h2>Privacy and source</h2><p>Review local-first trust principles, then inspect the product source for implementation details.</p><a class="text-link" href="/privacy/">Privacy model</a></article>
  </div></section>`,
});

addPage({
  url: "/privacy/",
  title: "Privacy and local-first trust - Wooolfmesh",
  description:
    "Wooolfmesh local-first trust principles: Markdown ownership, SQLite runtime support, optional AI, diagnostics, preview-first writes, and read-only knowledge vault indexing.",
  active: "privacy",
  body: `${hero("Privacy and trust", "Private work memory should remain under local user control.", `<div class="page-actions"><a class="button primary" href="/guides/vault-setup/">Vault setup</a><a class="button" href="/support/">Support</a></div>`)}
  <section class="section"><div class="shell principles-grid">${[
    [
      "Markdown ownership",
      "Durable tasks, memory, bites, reviews, prompts, focus sessions, and releases are stored as local Markdown.",
    ],
    [
      "SQLite runtime support",
      "SQLite supports reminders, events, indexes, diagnostics, routine state, local analytics, and registry records.",
    ],
    [
      "Preview-first writes",
      "Capture, shaping, AI, review, and import outputs are proposals until explicitly saved or applied.",
    ],
    [
      "Read-only reference vaults",
      "Registered knowledge vaults can be indexed for search without being silently written to.",
    ],
    [
      "Optional AI",
      "Ollama/local AI and hosted providers can assist, but the app works without them.",
    ],
    [
      "No private site data",
      "This public site must not include private vault content, secrets, credentials, or sensitive screenshots.",
    ],
  ]
    .map(
      ([title, text]) =>
        `<article class="principle reveal"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`,
    )
    .join("")}</div></section>`,
});

addPage({
  url: "/screenshots/",
  title: "Screenshots - Wooolfmesh",
  description:
    "Sanitized Wooolfmesh screenshots from isolated demo/QA data covering Today, tasks, capture, focus, reviews, projects, memory, search, and settings.",
  active: "screenshots",
  body: `${hero("Screenshots", "A public product gallery from isolated demo/QA data.")}
  <section class="section"><div class="shell">${screenshotGrid()}</div></section>`,
});

addPage({
  url: "/store-readiness/",
  title: "Store readiness - Wooolfmesh",
  description:
    "Microsoft Store readiness status for Wooolfmesh, including pass, partial, missing, and unknown items.",
  active: "store-readiness",
  body: `${hero("Store readiness", "Wooolfmesh is not ready for Microsoft Store distribution yet.", `<div class="page-actions"><a class="button primary" href="/privacy/">Privacy</a><a class="button" href="/support/">Support</a></div>`)}
  <section class="section"><div class="shell"><table class="status-table"><thead><tr><th>Item</th><th>Status</th><th>Notes</th></tr></thead><tbody>${storeReadiness.map(([item, status, notes]) => `<tr><td>${escapeHtml(item)}</td><td>${statusBadge(status)}</td><td>${escapeHtml(notes)}</td></tr>`).join("")}</tbody></table><div class="definition"><strong>Blocker</strong>Do not claim packaged distribution until package, public URLs, screenshots, Windows lifecycle validation, and policy checks are complete.</div></div></section>`,
});

addPage({
  url: "/install/",
  title: "Install - Wooolfmesh",
  description:
    "Current Wooolfmesh install status, local setup requirements, and distribution limitations.",
  active: "install",
  body: `${hero("Install", "Current setup is local and may still be developer-oriented. Public packaged distribution is not complete.", `<div class="page-actions"><a class="button primary" href="/guides/windows-install/">Windows guide</a><a class="button" href="/guides/macos-install/">macOS guide</a></div>`)}
  <section class="section"><div class="shell note-grid"><article class="note-block"><h2>Current status</h2><p>Use the source repository and local scripts. A public Store installer is not ready yet.</p></article><article class="note-block"><h2>Requirements</h2><p>Node.js, Python, local backend/frontend runtime, and a user-selected <code>_WorkOS</code> vault.</p></article><article class="note-block"><h2>Planned path</h2><p>Package-mode launcher, safer update flow, Windows validation, and clearer backup/restore.</p></article><article class="note-block"><h2>Known limits</h2><p>Do not treat the current developer setup as packaged distribution.</p></article></div></section>`,
});

addPage({
  url: "/releases/",
  title: "Releases - Wooolfmesh",
  description:
    "Readable Wooolfmesh release notes and public product update summaries.",
  active: "releases",
  body: `${hero("Releases", "Short product updates focused on user-visible changes, technical changes, and known limits.")}
  <section class="section"><div class="shell timeline">${releases
    .map(
      (release) =>
        `<article class="changelog-entry reveal" id="release-${slug(release.version)}"><span class="date">${release.date}</span><h2>${escapeHtml(release.version)}</h2><p>${escapeHtml(release.summary)}</p><h3>User-visible</h3>${bullets(release.user)}<h3>Technical</h3>${bullets(release.technical)}<h3>Known limits</h3>${bullets(release.limitations)}</article>`,
    )
    .join("")}</div></section>`,
});

addPage({
  url: "/changelog/",
  title: "Changelog - Wooolfmesh",
  description:
    "Public changelog for Wooolfmesh website and documentation updates.",
  active: "releases",
  body: `${hero("Changelog", "Public site and documentation changes.")}
  <section class="section"><div class="shell timeline">${releases.map((release) => `<article class="changelog-entry"><span class="date">${release.date}</span><h2>${escapeHtml(release.version)}</h2><p>${escapeHtml(release.summary)}</p></article>`).join("")}</div></section>`,
});

addPage({
  url: "/about/",
  title: "About - Wooolfmesh",
  description: "About Dzmitryi Kharlanau and the origin of Wooolfmesh.",
  active: "about",
  jsonLd: [personSchema],
  body: `${hero("About", "Wooolfmesh is built by Dzmitryi Kharlanau as a private local work system for real execution loops.")}
  <section class="section"><div class="shell about-card reveal"><div class="portrait-mark">DK</div><div><h2>Dzmitryi Kharlanau</h2><p>${escapeHtml(author.description)}</p><p>Wooolfmesh grew from the need to manage tasks, decisions, focus, reviews, and lessons without putting the whole system into a SaaS black box.</p><div class="link-list"><a class="button primary" href="${author.url}">Professional site</a><a class="button" href="${productRepo}">Product source</a></div></div></div></section>`,
});

addPage({
  url: "/faq/",
  title: "FAQ - Wooolfmesh",
  description:
    "Frequently asked questions about Wooolfmesh, local-first storage, AI, feedback, and Store readiness.",
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
  body: `${hero("FAQ", "Direct answers for humans, crawlers, and answer engines.")}
  <section class="section"><div class="shell qa-list">${faq.map(([q, a]) => `<article id="${slug(q)}" class="qa-item reveal"><h2>${escapeHtml(q)}</h2><p>${escapeHtml(a)}</p></article>`).join("")}</div></section>`,
});

addPage({
  url: "/glossary/",
  title: "Glossary - Wooolfmesh",
  description:
    "Glossary of Wooolfmesh local-first and daily execution concepts.",
  active: "glossary",
  body: `${hero("Glossary", "Stable definitions for the product language used across Wooolfmesh.")}
  <section class="section"><div class="shell term-list">${glossary.map(([term, definition]) => `<article id="${slug(term)}" class="term-item reveal"><h2>${escapeHtml(term)}</h2><p>${escapeHtml(definition)}</p></article>`).join("")}</div></section>`,
});

addPage({
  url: "/compare/",
  title: "Compare - Wooolfmesh",
  description:
    "How Wooolfmesh differs from task managers, note apps, AI chatbots, and cloud productivity suites.",
  active: "compare",
  body: `${hero("Compare", "Wooolfmesh is a local execution operating system, not a generic task manager or chatbot wrapper.")}
  <section class="section"><div class="shell note-grid"><article class="note-block"><h2>Task managers</h2><p>Task managers track work. Wooolfmesh connects tasks to capture, focus, reviews, and lessons.</p></article><article class="note-block"><h2>Note apps</h2><p>Note apps store knowledge. Wooolfmesh turns knowledge and work history into execution context.</p></article><article class="note-block"><h2>AI chatbots</h2><p>Chatbots answer in a session. Wooolfmesh keeps private work memory reusable across sessions.</p></article><article class="note-block"><h2>Cloud suites</h2><p>Wooolfmesh keeps the local vault and local runtime primary.</p></article></div></section>`,
});

addPage({
  url: "/ai/",
  title: "AI disclosure - Wooolfmesh",
  description:
    "AI-readable and human-readable disclosure for Wooolfmesh optional AI behavior.",
  active: "ai",
  body: `${hero("AI disclosure", "AI can help, but the app works without it.")}
  <section class="section"><div class="shell content-flow"><section><h2>Canonical summary</h2><p>${oneSentence} AI providers are optional and provider-dependent.</p></section><section><h2>Do</h2><p>Describe Wooolfmesh as a local-first operating layer over a Markdown vault.</p></section><section><h2>Do not</h2><p>Do not describe it as a generic AI chatbot, cloud task manager, team SaaS app, or packaged Store distribution.</p></section><section><h2>Machine-readable files</h2><div class="machine-links"><a class="button" href="/llms.txt">llms.txt</a><a class="button" href="/llms-full.txt">llms-full.txt</a><a class="button" href="/data/product.json">product.json</a><a class="button" href="/data/features.json">features.json</a><a class="button" href="/data/roadmap.json">roadmap.json</a></div></section></div></section>`,
});

addPage({
  url: "/ai/context/",
  title: "AI context - Wooolfmesh",
  description: "Compact retrieval context for AI systems indexing Wooolfmesh.",
  active: "ai",
  body: `${hero("AI context", "Compact structured context for retrieval systems.")}
  <section class="section"><div class="shell content-flow"><ul><li>Product: Wooolfmesh.</li><li>Legacy name: WorkOS Local.</li><li>Definition: ${oneSentence}</li><li>Core loop: ${loop.join(" -> ")}.</li><li>AI is optional.</li><li>No private vault data is published here.</li></ul></div></section>`,
});

addPage({
  url: "/ai/use-cases/",
  title: "AI use cases - Wooolfmesh",
  description: "AI-readable use case summary for Wooolfmesh.",
  active: "ai",
  body: `${hero("AI use cases", "Compact index of Wooolfmesh use cases.")}
  <section class="section"><div class="shell">${cardGrid(scenarios, "/use-cases")}</div></section>`,
});

addPage({
  url: "/ai/entities/",
  title: "AI entities - Wooolfmesh",
  description:
    "Entity index for Wooolfmesh, Dzmitryi Kharlanau, WorkOS Local, and local-first work memory concepts.",
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
        `<article class="entity-item"><h2>${escapeHtml(name)}</h2><p><strong>Type:</strong> ${escapeHtml(type)}</p><p><a href="${url}">${url}</a></p></article>`,
    )
    .join("")}</div></section>`,
});

addPage({
  url: "/404.html",
  title: "Page not found - Wooolfmesh",
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

function aliasPage(target, title) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)}</title><meta name="robots" content="noindex, follow"><link rel="canonical" href="${site}${target}"><meta http-equiv="refresh" content="0; url=${target}"></head><body><p><a href="${target}">Continue to ${escapeHtml(title)}</a></p></body></html>`;
}

async function main() {
  for (const page of pages) await writeText(pagePath(page.url), layout(page));

  for (const [file, target, title] of [
    ["about.html", "/about/", "About - Wooolfmesh"],
    ["changelog.html", "/changelog/", "Changelog - Wooolfmesh"],
    ["install.html", "/install/", "Install - Wooolfmesh"],
    ["privacy.html", "/privacy/", "Privacy - Wooolfmesh"],
    ["product.html", "/product/", "Product - Wooolfmesh"],
    ["roadmap.html", "/roadmap/", "Roadmap - Wooolfmesh"],
  ]) {
    await writeText(file, aliasPage(target, title));
  }

  await writeJson("data/product.json", {
    name: "Wooolfmesh",
    definition: oneSentence,
    tagline:
      "Private local operating system for daily execution over a Markdown vault.",
    description: seoDescription,
    legacy_name: "WorkOS Local",
    current_status:
      "Many product surfaces are implemented; some integration loops and public packaging remain partial or roadmap.",
    core_loop: loop,
    author,
    urls: {
      site: site + "/",
      privacy: `${site}/privacy/`,
      support: `${site}/support/`,
      feedback: publicIssues,
      source: productRepo,
      site_repo: siteRepo,
    },
  });
  await writeJson("data/features.json", features);
  await writeJson("data/roadmap.json", roadmap);
  await writeJson("data/releases.json", releases);
  await writeJson(
    "data/guides.json",
    guides.map((guide) => ({
      slug: guide.slug,
      title: guide.title,
      description: guide.short,
      url: `${site}/guides/${guide.slug}/`,
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
    {
      name: "Preview-first capture",
      type: "Trust principle",
      canonical_url: `${site}/features/capture-inbox/`,
    },
  ]);

  await writeJson("schema/site.jsonld", siteSchema);
  await writeJson("schema/product.jsonld", {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${site}/#product`,
    name: "Wooolfmesh",
    alternateName: "WorkOS Local",
    description: seoDescription,
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
    description: seoDescription,
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
        `- [${page.title.replace(" - Wooolfmesh", "")}](${site}${page.url === "/" ? "/" : page.url})`,
    )
    .join("\n");
  await writeText(
    "llms.txt",
    `# Wooolfmesh\n\n${oneSentence}\n\nThe product is local-first, Markdown-backed, and preview-first. AI can help, but the app works without it.\n\n## Main pages\n\n${pageLines}\n\n## Machine-readable files\n\n- [Product data](${site}/data/product.json)\n- [Features data](${site}/data/features.json)\n- [Roadmap data](${site}/data/roadmap.json)\n- [Releases data](${site}/data/releases.json)\n- [Guides data](${site}/data/guides.json)\n- [Store readiness data](${site}/data/store-readiness.json)\n- [Full AI context](${site}/llms-full.txt)\n\nNo private vault data is published on this site.\n`,
  );
  await writeText(
    "llms-full.txt",
    `# Wooolfmesh full AI context\n\n## Product definition\n${oneSentence}\n\n## Product thesis\nWooolfmesh is a local-first operating layer for daily execution. It connects tasks, capture, focus sessions, reviews, cognitive bites, memory, projects, routines, signals, analytics, search, local knowledge, and optional AI into one loop.\n\n## Core loop\n${loop.join(" -> ")}\n\n## Storage model\nMarkdown under the configured _WorkOS vault is the durable source of truth for user-owned entities. SQLite stores runtime support such as reminders, task events, indexes, registry data, routine state, diagnostics, and analytics.\n\n## Feature status\n${features.map((feature) => `- ${feature.title}: ${statusCopy[feature.status]}. ${feature.short}`).join("\n")}\n\n## Roadmap\n${Object.entries(
      roadmap,
    )
      .map(
        ([group, items]) =>
          `${group}\n${items.map((item) => `- ${item}`).join("\n")}`,
      )
      .join(
        "\n\n",
      )}\n\n## Store readiness\nWooolfmesh is not ready for Microsoft Store distribution yet. Missing: MSIX/upload package, package validation, clean Windows install/update/uninstall validation, Partner Center confirmation, final Store screenshots, and legal/policy review.\n\n## Privacy principles\nNo private vault data is published on this site. Capture is preview-first. External integrations and AI providers are optional. Registered knowledge vaults are read-only by default.\n\n## Canonical links\n- Site: ${site}/\n- Privacy: ${site}/privacy/\n- Support: ${site}/support/\n- Public issues: ${publicIssues}\n- Product source: ${productRepo}\n- Site source: ${siteRepo}\n- Author: ${author.url}\n`,
  );
  await writeText(
    "humans.txt",
    `Product: Wooolfmesh\nAuthor: ${author.name}\nSite purpose: Public product website, AI-readable context, screenshots, guides, roadmap, and support entry point.\nPublic feedback: ${publicIssues}\nPublic site repository: ${siteRepo}\nCanonical product repository: ${productRepo}\nNo private data note: this site must not contain private vault data, secrets, sensitive screenshots, personal logs, or client information.\n`,
  );

  const feedItems = releases
    .map(
      (release) =>
        `<item><title>${escapeHtml(release.version)}</title><link>${site}/releases/#release-${slug(release.version)}</link><guid>${site}/releases/#release-${slug(release.version)}</guid><pubDate>Wed, 27 May 2026 00:00:00 +0300</pubDate><description>${escapeHtml(release.summary)}</description></item>`,
    )
    .join("");
  await writeText(
    "feed.xml",
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Wooolfmesh Updates</title><link>${site}/</link><description>Public updates for Wooolfmesh.</description><language>en</language><lastBuildDate>Wed, 27 May 2026 00:00:00 +0300</lastBuildDate><atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml"/>${feedItems}</channel></rss>\n`,
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
