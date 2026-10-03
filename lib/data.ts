// Résumé-based entries. Experience is expanded with research notes in
// ExperienceResearch and lib/research.ts. **Double asterisks** add emphasis.

export const personal = {
  name: "Johnny Dao",
  location: "Shawnee, KS",
  email: "JohnnyMDao@gmail.com",
  github: "https://github.com/daojohnny39",
  githubHandle: "daojohnny39",
  resume: "/resume.pdf",
  graduation: "December 2027",
};

// Each section gets a button on the home page that opens it in the side panel.
export const sections = [
  { slug: "experience", title: "Experience", summary: "AI-agent security research" },
  { slug: "projects", title: "Projects", summary: "Desktop and iOS apps" },
  { slug: "education", title: "Education", summary: "UMKC and JCCC" },
  { slug: "skills", title: "Skills", summary: "Languages and tools" },
  { slug: "leadership", title: "Leadership", summary: "Roonited Esports" },
  { slug: "coursework", title: "Coursework", summary: "Software capstone" },
  { slug: "contact", title: "Contact", summary: "Email and GitHub" },
] as const;

export type SectionSlug = (typeof sections)[number]["slug"];

export interface Entry {
  title: string;
  detail?: string;
  subtitle: string;
  period: string;
  note?: string;
  bullets: string[];
  href?: string;
}

export const experience: Entry[] = [
  {
    title: "ASSET Research Lab Assistant",
    detail: "AI Cybersecurity",
    subtitle: "University of Missouri - Kansas City · Kansas City, MO",
    period: "Mar. 2025 – Present",
    bullets: [
      "Built a two-stage **Python harness** for detecting malicious AI-agent skills using **Typesafe Jev** to screen file chunks, then **Qwen 3.8** for reviewing uncertain cases through Ollama. Resulted in identifying up to **93% of malicious skills** out of set of 200 known-malicious skills out of 300 skill dataset.",
      "Reproduced two AI coding-agent security studies involving **hidden-image prompt injection** and multi-stage tool attacks, executing 100 isolated trials across frontier AI models.",
      "Co-authored a research paper analyzing **100K+ AI-agent extensions** across skills, MCP servers, and plugins, examining how reliably models and humans identify **malicious components** and how agent-mediated execution affects realized harm.",
    ],
  },
];

export const projects: Entry[] = [
  {
    title: "Windows Autobot",
    subtitle: "Electron, PowerShell, CDP, Windows UI Automation",
    period: "May 2026",
    bullets: [
      "Built a Windows assistant that finds running Electron and Win32 apps, reads their UI state through **Chrome DevTools Protocol** or **UI Automation**, and runs predefined actions through successive model tool calls.",
      "Added agent settings for each app, window and tab selection, and tools to create, edit, and run saved automations. Used Electron context isolation and defined IPC interfaces.",
    ],
    href: "https://github.com/daojohnny39/WindowsAutoTask",
  },
  {
    title: "Research Paper Audio Reader",
    subtitle: "Tauri, React, TypeScript, Rust, Node.js",
    period: "Jul. 2026",
    bullets: [
      "Built a **Tauri/React** desktop app that reads research PDFs aloud using local text-to-speech. Added column-aware text extraction, sentence highlighting, and automatic scrolling.",
      "Integrated the Kokoro text-to-speech model through a local **Node.js** service. Added audio caching, click-to-read controls, and saved reading progress.",
    ],
    href: "https://github.com/daojohnny39/ResearchPaperAudioReader",
  },
  {
    title: "RemoteCodex",
    detail: "macOS/iOS",
    subtitle: "Swift 6, WebSockets, JSON-RPC, Tailscale",
    period: "Jul. 2026 – Present",
    bullets: [
      "Built a native **SwiftUI** iPhone app and macOS host to use Codex over Tailscale. Converted the app-server's JSON-RPC/JSONL stream to an authenticated WebSocket API with ordered event replay and snapshot recovery.",
      "Added **QR pairing and Keychain storage**, opaque IDs for approved folders, and separate process groups for each session. Users can upload images, choose models, approve requests, and continue the same thread in Terminal.",
    ],
  },
];

export const education: Entry[] = [
  {
    title: "University of Missouri - Kansas City",
    detail: "3.8 GPA",
    subtitle: "B.S. in Computer Science · Kansas City, MO",
    period: "Graduating Dec. 2027",
    note: "Center of Excellence in Spatial Computing · Micro-Credential",
    bullets: ["Used Python and R for geospatial analysis and Unity to apply AI/ML concepts in AR/VR."],
  },
  {
    title: "Johnson County Community College",
    subtitle: "A.A.S. in Computer Information Systems · Overland Park, KS",
    period: "Dec. 2024",
    bullets: [],
  },
];

export const skills: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["C++", "Python", "Swift", "C", "C#", "Lua", "JavaScript", "TypeScript", "HTML/CSS", "SQL"],
  },
  {
    label: "Frameworks & libraries",
    items: ["SwiftUI", "React", "Electron", ".NET", "Node.js", "FastAPI", "Django", "pandas", "NumPy", "Matplotlib"],
  },
  { label: "Databases", items: ["SQLite", "PostgreSQL"] },
  { label: "Developer tools", items: ["Git", "Bash", "IntelliJ", "Claude Code", "OpenAI Codex"] },
];

export const leadership: Entry[] = [
  {
    title: "Roonited Esports Club",
    detail: "Vice President",
    subtitle: "University of Missouri - Kansas City",
    period: "Jan. 2026 – May 2026",
    bullets: [
      "Co-led UMKC's esports club as **vice president**, organized campus social events and represented the club in student media, and led its VALORANT team to a tournament **championship** as **in-game leader**.",
    ],
  },
];

export const coursework: Entry[] = [
  {
    title: "Application Development and Programming",
    detail: "Software Capstone",
    subtitle: "Johnson County Community College",
    period: "Aug. 2023 – Dec. 2023",
    bullets: [
      "Collaborated on a 4-person team to build a **FastAPI/SQLAlchemy/SQLite** cabin-rental app with authentication, amenity search, price sorting, reservations, and seasonal pricing across 55 listings.",
    ],
    href: "https://github.com/daojohnny39/CRRUSProject",
  },
];
