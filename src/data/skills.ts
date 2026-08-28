export type SkillGroup = {
  domain: string;
  caption: string;
  items: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    domain: "Languages",
    caption: "Daily drivers from research to product.",
    items: [
      { name: "TypeScript", level: 94 },
      { name: "JavaScript", level: 92 },
      { name: "Python", level: 95 },
      { name: "C++", level: 80 },
      { name: "SQL (PostgreSQL · MySQL)", level: 88 },
      { name: "Java", level: 55 },
    ],
  },
  {
    domain: "Frontend & Mobile",
    caption: "Interfaces people actually use, on every screen they own.",
    items: [
      { name: "React · component architecture", level: 94 },
      { name: "Next.js · Vite", level: 88 },
      { name: "Redux · state modeling", level: 88 },
      { name: "Tailwind CSS · design systems", level: 90 },
      { name: "Capacitor · iOS / Android builds", level: 82 },
    ],
  },
  {
    domain: "Backend, Data & Auth",
    caption: "From the form field down to the row-level policy.",
    items: [
      { name: "Node.js · Vercel serverless", level: 90 },
      { name: "FastAPI · REST API design", level: 90 },
      { name: "PostgreSQL · Supabase", level: 90 },
      { name: "MySQL · relational modeling", level: 86 },
      { name: "OAuth · row-level security · RBAC", level: 90 },
      { name: "API-key isolation · signed storage", level: 88 },
    ],
  },
  {
    domain: "AI / ML",
    caption: "Productionising the models, not just demoing them.",
    items: [
      { name: "LLM integration · streaming inference", level: 92 },
      { name: "RAG · document grounding", level: 90 },
      { name: "Prompt engineering · prompt caching", level: 90 },
      { name: "Vector search · embeddings", level: 85 },
      { name: "PyTorch · TensorFlow · CNNs", level: 86 },
      { name: "NLP · topic modeling", level: 82 },
    ],
  },
  {
    domain: "Cloud, HPC & Systems",
    caption: "Where the bytes meet the metal.",
    items: [
      { name: "Docker · Apptainer", level: 88 },
      { name: "SLURM · OSC Pitzer / Cardinal", level: 88 },
      { name: "OpenMP · multiprocessing", level: 90 },
      { name: "AWS · Vercel", level: 84 },
      { name: "GitHub Actions · CI/CD", level: 88 },
      { name: "Linux · Git", level: 92 },
    ],
  },
  {
    domain: "Simulation & Research Engineering",
    caption: "Rigor that survives peer review.",
    items: [
      { name: "SUMO · MATSim · DTALite", level: 90 },
      { name: "Digital twins · OSM / Geofabrik pipelines", level: 88 },
      { name: "US Census PUMS demand synthesis", level: 88 },
      { name: "pytest · mutation testing", level: 90 },
      { name: "Reproducibility guards · byte-identity", level: 88 },
      { name: "Benchmarking · statistical CIs", level: 86 },
      { name: "Agile · code review · technical writing", level: 88 },
    ],
  },
];

export const techMarquee = [
  "TypeScript",
  "React",
  "Next.js",
  "Redux",
  "Tailwind",
  "Node.js",
  "Capacitor",
  "Python",
  "C++",
  "FastAPI",
  "PostgreSQL",
  "Supabase",
  "MySQL",
  "LLMs",
  "RAG",
  "PyTorch",
  "TensorFlow",
  "OpenMP",
  "SLURM",
  "SUMO",
  "MATSim",
  "DTALite",
  "OSC Pitzer",
  "OSM",
  "US Census PUMS",
  "Docker",
  "Apptainer",
  "AWS",
  "Vercel",
  "GitHub Actions",
  "Linux",
  "Git",
  "pytest",
];
