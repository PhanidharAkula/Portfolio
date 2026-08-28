export type Project = {
  id: string;
  index: string;
  title: string;
  category: "Research" | "GenAI" | "Full-Stack" | "Systems" | "Tooling";
  year: string;
  role: string;
  blurb: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  href?: string;
  repo?: string;
  cover: string;
  accent: "plasma" | "acid" | "lavender" | "bone";
};

export const projects: Project[] = [
  {
    id: "lumiai",
    index: "01",
    title: "LUMI·AI",
    category: "GenAI",
    year: "Oct 2025 – Present",
    role: "Solo Founder · Full-Stack Engineer",
    blurb:
      "Production AI study platform that turns a student's own course materials into a personal tutor — grounded chat, auto-generated quizzes and flashcards, spaced-repetition review and hands-free voice mode, on web, iOS and Android.",
    description:
      "Solo-designed, built, deployed and operated studywithlumi.com end-to-end — product, design and engineering — now serving 220+ active students. Students sign in with Google, organize their work into classes, and upload their own materials (PDFs, lecture notes, slides, textbooks); the AI tutor answers strictly from that content rather than the open web. Lumi auto-generates scored practice quizzes with full review, one-click flashcard decks, and an SM-2 spaced-repetition queue that resurfaces cards right before they'd be forgotten, plus hands-free voice study, per-session notes and revisitable history. The core engineering problem was serving LLM inference safely and affordably at student-scale traffic: every AI call routes through a Vercel serverless function that verifies the caller's Supabase token, rejects anonymous calls and keeps provider keys entirely server-side, with response streaming and prompt caching on the LLM layer. Because students upload their own coursework, authorization lives in the database rather than in application code — row-level security on every user table, Google OAuth, hardened SECURITY DEFINER RPCs, signed storage URLs and self-service account deletion — so a bug in a route handler cannot expose another user's files. Once the web app was stable I extended it to iOS and Android with Capacitor, wrapping the existing TypeScript codebase in native shells and submitting both builds for store review from a single shared repository.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Supabase",
      "PostgreSQL",
      "LLMs",
      "RAG",
      "Capacitor",
      "Vercel Serverless",
    ],
    metrics: [
      { label: "Active students", value: "220+" },
      { label: "Platforms", value: "Web · iOS · Android" },
      { label: "Surface", value: "studywithlumi.com" },
    ],
    href: "https://studywithlumi.com",
    repo: "https://github.com/phanidharakula/Lumi_AI",
    cover: "/images/projects/lumiai.jpg",
    accent: "acid",
  },
  {
    id: "simforge",
    index: "02",
    title: "SIMFORGE",
    category: "Research",
    year: "Aug 2024 – Jul 2026",
    role: "Lead Researcher · M.S. Thesis (defended Jul 2026)",
    blurb:
      "Reproducible cross-simulator benchmarking framework driving SUMO, MATSim and DTALite from a single byte-identical scenario bundle — open-sourced under Apache-2.0 with a citable Zenodo DOI.",
    description:
      "SimForge unifies three heterogeneous traffic engines under one canonical five-file scenario bundle (network, demand, signals, config, SHA-256 manifest) so any cross-engine travel-time delta is provably an engine-internal property, not an input asymmetry. A state-aware BFS pre-router enforces OSM turn-restrictions and strongly-connected-component feasibility, forcing every engine onto byte-identical canonical routes; deterministic route caching and 16-way parallelism cut shared-route pre-routing from 141.9 hours to 7.1 hours (20× cold-cache, 228× warm). Scaled to ~80K nodes / ~200K directed links across Chicago, NYC and LA at demand tiers up to 500K trips, calibrated against 2.4M–6.8M US Census PUMS persons, and deployed across the OSC Pitzer and Cardinal clusters — revealing regime-dependent cross-engine behavior with up to 96% travel-time divergence under saturation. Validated by ~570 pytest tests, mutation tests on load-bearing modules, byte-identity guards and Student's-t 95% CIs at 76% coverage. Released under Apache-2.0 with a citable Zenodo DOI (10.5281/zenodo.21385983); the thesis is published open-access via OhioLINK ETD and the paper is under review at IEEE T-ITS.",
    stack: [
      "Python",
      "OpenMP",
      "multiprocessing",
      "Docker · Apptainer",
      "SLURM",
      "OSC HPC",
      "SUMO",
      "MATSim",
      "DTALite",
      "OSM",
      "US Census PUMS",
    ],
    metrics: [
      { label: "Pre-route speedup", value: "20× · 228× warm" },
      { label: "Divergence found", value: "up to 96%" },
      { label: "Release", value: "Apache-2.0 · Zenodo" },
    ],
    href: "https://doi.org/10.5281/zenodo.21385983",
    repo: "https://github.com/PhanidharAkula/SimForge",
    cover: "/images/projects/simforge.jpg",
    accent: "plasma",
  },
  {
    id: "cityscape",
    index: "03",
    title: "CITYSCAPE",
    category: "Systems",
    year: "2026",
    role: "Open-Source Contributor",
    blurb:
      "Merged C++ contributions to an open-source population-synthesis and digital-twin demand framework — fixing classification bugs across five metros and lifting commute-calibration realism via HPC sweeps.",
    description:
      "Cityscape is an open-source C++ population-synthesis and geospatial demand-generation framework in Dr. DJ Rao's group at Miami University. I authored three merged C++ pull requests (PRs #1–#3) that fixed OSM building-classification and orphan-ring logic across five metros — collapsing synthetic-home misassignment in LA from 69.9% to 5.5% and removing ~1.25M stranded-population artifacts across well over 1M building records. I exposed search-radius CLI flags and ran a 4-city, 16-configuration HPC parameter sweep on OSC Pitzer that raised worst-case calibration R² from 0.812 to 0.917. Debugging someone else's production C++ against real-world messy geospatial data was the closest thing to industry work in my research. The work feeds the SimForge thesis demand pipeline and underpins a first-author paper — \"CITYSCAPE: A Digital Twin Framework for Temporospatial Modeling of Work-Commute Dynamics\" — under review at Frontiers (2026).",
    stack: ["C++", "OpenMP", "OSC HPC", "OSM / Geofabrik", "US Census PUMS"],
    metrics: [
      { label: "Artifacts removed", value: "~1.25M" },
      { label: "Worst-case R²", value: "0.812 → 0.917" },
      { label: "Paper", value: "Frontiers · in review" },
    ],
    repo: "https://github.com/raodj/cityscape/pulls?q=author%3APhanidharAkula",
    cover: "/images/projects/cityscape.jpg",
    accent: "lavender",
  },
  {
    id: "vault",
    index: "04",
    title: "VAULT · INTELLIGENCE",
    category: "Tooling",
    year: "2026",
    role: "Solo Developer",
    blurb:
      "Personal loan intelligence dashboard for a multi-tranche education loan, with live amortization, rate-phase timeline and dual-currency views.",
    description:
      "Vault Intelligence is a self-built analytics dashboard for tracking a real multi-tranche education loan end-to-end. Models per-tranche disbursements, variable interest-rate phases and a full month-by-month amortization schedule, then exposes the live state of the loan across an Overview, Master Schedule, Tranche performance and Rate History. Surfaces lifetime cost, principal vs interest makeup, outstanding-over-time, next combined payment and burn-rate against tenure. Ships with INR/USD currency toggle, light/dark theme, deep-link URL params for sharing snapshots, and a static GitHub Pages build for zero-cost hosting.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Recharts",
      "Tailwind",
      "date-fns",
      "GitHub Pages",
    ],
    metrics: [
      { label: "Surface", value: "Loan analytics" },
      { label: "Currencies", value: "INR · USD" },
      { label: "Theme", value: "Light · Dark" },
    ],
    href: "https://phanidharakula.github.io/Vault/",
    cover: "/images/projects/vault.jpg",
    accent: "acid",
  },
  {
    id: "sensor-har",
    index: "05",
    title: "SENSOR · HAR",
    category: "Research",
    year: "Jan 2025 – May 2025",
    role: "Developer · ML Coursework",
    blurb:
      "Human-activity-recognition pipeline classifying multi-sensor time-series from accelerometers, gyroscopes, magnetometers and pressure sensors.",
    description:
      "A machine-learning pipeline for human activity recognition built on multi-modal time-series data from accelerometers, gyroscopes, magnetometers and pressure sensors. Covers signal preprocessing, feature engineering across sensor streams, and training and comparison of classification models for activity prediction. Course project for Machine Learning at Miami University.",
    stack: ["Python", "scikit-learn", "NumPy", "pandas"],
    metrics: [
      { label: "Domain", value: "Time-series ML" },
      { label: "Sensors", value: "4 modalities" },
      { label: "Course", value: "ML · Miami" },
    ],
    href: "https://github.com/PhanidharAkula/Sensor_Data_Classification",
    cover: "/images/projects/sensor-har.jpg",
    accent: "bone",
  },
  {
    id: "soil-cnn",
    index: "06",
    title: "SOIL · CNN",
    category: "Research",
    year: "2023",
    role: "Author",
    blurb:
      "Deep-learning image classifier for soil-type identification, peer-reviewed in IJSREM (2023).",
    description:
      "A convolutional neural network trained to classify soil images into agriculturally relevant categories. Published as a peer-reviewed paper in the International Journal of Scientific Research in Engineering and Management (IJSREM, 2023). Covers dataset curation, augmentation strategy, architecture choice and confusion-matrix error analysis.",
    stack: ["Python", "PyTorch", "TensorFlow", "CNNs", "OpenCV"],
    metrics: [
      { label: "Venue", value: "IJSREM 2023" },
      { label: "Focus", value: "CNN · vision" },
      { label: "Status", value: "Peer-reviewed" },
    ],
    cover: "/images/projects/soil-cnn.jpg",
    accent: "lavender",
  },
  {
    id: "lda-topics",
    index: "07",
    title: "LDA · TOPICS",
    category: "Research",
    year: "2023",
    role: "Author",
    blurb:
      "Latent-Dirichlet-Allocation topic modeling over crawled web pages, peer-reviewed in IJSREM (DOI 10.55041/IJSREM27350).",
    description:
      "An LDA pipeline for topic discovery over a corpus of crawled web pages. Covers tokenization, stop-word handling, coherence-based topic-count selection and qualitative inspection of discovered topics. Published in IJSREM (2023).",
    stack: ["Python", "scikit-learn", "Gensim", "NLTK", "LDA"],
    metrics: [
      { label: "Venue", value: "IJSREM 2023" },
      { label: "DOI", value: "27350" },
      { label: "Status", value: "Peer-reviewed" },
    ],
    href: "https://doi.org/10.55041/IJSREM27350",
    cover: "/images/projects/lda-topics.jpg",
    accent: "plasma",
  },
];
