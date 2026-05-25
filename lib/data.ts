export const personal = {
  name: "Johnny Dao",
  title: "CS @ UMKC · Software Developer",
  location: "Shawnee, KS",
  phone: "(913) 432-8888",
  email: "JohnnyMDao@gmail.com",
  github: "https://github.com/daojohnny39",
  bio: "Computer Science student at UMKC with a 3.8 GPA, focused on full-stack development and AI/ML. Looking to contribute to meaningful projects and grow as a software engineer.",
};

export const experience = [
  {
    title: "ASSET Research Lab Assistant",
    org: "University of Missouri - Kansas City",
    location: "Kansas City, MO",
    period: "Mar. 2025 – Present",
    bullets: [
      "Built a 146-question, 21-section React/Vite/Express survey app with shared TypeScript schemas, conditional logic, autosave, and CSV export.",
      "Authored a Jupyter reproducibility notebook validating L0–L3 severity tiering across 1M+ corpus items; applied 2-of-3 majority consensus across DeBERTa-v3, ModernBERT, and DistilBERT classifiers with Wilson 95% confidence intervals.",
      "Ran 3-classifier severity analysis on 127,986 rich items; reported L3 rates of 1.96% skills, 0.66% MCP, and 4.17% plugins.",
      "Developed a self-contained 9-section validation notebook reproducing all key statistical claims from the paper draft, covering severity distributions, 3-model agreement, Defender gold recall, and trust-signal correlations to support peer reproducibility.",
    ],
  },
  {
    title: "Center of Excellence in Spatial Computing (Micro-Credential)",
    org: "University of Missouri - Kansas City",
    location: "Kansas City, MO",
    period: "Sept. 2025 – Oct. 2025",
    bullets: [
      "Explored geospatial data concepts using Python, R, and open-source analytic tools.",
      "Acquired foundational knowledge of applying AI and ML in spatial computing with AR/VR.",
      "Used Unity programming for AR/VR with integrated AI/ML techniques.",
    ],
  },
];

export const projects = [
  {
    name: "Portfolio Website",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion", "Cloudflare R2"],
    bullets: [
      "Built a personal portfolio site with Hero, Experience, Projects, Education, and Contact sections; deployed on Next.js 16 with TypeScript and Tailwind CSS.",
      "Implemented custom UI components including animated loading screens, mesh background, ghost nav, and scroll-triggered reveal animations using Framer Motion.",
      "Added a photography gallery page with category and month filtering, serving compressed images from Cloudflare R2 with critical-image preloading.",
    ],
    github: "https://github.com/daojohnny39/portfolio_website",
  },
  {
    name: "CourseTrack",
    stack: ["React/Vite", "Node.js/Express", "SQLite", "JWT"],
    bullets: [
      "Built a React/Vite coursework organizer with dashboard, course, assignment, schedule, login, and Canvas settings pages.",
      "Implemented Node.js/Express REST APIs for auth, courses, assignments, semesters, events, stats, and protected routes.",
      "Added SQLite persistence, JWT authentication middleware, ICS calendar sync, and encrypted token handling.",
    ],
    github: "https://github.com/daojohnny39/courseworkorganizersite",
  },
  {
    name: "Cabin Rental Reservation Web App",
    stack: ["HTML", "CSS", "JavaScript", "FastAPI", "SQLite"],
    bullets: [
      "Built a FastAPI/SQLite cabin-rental app backed by 11 database tables, 8 HTML templates, and 55 cabin listings.",
      "Added login/registration, 69-amenity search, price sorting, date booking, and 4 seasonal pricing rules for 0%–40% discounts.",
      "Worked on a 4-person team; delivered architecture/database design, setup docs, and user docs.",
    ],
    github: "https://github.com/daojohnny39/CRRUSProject",
  },
  {
    name: "Web-Enabled Database Programming",
    stack: ["Django", "HTML/CSS", "JavaScript", "SQLite", "PostgreSQL"],
    bullets: [
      "Completed 5 Django projects/labs across 80 Python files and 14 HTML templates using MVT architecture.",
      "Built URL routing, model-backed pages, login/contact flows, and CRUD-style customer/inventory workflows.",
      "Managed relational data with SQL queries and Django ORM; documented setup.",
    ],
    github: null,
  },
];

export const skills: Record<string, string[]> = {
  "Programming Languages": ["Python", "C/C++", "JavaScript", "TypeScript", "HTML/CSS", "SQL"],
  "Frameworks & Libraries": ["FastAPI", "Django", "React", "Node.js/Express", "Tailwind CSS", "SwiftUI", "pandas", "NumPy", "Matplotlib"],
  "Databases": ["PostgreSQL", "SQLite", "Django ORM"],
  "Developer Tools": ["Git", "VS Code", "Visual Studio", "XCode", "IntelliJ", "Unity", "Claude Code", "Codex"],
  "OS & Scripting": ["UNIX/Linux", "Bash"],
};

export const education = [
  {
    school: "University of Missouri - Kansas City",
    degree: "Computer Science – Bachelor of Science",
    gpa: "3.8 GPA",
    period: "Jan. 2025 – Present",
    location: "Kansas City, MO",
  },
  {
    school: "Johnson County Community College",
    degree: "Computer Information Systems – Associate of Applied Science",
    gpa: null,
    period: "Aug. 2020 – Dec. 2024",
    location: "Overland Park, KS",
  },
  {
    school: "Johnson County Community College",
    degree: "General Sciences – Associate of Science",
    gpa: null,
    period: "Aug. 2020 – Dec. 2024",
    location: "Overland Park, KS",
  },
  {
    school: "Johnson County Community College",
    degree: "Liberal Arts – Associate of Arts",
    gpa: null,
    period: "Aug. 2020 – Dec. 2024",
    location: "Overland Park, KS",
  }
];

export const hobbies: string[] = [
  // TODO: Add your hobbies here
];
