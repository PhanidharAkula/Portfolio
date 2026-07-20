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
      { name: "Python", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 90 },
      { name: "C++", level: 80 },
      { name: "SQL (MySQL · PostgreSQL)", level: 85 },
      { name: "Java", level: 55 },
    ],
  },
  {
    domain: "Cloud, HPC & Systems",
    caption: "Where the bytes meet the metal.",
    items: [
      { name: "OpenMP · multiprocessing", level: 90 },
      { name: "SLURM · OSC Pitzer / Cardinal", level: 88 },
      { name: "Docker · Apptainer", level: 84 },
      { name: "GitHub Actions · CI/CD", level: 85 },
      { name: "AWS · GPU-accelerated simulation", level: 80 },
      { name: "Linux · Git", level: 92 },
    ],
  },
  {
    domain: "Simulation & Geospatial",
    caption: "Driving whole cities, reproducibly.",
    items: [
      { name: "SUMO · MATSim · DTALite", level: 90 },
      { name: "Agent-based & traffic simulation", level: 90 },
      { name: "Digital twins · network modeling", level: 86 },
      { name: "OSM · Geofabrik pipelines", level: 88 },
      { name: "US Census PUMS demand", level: 88 },
    ],
  },
  {
    domain: "AI / ML",
    caption: "Productionising the models, not just demoing them.",
    items: [
      { name: "LLM integration · inference", level: 92 },
      { name: "RAG-style document grounding · prompt engineering", level: 90 },
      { name: "PyTorch · TensorFlow", level: 88 },
      { name: "CNNs · vision pipelines · NLP", level: 86 },
      { name: "LDA · topic modeling", level: 82 },
    ],
  },
  {
    domain: "Full-Stack & Backend",
    caption: "From the form field down to the cache key.",
    items: [
      { name: "React · component design", level: 94 },
      { name: "Node.js · Vercel Serverless", level: 88 },
      { name: "FastAPI · REST APIs · GraphQL", level: 90 },
      { name: "PostgreSQL · MySQL · Supabase", level: 88 },
      { name: "OAuth · row-level security · API-key isolation", level: 88 },
    ],
  },
  {
    domain: "Engineering & QA",
    caption: "Rigor that survives a review.",
    items: [
      { name: "pytest · mutation testing", level: 90 },
      { name: "Reproducibility guards · byte-identity", level: 88 },
      { name: "Statistical CIs · Student's-t", level: 82 },
      { name: "Performance optimization · benchmarking", level: 88 },
      { name: "Code review · technical writing", level: 88 },
      { name: "Figma · Adobe (design)", level: 80 },
    ],
  },
];

export const techMarquee = [
  "Python",
  "C++",
  "TypeScript",
  "React",
  "Node.js",
  "PyTorch",
  "TensorFlow",
  "LLM APIs",
  "OpenMP",
  "SLURM",
  "SUMO",
  "MATSim",
  "DTALite",
  "OSC Pitzer",
  "OSM",
  "US Census PUMS",
  "PostgreSQL",
  "MySQL",
  "Supabase",
  "FastAPI",
  "GraphQL",
  "AWS",
  "Vercel",
  "Docker",
  "Apptainer",
  "GitHub Actions",
  "Linux",
  "Git",
  "pytest",
  "Figma",
  "Geofabrik",
];

export const tools = [
  "Figma",
  "Adobe",
  "VS Code",
  "Git",
  "Docker",
  "Apptainer",
  "pytest",
  "SLURM",
  "OSC HPC",
  "Linux",
  "Vercel",
  "Supabase",
  "Notion",
];
