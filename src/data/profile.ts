export const profile = {
  name: "Phanidhar Akula",
  alias: "P. Akula",
  initials: "PA",
  title: "Researcher · Engineer · Builder",
  tagline:
    "Engineering reproducible HPC simulation and digital-twin systems, and shipping AI products that real students use.",
  location: "Tampa, Florida, USA",
  timezone: "America/New_York",
  email: "phanidharakula@gmail.com",
  phone: "+1 (513) 886-4720",
  status: "Open to full-time · OPT pending for Oct 2026 · STEM OPT eligible",
  bio: [
    "I'm an M.S. Computer Science researcher at Miami University — thesis defended July 2026. SimForge, my thesis, is an open-source cross-simulator benchmarking framework that drives SUMO, MATSim and DTALite from a single canonical scenario bundle across the OSC Pitzer and Cardinal clusters. Deterministic route caching and 16-way parallelism cut shared-route pre-routing from 141.9 hours to 7.1 (20× cold-cache, 228× warm), and benchmarks across three cities at up to 500K trips exposed up to 96% travel-time divergence under saturation. Released under Apache-2.0 with a citable Zenodo DOI; the paper is under review at IEEE T-ITS.",
    "In parallel I solo-architect and operate LumiAI (studywithlumi.com), a production AI tutoring platform serving 60+ active students — with Android and iOS companion apps now in development — and authored three merged C++ PRs to Cityscape, an open-source population-synthesis and digital-twin framework — now a first-author paper under review at Frontiers, alongside two peer-reviewed IJSREM papers on CNNs and LDA topic modeling. Earlier I shipped a Salesforce-style CRM for a Hyderabad-based education startup and freelanced full-stack work under NDA.",
  ],
  socials: {
    linkedin: "https://linkedin.com/in/phanidharakula",
    github: "https://github.com/PhanidharAkula",
  },
  portrait: "/images/portrait.jpg",
};

export type CV = {
  id: string;
  label: string;
  short: string;
  sublabel: string;
  file: string;
};

export const cvs: CV[] = [
  {
    id: "cv-simulation",
    label: "Simulation & Digital Twins",
    short: "CV · SIM / TWINS",
    sublabel: "Simulation systems · geospatial computing · HPC",
    file: "/cv/Phanidhar-Akula-Resume-Simulation-Digital-Twins.pdf",
  },
  {
    id: "cv-ai-fullstack",
    label: "AI & Full-Stack Engineering",
    short: "CV · AI / FULL-STACK",
    sublabel: "Production AI · backend systems · React / TypeScript",
    file: "/cv/Phanidhar-Akula-Resume-AI-Full-Stack.pdf",
  },
];

export const heroLines = [
  "Reproducible HPC research",
  "and AI products that ship.",
];

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  subtitle: string;
};

export const stats: Stat[] = [
  {
    label: "Pre-route Speedup",
    value: 20,
    suffix: "×",
    subtitle: "141.9h → 7.1h · 228× warm-cache · 16-way parallel",
  },
  {
    label: "Trips Benchmarked",
    value: 500,
    suffix: "K",
    subtitle: "3 cities · up to 96% divergence under saturation",
  },
  {
    label: "Pytest Coverage",
    value: 76,
    suffix: "%",
    subtitle: "~570 tests · mutation-validated · CI guarded",
  },
  {
    label: "LumiAI Users",
    value: 60,
    suffix: "+",
    subtitle: "studywithlumi.com · live in production",
  },
];
