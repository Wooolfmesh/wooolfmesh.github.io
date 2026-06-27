import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const site = "https://wooolfmesh.github.io";
const today = "2026-06-27";
const updatedIso = "2026-06-27T00:00:00+03:00";
const updatedRss = "Sat, 27 Jun 2026 00:00:00 +0300";
const siteName = "Wooolfmesh";
const productRepo = "https://github.com/dkharlanau/work-os-local";
const publicIssues =
  "https://github.com/Wooolfmesh/wooolfmesh.github.io/issues";
const siteRepo = "https://github.com/Wooolfmesh/wooolfmesh.github.io";
const seoDescription =
  "Wooolfmesh is local-first memory for agentic work: a private command center for tasks, capture, focus, reviews, cognitive bites, project health, local search, and optional AI over user-owned Markdown.";
const oneSentence =
  "Wooolfmesh is local-first memory for agentic work: a private command center that connects tasks, capture, focus, reviews, lessons, project health, and local knowledge into one execution loop over a Markdown vault.";

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
  ["Product", "/product/"],
  ["Architecture", "/architecture/"],
  ["Roadmap", "/roadmap/"],
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
    slug: "plan-today",
    title: "Plan today",
    status: "implemented",
    problem:
      "The user opens the app with due work, reminders, routines, blockers, and review debt competing for attention.",
    flow: "Open Today, read the recommended next move, check why it matters now, and expand later queues only when needed.",
    behavior:
      "Today combines recommendations, due work, reminders, routines, capacity cues, task quality, and project signals.",
    benefit:
      "The user starts from one concrete action instead of rebuilding the day from scattered context.",
  },
  {
    slug: "capture-rough-thought-into-task",
    title: "Capture rough thought into a task",
    status: "partial",
    problem:
      "Raw ideas and commitments arrive before the user knows whether they are tasks, memory, or lessons.",
    flow: "Capture raw input, inspect proposed candidates, check confidence and missing fields, then explicitly create the task or discard the preview.",
    behavior:
      "Capture remains preview-first. Durable Markdown writes happen only through explicit save/create actions.",
    benefit:
      "The user can unload quickly without letting the inbox become an unsafe dumping ground.",
  },
  {
    slug: "open-and-clarify-task",
    title: "Open and clarify a task",
    status: "implemented",
    problem:
      "A task title alone is not enough to resume work or decide whether it is ready for focus.",
    flow: "Open the task, read next action and definition of done first, inspect blockers and readiness cues, then clarify missing execution fields.",
    behavior:
      "Task detail surfaces next action, finish line, status, dates, effort, energy, work mode, dependencies, and quality cues before secondary metadata.",
    benefit:
      "The user knows what to do now and what must be clarified before deeper work.",
  },
  {
    slug: "start-focus",
    title: "Start focus",
    status: "implemented",
    problem:
      "A timer alone does not preserve intent, blockers, interruptions, or session outcome.",
    flow: "Choose a task, confirm finish line and duration, note readiness warnings, start anyway when useful, capture interruptions, and close with outcome and next action.",
    behavior:
      "Focus sessions keep task intent, interruption capture, outcome, time, and follow-up connected to local work history.",
    benefit:
      "Deep work becomes inspectable and reusable instead of just elapsed minutes.",
  },
  {
    slug: "review-and-approve-suggestions",
    title: "Review and approve suggestions",
    status: "partial",
    problem:
      "Reflection loses value when suggested follow-up never reaches execution or applies too much automatically.",
    flow: "Run a daily, weekly, project, or experience review, inspect suggested actions, approve only the useful ones, and keep the rest as previews.",
    behavior:
      "Reviews can create Markdown review files and show suggestions, while action application remains explicit.",
    benefit:
      "The user turns reflection into follow-through without losing control of the vault.",
  },
  {
    slug: "reuse-lessons-and-cognitive-bites",
    title: "Reuse lessons and cognitive bites",
    status: "implemented",
    problem:
      "Decisions, repeated mistakes, and useful patterns are easy to forget when similar work returns later.",
    flow: "Save lessons as memory or cognitive bites, retrieve them through search, task context, reviews, and project workbench views.",
    behavior:
      "Bites and memory are local first-class entities with retrieval and provenance support.",
    benefit:
      "Experience becomes an active planning input instead of archived notes.",
  },
  {
    slug: "check-project-health",
    title: "Check project health",
    status: "partial",
    problem:
      "Projects drift when stale tasks, blockers, missing next actions, and open loops are spread across the vault.",
    flow: "Open Projects, scan health signals, inspect stale or blocked work, review suggested next moves, and approve only the recovery action you want.",
    behavior:
      "Project health connects tasks, memory, cognitive bites, reviews, and local signals into visible status and next-move cues.",
    benefit: "The user can recover a project before the backlog becomes noise.",
  },
  {
    slug: "work-without-ai-or-with-optional-ai",
    title: "Work without AI, or add optional AI",
    status: "optional",
    problem:
      "AI productivity tools often require private context upload or fail when the model is unavailable.",
    flow: "Use manual workflows by default, enable local Ollama or an explicit hosted provider when desired, and treat generated output as preview data.",
    behavior:
      "AI settings are optional and degraded/manual mode remains a normal operating path.",
    benefit:
      "Wooolfmesh stays useful and local-first even when no AI provider is configured.",
  },
  {
    slug: "search-local-work-memory",
    title: "Search local work memory",
    status: "implemented",
    problem:
      "Tasks, decisions, notes, and lessons are hard to retrieve together without uploading private context.",
    flow: "Search Wooolfmesh entities and indexed knowledge notes, filter scope, and follow citations back to local sources.",
    behavior:
      "Indexed reference vaults stay read-only by default; search stores runtime index data rather than mutating knowledge notes.",
    benefit:
      "The user can retrieve relevant context while preserving local ownership and boundaries.",
  },
  {
    slug: "run-routines-and-reminders",
    title: "Run routines and reminders",
    status: "implemented",
    problem:
      "Recurring nudges should help execution without becoming ordinary backlog clutter.",
    flow: "Use routines and reminders for planning, health checks, or shutdown rituals, then act on due nudges from Today.",
    behavior:
      "Routine state and reminders are local runtime support, with optional local notifications.",
    benefit:
      "Repeated behavior has a lightweight rail without polluting durable task history.",
  },
];

const legacyScenarioRedirects = [
  ["daily-command-center", "plan-today", "Daily command center"],
  [
    "capture-chaos-to-structured-work",
    "capture-rough-thought-into-task",
    "Capture chaos to structured work",
  ],
  [
    "vague-task-to-executable-task",
    "open-and-clarify-task",
    "Vague task to executable task",
  ],
  ["deep-work-session", "start-focus", "Deep work session"],
  ["deep-work-execution", "start-focus", "Deep work execution"],
  [
    "review-to-learning",
    "review-and-approve-suggestions",
    "Review to learning",
  ],
  ["project-health", "check-project-health", "Project health recovery"],
  [
    "personal-memory-and-reusable-lessons",
    "reuse-lessons-and-cognitive-bites",
    "Personal memory and reusable lessons",
  ],
  ["reusable-lessons", "reuse-lessons-and-cognitive-bites", "Reusable lessons"],
  [
    "local-knowledge-search",
    "search-local-work-memory",
    "Local knowledge search",
  ],
  [
    "routines-reminders",
    "run-routines-and-reminders",
    "Routines and reminders",
  ],
  [
    "optional-ai-provider-setup",
    "work-without-ai-or-with-optional-ai",
    "Optional AI provider setup",
  ],
  [
    "private-ai-productivity",
    "work-without-ai-or-with-optional-ai",
    "Private AI productivity",
  ],
  ["agentic-work-memory", "plan-today", "Agentic work memory"],
  [
    "local-first-personal-os",
    "plan-today",
    "Local-first personal operating system",
  ],
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
    "Tasks live in one place.",
    "Notes, lessons, reviews, AI chats, reminders, and project health often live somewhere else.",
  ],
  [
    "Modern tools split execution.",
    "Work starts in chat, moves to notes, hides in a task title, and loses the reason it mattered.",
  ],
  [
    "Lessons rarely return.",
    "The same mistakes repeat because reviews and reusable lessons are not connected to future planning.",
  ],
  [
    "Ownership gets blurred.",
    "Cloud-first productivity systems make private work memory hard to inspect, move, or recover.",
  ],
];

const loopDetails = [
  [
    "Capture",
    "Get rough thoughts, commitments, and fragments out of your head.",
  ],
  [
    "Clarify",
    "Shape them into tasks, memory, or lessons without polluting the vault.",
  ],
  ["Plan", "Choose a next action, finish line, effort, energy, and timing."],
  [
    "Focus",
    "Start deep work with intent, interruptions, and session context attached.",
  ],
  [
    "Track",
    "Keep outcomes, time, movement, routines, and project state visible.",
  ],
  ["Review", "Turn the day, week, project, or experience into follow-through."],
  [
    "Learn",
    "Compress decisions, mistakes, patterns, and playbooks into cognitive bites.",
  ],
  [
    "Reuse",
    "Bring those lessons back into future tasks, searches, reviews, and planning.",
  ],
];

const homeFeatures = [
  [
    "Today Command Center",
    "One daily surface for next action, routines, reminders, queues, and capacity.",
    "command",
  ],
  [
    "Capture Inbox",
    "Unload rough inputs, then decide what deserves durable Markdown.",
    "capture",
  ],
  [
    "Task Shaping",
    "Turn vague intent into next action, definition of done, effort, and mode.",
    "shape",
  ],
  [
    "Deep Work Focus",
    "Run sessions with a clear finish line, interruptions, outcome, and next step.",
    "focus",
  ],
  [
    "Reviews",
    "Convert daily, weekly, project, and experience history into follow-through.",
    "review",
  ],
  [
    "Cognitive Bites",
    "Save reusable decisions, lessons, mistakes, principles, and playbooks.",
    "bite",
  ],
  [
    "Project Health",
    "See stale, blocked, overloaded, or missing-next-action work before it drifts.",
    "health",
  ],
  [
    "Local Search / Vault",
    "Search tasks, notes, decisions, and lessons with provenance and local boundaries.",
    "search",
  ],
  [
    "Optional AI",
    "Use local Ollama or configured providers for suggestions without making AI mandatory.",
    "ai",
  ],
];

const homeUseCases = [
  [
    "Plan a real day without hiding overload",
    "Today brings due work, reminders, routines, blocked work, and capacity into one visible decision.",
  ],
  [
    "Capture rough thoughts without polluting the vault",
    "Capture can propose tasks, memory, or bites, but durable records require explicit action.",
  ],
  [
    "Start deep work with a clear finish line",
    "Focus starts from a task with intent, definition of done, duration, and interruption capture.",
  ],
  [
    "Turn repeated mistakes into reusable cognitive bites",
    "Reviews and closeouts can become compact lessons that return during future work.",
  ],
  [
    "See which projects are stale, blocked, or missing a next action",
    "Project health makes drift visible before it becomes ordinary backlog noise.",
  ],
];

const comparison = [
  [
    "Cloud task manager",
    "Tracks work items, but usually rents your work graph and separates reviews from lessons.",
  ],
  [
    "Notes app",
    "Stores knowledge, but rarely knows which project is blocked or what should happen next.",
  ],
  [
    "Chatbot",
    "Can generate advice, but the useful context often disappears into session history.",
  ],
  [
    "Wooolfmesh",
    "Connects execution, local memory, focus, review, lessons, project health, and ownership.",
  ],
];

const trustPrinciples = [
  [
    "Markdown vault",
    "Durable user-owned work memory stays in an inspectable `_WorkOS` Markdown subtree.",
  ],
  [
    "SQLite runtime",
    "Reminders, events, indexes, registry state, diagnostics, and analytics support the loop without becoming the ownership layer.",
  ],
  [
    "Optional AI",
    "Ollama or configured hosted providers can help, but manual/local workflows remain normal.",
  ],
  [
    "Explicit approval",
    "Suggestions become durable only after Preview -> Approve -> Write.",
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
    version: "2026-06-27 compact editorial redesign",
    date: today,
    summary:
      "Rebuilds the public site as a compact, editorial product system for local-first work memory.",
    user: [
      "Makes the first screen explicit about local ownership, optional AI, preview-first behavior, and the product’s private execution role.",
      "Reduces the homepage to one execution loop, one distinction, three pillars, a technical architecture, and two product-evidence views.",
      "Uses the existing mascot as a restrained identity seal instead of a hero illustration.",
    ],
    technical: [
      "Replaces the accumulated visual layers with one responsive CSS system and no new dependencies.",
      "Builds the execution loop and architecture diagrams from semantic HTML and CSS.",
      "Refreshes metadata, social preview, release data, feeds, sitemap, and machine-readable context dates.",
    ],
    limitations: [
      "The canonical product source repository may not be publicly accessible to all users.",
      "GitHub Pages can briefly serve a previous build while edge caches update.",
      "The product is not packaged for Store distribution and should not be described as packaged distribution.",
    ],
  },
  {
    version: "2026-06-24 premium product site relaunch",
    date: "2026-06-24",
    summary:
      "Rebuilds the public website around Wooolfmesh as local-first memory for agentic work.",
    user: [
      "Reframes the homepage around the Capture -> Clarify -> Plan -> Focus -> Track -> Review -> Learn -> Reuse execution loop.",
      "Adds a stronger dark-first product presentation with command-center, mesh, architecture, preview-first, comparison, and use-case sections.",
      "Keeps local-first ownership, optional AI, and preview-first safety central without implying cloud SaaS or Store-ready distribution.",
      "Preserves public docs, privacy, support, discovery files, and machine-readable context for humans and crawlers.",
    ],
    technical: [
      "Keeps the static generator as the source of truth for pages, JSON, JSON-LD, feeds, sitemap, and LLM files.",
      "Refreshes generated release data, metadata dates, feeds, sitemap, and machine-readable product data.",
      "Rethemes the static CSS without adding a framework runtime or heavy dependency.",
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

function absoluteUrl(href) {
  if (href.startsWith("http")) return href;
  if (href.startsWith("/#")) return `${site}/${href.slice(1)}`;
  return `${site}${href === "/" ? "/" : href}`;
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
    <meta name="theme-color" content="#f5f3ec">
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
                `<a href="${href}"${active && href.startsWith("/") && href.startsWith(`/${active}`) ? ' aria-current="page"' : ""}>${label}</a>`,
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
          <a href="/product/">Product</a>
          <a href="/architecture/">Architecture</a>
          <a href="/guides/">Guides</a>
          <a href="/roadmap/">Roadmap</a>
          <a href="/privacy/">Privacy</a>
          <a href="/support/">Support</a>
          <a href="/ai/">AI disclosure</a>
          <a href="${publicIssues}">Feedback</a>
          <a href="${productRepo}">GitHub</a>
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
  title: "Wooolfmesh — Local-first memory for agentic work",
  description: seoDescription,
  active: "",
  jsonLd: [siteSchema, softwareSchema],
  body: `<section class="landing-hero">
    <div class="shell hero-grid">
      <div class="hero-copy reveal">
        <h1>Local-first memory for agentic work.</h1>
        <p class="lead">A private execution layer for tasks, focus, reviews, lessons, projects, and local Markdown knowledge.</p>
        <div class="hero-actions"><a class="button primary" href="/product/">Explore product <span aria-hidden="true">↗</span></a><a class="button" href="${productRepo}">View source</a></div>
        <p class="trust-row"><span>Markdown-owned</span><span>Local runtime</span><span>Optional AI</span><span>Preview-first</span></p>
      </div>
      <div class="memory-map reveal" role="img" aria-label="Seven-step execution loop connected to a local Markdown vault and local runtime">
        <div class="map-inputs">
          ${["Capture", "Clarify", "Plan", "Focus"]
            .map(
              (step, index) =>
                `<div class="map-node"><span>0${index + 1}</span><strong>${step}</strong><i></i></div>`,
            )
            .join("")}
        </div>
        <div class="map-core">
          <span class="map-lock" aria-hidden="true"></span>
          <strong>Local vault</strong>
          <small>user-owned Markdown</small>
        </div>
        <div class="map-outputs">
          ${["Review", "Learn", "Reuse"]
            .map(
              (step, index) =>
                `<div class="map-node${index === 2 ? " active" : ""}"><i></i><span>0${index + 5}</span><strong>${step}</strong></div>`,
            )
            .join("")}
        </div>
        <div class="map-runtime"><strong>Local runtime</strong><small>SQLite support · optional AI</small></div>
        <div class="map-connector connector-left"></div>
        <div class="map-connector connector-right"></div>
        <div class="map-connector connector-down"></div>
      </div>
    </div>
  </section>
  <section id="execution-loop" class="home-section loop-section">
    <div class="shell">
      <div class="section-index"><span>01</span><span>Execution loop</span><span>Your work, in a better loop.</span></div>
      <div class="execution-loop" role="list" aria-label="Capture, clarify, plan, focus, review, learn, reuse">
        ${loop
          .map(
            (step, index) =>
              `<article class="loop-step${step === "Focus" ? " active" : ""}" role="listitem"><span>0${index + 1}</span><i></i><strong>${step}</strong></article>`,
          )
          .join("")}
      </div>
    </div>
  </section>
  <section class="home-section distinction-section">
    <div class="shell distinction-grid">
      <div class="section-index vertical"><span>02</span><span>Distinction</span></div>
      <div class="distinction-copy reveal">
        <p>Not a task app.</p>
        <p>Not a note app.</p>
        <p>Not an AI chatbot.</p>
        <p>A local memory and execution layer.</p>
      </div>
    </div>
  </section>
  <section class="home-section pillars-section">
    <div class="shell">
      <div class="section-index"><span>03</span><span>Product pillars</span><span>One private system.</span></div>
      <div class="pillars">
        <article class="pillar reveal"><span>P01</span><h2>Own your memory</h2><p>Your context stays readable, portable, and yours.</p></article>
        <article class="pillar reveal"><span>P02</span><h2>Execute from Today</h2><p>Turn plans and signals into the next useful action.</p></article>
        <article class="pillar reveal"><span>P03</span><h2>Learn from work</h2><p>Bring reviews and lessons back into future decisions.</p></article>
      </div>
    </div>
  </section>
  <section id="how-it-works" class="home-section architecture-section">
    <div class="shell">
      <div class="section-index"><span>04</span><span>How it works</span><span>Local-first. Private by design.</span></div>
      <div class="architecture-diagram reveal" role="img" aria-label="Markdown vault and optional AI connect through Wooolfmesh, with explicit approval before durable writes and SQLite used for runtime support">
        <article><h2>Markdown vault</h2><p>source of truth</p><i></i><small>.md files on disk</small></article>
        <span class="flow-label">read</span>
        <article><h2>Wooolfmesh</h2><p>private execution layer</p><i></i><small>tasks · focus · reviews</small></article>
        <span class="flow-label">propose</span>
        <article class="approval-node"><h2>Explicit approval</h2><p>you review changes</p><i>✓</i><small>before durable writes</small></article>
        <span class="flow-label accent">approve</span>
        <article><h2>SQLite runtime</h2><p>support state</p><i></i><small>local runtime file</small></article>
        <span class="flow-label reverse">assist</span>
        <article><h2>Optional AI</h2><p>configured by you</p><i></i><small>your provider · your settings</small></article>
      </div>
      <p class="architecture-note">No durable AI-assisted write happens without your approval.</p>
    </div>
  </section>
  <section class="home-section evidence-section">
    <div class="shell">
      <div class="section-index"><span>05</span><span>Product evidence</span><span>Two surfaces. One loop.</span></div>
      <div class="evidence-grid">
        <figure class="evidence-item reveal">
          <figcaption><span>01</span><strong>Today</strong><small>See the next useful move.</small></figcaption>
          <div class="product-fragment today-fragment" role="img" aria-label="Abstract Wooolfmesh Today interface showing one next move">
            <div class="fragment-rail"><span>Local / Today</span><span>27 Jun</span></div>
            <div class="fragment-body">
              <p>One next move</p>
              <h3>Clarify the finish line</h3>
              <div class="fragment-task"><span>Next action</span><strong>Write the acceptance criteria</strong><small>Focus · 45 min</small></div>
              <div class="fragment-queue"><span>Later</span><i></i><i></i><i></i></div>
            </div>
          </div>
        </figure>
        <figure class="evidence-item reveal">
          <figcaption><span>02</span><strong>Review</strong><small>Turn work history into follow-through.</small></figcaption>
          <div class="product-fragment review-fragment" role="img" aria-label="Abstract Wooolfmesh Review interface showing preview-first proposed actions">
            <div class="fragment-rail"><span>Local / Review</span><span>Preview-first</span></div>
            <div class="fragment-body">
              <p>What changed</p>
              <h3>Proposals waiting for review</h3>
              <div class="proposal-row"><span>01</span><strong>Create next action</strong><small>Review</small></div>
              <div class="proposal-row"><span>02</span><strong>Save a cognitive bite</strong><small>Review</small></div>
              <div class="fragment-approval"><span>Nothing writes until approved.</span><strong>Approve selected</strong></div>
            </div>
          </div>
        </figure>
      </div>
    </div>
  </section>
  <section class="home-section closing-section">
    <div class="shell closing-grid reveal">
      <h2>Keep the memory.<br>Improve the loop.</h2>
      <div class="hero-actions"><a class="button primary" href="/product/">Explore product <span aria-hidden="true">↗</span></a><a class="button" href="${productRepo}">View source</a></div>
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

for (const [oldSlug, newSlug, oldTitle] of legacyScenarioRedirects) {
  const target = scenarios.find((scenario) => scenario.slug === newSlug);
  addPage({
    url: `/use-cases/${oldSlug}/`,
    title: `${oldTitle} moved - Wooolfmesh`,
    description: `${oldTitle} has moved to ${target?.title ?? "the current Wooolfmesh use cases"}.`,
    active: "use-cases",
    robots: "noindex, follow",
    body: `${hero("Use case moved", `${oldTitle} now points to the current scenario: ${target?.title ?? "Wooolfmesh use cases"}.`, `<div class="page-actions"><a class="button primary" href="/use-cases/${newSlug}/">Open current scenario</a><a class="button" href="/use-cases/">All use cases</a></div>`)}`,
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
  title: "Product evidence - Wooolfmesh",
  description:
    "Compact interface evidence for Wooolfmesh Today and preview-first review workflows.",
  active: "screenshots",
  body: `${hero("Product evidence", "Two abstract interface fragments. No private vault data.")}
  <section class="section"><div class="shell evidence-grid">
    <figure class="evidence-item reveal">
      <figcaption><span>01</span><strong>Today</strong><small>See the next useful move.</small></figcaption>
      <div class="product-fragment today-fragment" role="img" aria-label="Abstract Wooolfmesh Today interface showing one next move">
        <div class="fragment-rail"><span>Local / Today</span><span>27 Jun</span></div>
        <div class="fragment-body">
          <p>One next move</p>
          <h2>Clarify the finish line</h2>
          <div class="fragment-task"><span>Next action</span><strong>Write the acceptance criteria</strong><small>Focus · 45 min</small></div>
          <div class="fragment-queue"><span>Later</span><i></i><i></i><i></i></div>
        </div>
      </div>
    </figure>
    <figure class="evidence-item reveal">
      <figcaption><span>02</span><strong>Review</strong><small>Turn work history into follow-through.</small></figcaption>
      <div class="product-fragment review-fragment" role="img" aria-label="Abstract Wooolfmesh Review interface showing preview-first proposed actions">
        <div class="fragment-rail"><span>Local / Review</span><span>Preview-first</span></div>
        <div class="fragment-body">
          <p>What changed</p>
          <h2>Proposals waiting for review</h2>
          <div class="proposal-row"><span>01</span><strong>Create next action</strong><small>Review</small></div>
          <div class="proposal-row"><span>02</span><strong>Save a cognitive bite</strong><small>Review</small></div>
          <div class="fragment-approval"><span>Nothing writes until approved.</span><strong>Approve selected</strong></div>
        </div>
      </div>
    </figure>
  </div></section>`,
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
    tagline: "Local-first memory for agentic work over a Markdown vault.",
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
      url: absoluteUrl(href),
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
    .filter(
      (page) => page.url !== "/404.html" && !page.robots?.startsWith("noindex"),
    )
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
        `<item><title>${escapeHtml(release.version)}</title><link>${site}/releases/#release-${slug(release.version)}</link><guid>${site}/releases/#release-${slug(release.version)}</guid><pubDate>${updatedRss}</pubDate><description>${escapeHtml(release.summary)}</description></item>`,
    )
    .join("");
  await writeText(
    "feed.xml",
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Wooolfmesh Updates</title><link>${site}/</link><description>Public updates for Wooolfmesh.</description><language>en</language><lastBuildDate>${updatedRss}</lastBuildDate><atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml"/>${feedItems}</channel></rss>\n`,
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
