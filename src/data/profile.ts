export const profile = {
  name: "Phanidhar Akula",
  alias: "P. Akula",
  initials: "PA",
  title: "Full-Stack Engineer · Researcher · Builder",
  tagline:
    "Full-stack engineer and simulation researcher. I build systems where performance and correctness have to hold up under real load.",
  location: "Tampa, Florida, USA",
  timezone: "America/New_York",
  email: "phanidharakula@gmail.com",
  phone: "+1 (513) 886-4720",
  status: "Open to full-time · OPT pending for Oct 2026 · STEM OPT eligible",
  bio: [
    "I'm a full-stack software engineer with an M.S. in Computer Science from Miami University. For the past two years I've worked both ends of the same problem — research-grade computational systems on one side, shipped production software on the other. Both come down to the same question: does it hold up when real load hits it?",
    "On the product side I built and operate LumiAI (studywithlumi.com), a production AI tutoring platform used by 220+ active students across web, iOS and Android. Document-grounded chat, quizzes, flashcards, spaced repetition and voice tutoring, served from a token-verified serverless LLM layer with response streaming and prompt caching, over PostgreSQL with row-level security on every user table — so a student can only ever read their own documents. Architecture, auth, inference, UI, mobile builds: I built all of it.",
    "On the research side, my thesis SimForge drives SUMO, MATSim and DTALite from a single canonical scenario bundle across the OSC Pitzer and Cardinal clusters. Deterministic route caching and 16-way parallelism cut shared-route pre-routing from 141.9 hours to 7.1, and benchmarks across three cities at up to 500K trips exposed up to 96% travel-time divergence under saturation. It's published open-access on OhioLINK, archived on Zenodo with a citable DOI, and under review at IEEE T-ITS — alongside three merged C++ pull requests to Cityscape that removed 1.25M stranded-population artifacts across five metros, now a first-author paper under review at Frontiers.",
  ],
  socials: {
    linkedin: "https://linkedin.com/in/phanidharakula",
    github: "https://github.com/PhanidharAkula",
  },
  cv: "/cv/Phanidhar_Akula_Resume.pdf",
  portrait: "/images/portrait.jpg",
};

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
    label: "LumiAI Students",
    value: 220,
    suffix: "+",
    subtitle: "studywithlumi.com · web · iOS · Android",
  },
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
    label: "Artifacts Removed",
    value: 1.25,
    decimals: 2,
    suffix: "M",
    subtitle: "3 merged C++ PRs · 5 metros · Cityscape",
  },
];
