// Research results transcribed from Johnny's September 23, 2026 ASSET summary.
// Keep the completion counts alongside F1: these runs did not all score 200 cases.
export const researchChapters = [
  { id: "asset-manuscript", title: "Malicious extensions", period: "April · August" },
  { id: "asset-ghostsplice", title: "GhostSplice", period: "July" },
  { id: "asset-ghostcommit", title: "GhostCommit", period: "July–August" },
  { id: "asset-scanners", title: "Existing scanners", period: "August–September" },
  { id: "asset-benchmarks", title: "Benchmark comparisons", period: "September" },
  { id: "asset-evasion", title: "Behavior & evasion", period: "September" },
  { id: "asset-direction", title: "Data & next steps", period: "September" },
] as const;

export const ghostSpliceResults = [
  { model: "GPT-5.4", high: "10/10 · 100%", xhigh: "10/10 · 100%" },
  { model: "GPT-5.5", high: "0/10 · 0%", xhigh: "0/10 · 0%" },
];

export const ghostCommitResults = [
  { model: "GPT-5.6 Sol", client: "Codex CLI", count: 5 },
  { model: "GPT-5.6 Terra", client: "Codex CLI", count: 5 },
  { model: "GPT-5.6 Luna", client: "Codex CLI", count: 10 },
  { model: "Claude Opus 4.8", client: "Claude Code", count: 0 },
  { model: "Claude Sonnet 5", client: "Claude Code", count: 0 },
  { model: "Claude Fable 5", client: "Claude Code", count: 0 },
];

export const scannerResults = [
  { scanner: "Nvidia SkillSpector", static: "12 flags", llm: "63 semantic flags" },
  { scanner: "AgentVerus", static: "26 suspicious/rejected", llm: "117 semantic suspicious/rejected" },
  { scanner: "Tencent AIG", static: "No static mode", llm: "113 findings; 106 high/critical" },
  { scanner: "ClawScan", static: "9 with findings; 0 high/critical", llm: "Not evaluated" },
  { scanner: "Sentry", static: "123 findings; 23 high/critical", llm: "121 high/critical" },
];

export interface BenchmarkRow {
  profile: string;
  f1: number;
  scored: number;
  tone: "blue" | "orange" | "green" | "pink";
}

export interface Benchmark {
  title: string;
  rows: BenchmarkRow[];
  note?: string;
}

export const benchmarks: Benchmark[] = [
  {
    title: "Cisco Skill Scanner",
    rows: [
      { profile: "Luna · low", f1: 0.8333, scored: 133, tone: "blue" },
      { profile: "Luna · medium", f1: 0.8468, scored: 128, tone: "orange" },
      { profile: "Qwen 3.8 CC", f1: 0.8636, scored: 126, tone: "green" },
      { profile: "Jev adapted", f1: 0.9425, scored: 74, tone: "pink" },
    ],
    note: "Jev: candidate-adapted pipeline.",
  },
  {
    title: "Caterpillar",
    rows: [
      { profile: "Luna · low", f1: 0.8101, scored: 161, tone: "blue" },
      { profile: "Luna · medium", f1: 0.8170, scored: 157, tone: "orange" },
      { profile: "Qwen 3.8 CC", f1: 0.8756, scored: 165, tone: "green" },
      { profile: "Jev adapted", f1: 0.9038, scored: 96, tone: "pink" },
    ],
    note: "Jev: candidate-adapted pipeline.",
  },
  {
    title: "MASB · classification-only",
    rows: [
      { profile: "Luna · low", f1: 0.0615, scored: 133, tone: "blue" },
      { profile: "Luna · medium", f1: 0.0625, scored: 133, tone: "orange" },
      { profile: "Qwen 3.8 CC", f1: 0.8421, scored: 37, tone: "green" },
      { profile: "Jev adapted", f1: 0.0294, scored: 125, tone: "pink" },
    ],
    note: "Qwen: model-backed subset only. The original chart also notes 16 model-backed and 160 static decisions for Jev; the scored count above is preserved as reported.",
  },
  {
    title: "MalSkills",
    rows: [
      { profile: "Luna · low", f1: 0.2759, scored: 200, tone: "blue" },
      { profile: "Luna · medium", f1: 0.9198, scored: 198, tone: "orange" },
      { profile: "Qwen 3.8 CC", f1: 0.9424, scored: 198, tone: "green" },
      { profile: "Jev hybrid", f1: 0.9485, scored: 200, tone: "pink" },
    ],
    note: "Jev hybrid: frozen Luna-low extraction, with one Jev final decision.",
  },
];

export const staticBenchmarks = [
  { scanner: "Skill-Sec-Scan", f1: "≈ 0.59", scored: "192/200" },
  { scanner: "Nova-Proximity", f1: "≈ 0.05", scored: "65/200" },
];

export const researchDataset = [
  { label: "Skills", count: 155922 },
  { label: "MCP records", count: 66838 },
  { label: "Plugins", count: 11914 },
];
