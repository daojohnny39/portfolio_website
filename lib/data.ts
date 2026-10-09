// Résumé-based entries. Experience is expanded with research notes in
// ExperienceResearch and lib/research.ts, and projects are written up in
// lib/projects.ts. **Double asterisks** add emphasis.

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
  { slug: "education", title: "Education", summary: "UMKC, JCCC, and coursework" },
  { slug: "skills", title: "Skills", summary: "Languages and tools" },
  { slug: "leadership", title: "Leadership", summary: "Roonited Esports" },
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

// Shown beside the coursework in the Education section, one block per degree.
export const education: {
  school: string;
  degree: string;
  location: string;
  period: string;
  detail?: string;
  note?: string;
}[] = [
  {
    school: "University of Missouri - Kansas City",
    degree: "B.S. in Computer Science",
    location: "Kansas City, MO",
    period: "Graduating Dec. 2027",
    detail: "3.8 GPA",
    note: "Center of Excellence in Spatial Computing · Micro-Credential",
  },
  {
    school: "Johnson County Community College",
    degree: "A.A.S. in Computer Information Systems",
    location: "Overland Park, KS",
    period: "Dec. 2024",
  },
  {
    school: "Johnson County Community College",
    degree: "A.S. in General Sciences",
    location: "Overland Park, KS",
    period: "Dec. 2024",
  },
  {
    school: "Johnson County Community College",
    degree: "A.A. in Liberal Arts",
    location: "Overland Park, KS",
    period: "Dec. 2024",
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

// Listed under Key Coursework by name. A note shows in parentheses after it.
export const keyCourses: { name: string; note?: string; href?: string }[] = [
  {
    name: "Application Development and Programming",
    note: "Software Capstone",
    href: "https://github.com/daojohnny39/CRRUSProject",
  },
  { name: "Discrete Structures II" },
  { name: "Linear Algebra I" },
  { name: "Calculus II" },
  { name: "Data Structures" },
  { name: "Algorithms and Complexity" },
];

// Completed courses, newest first. Titles come from the UMKC academic record
// and the UMKC and JCCC catalogs. General-education courses are left out.
export const courses: { school: string; terms: { term: string; courses: string[] }[] }[] = [
  {
    school: "University of Missouri - Kansas City",
    terms: [
      {
        term: "Spring 2026",
        courses: [
          "Introduction to Algorithms and Complexity",
          "Data Communications and Networking",
          "Physics for Scientists and Engineers I",
          "Elementary Statistics",
        ],
      },
      {
        term: "Fall 2025",
        courses: [
          "Introduction to Computer Architecture and Organization",
          "Discrete Structures II",
          "Ethics and Professionalism",
          "Linear Algebra I",
        ],
      },
      { term: "Spring 2025", courses: ["Problem Solving and Programming II", "Discrete Structures I", "Calculus II"] },
    ],
  },
  {
    school: "Johnson County Community College",
    terms: [
      { term: "Fall 2024", courses: ["Calculus I"] },
      { term: "Spring 2024", courses: ["Introduction to Information Systems", "Precalculus"] },
      {
        term: "Fall 2023",
        courses: [
          "Application Development and Programming",
          "Web-Enabled Database Programming",
          "Basic Data Structures Using C++",
          "Web Scripting: JavaScript I",
        ],
      },
      {
        term: "Spring 2023",
        courses: [
          "Object-Oriented Programming Using C++",
          "Database Management with Oracle",
          "Introduction to System Design and Analysis",
        ],
      },
      {
        term: "Fall 2022",
        courses: ["Concepts of Programming Algorithms Using C++", "UNIX Operating System", "HTML and CSS"],
      },
      { term: "Spring 2022", courses: ["Introduction to Networks"] },
      { term: "Fall 2020", courses: ["Programming Fundamentals"] },
    ],
  },
];
