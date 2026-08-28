export type Experience = {
  id: string;
  role: string;
  org: string;
  type: "Research" | "Industry" | "Leadership" | "Teaching";
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    id: "exp-lumiai",
    role: "Full-Stack Engineer · LumiAI",
    org: "Lumi AI · independent product · studywithlumi.com",
    type: "Industry",
    period: "Oct 2025 - Present",
    location: "Remote",
    bullets: [
      "Built and shipped a production React/TypeScript AI tutoring platform used by 220+ active students, generating document-grounded chat, quizzes, flashcards, spaced repetition and voice tutoring from a student's own uploaded course material.",
      "Engineered a serverless LLM inference layer on Vercel with token-verified requests, response streaming and prompt caching — blocking 100% of anonymous inference calls and keeping provider keys server-side, where a single leaked key would mean unbounded charges.",
      "Architected the data layer on PostgreSQL with row-level security across every user table, Google OAuth, hardened SECURITY DEFINER RPCs and signed storage URLs, so authorization lives in the database and a bug in a route handler cannot expose another user's files.",
      "Extended the platform to iOS and Android with Capacitor, wrapping the existing TypeScript codebase in native shells and submitting both builds for store review from a single shared repository — one codebase across three platforms, with no platform-specific business logic.",
    ],
    tags: ["React", "TypeScript", "LLMs", "Supabase", "PostgreSQL", "Capacitor", "Vercel"],
  },
  {
    id: "exp-research",
    role: "Computer Science Researcher",
    org: "Miami University · Dr. DJ Rao's research group",
    type: "Research",
    period: "Aug 2024 - Jul 2026",
    location: "Oxford, OH",
    bullets: [
      "Designed a Python-driven 4-city, 16-configuration HPC study on the OSC Pitzer cluster, cutting LA synthetic-home misassignment from 69.9% to 5.5% and lifting worst-case calibration R² from 0.812 to 0.917 by isolating which pipeline stages were introducing the error.",
      "Diagnosed and fixed OSM building-classification defects in Cityscape's open-source C++ pipeline across 5 metros, shipping 3 merged pull requests that removed ~1.25M stranded-population artifacts from model output.",
      "Developed SimForge as my M.S. thesis — an open-source Python framework unifying 3 traffic simulators (SUMO, MATSim, DTALite) behind one canonical data pipeline with containerized, deterministic execution.",
      "Accelerated shared-route pre-routing from 141.9 hours to 7.1 through deterministic route caching and 16-way parallelism, a 20× speedup, then benchmarked 3 cities at up to 500K trips per seeded run to confirm results stayed reproducible across seeds.",
      "Two first-author manuscripts from this work are under review at IEEE Transactions on Intelligent Transportation Systems and Frontiers.",
    ],
    tags: ["Python", "C++", "OpenMP", "SLURM", "OSC HPC", "Docker", "PUMS"],
  },
  {
    id: "exp-pathfinders",
    role: "Software Engineer Intern",
    org: "Smart Pathfinders Overseas Education",
    type: "Industry",
    period: "Jan 2024 - May 2024",
    location: "Hyderabad, India",
    bullets: [
      "Collaborated with a team of 3 developers to build a private client portal in React and Redux, giving 180+ enrolled students one place to track applications, upload documents and reach their counselors — work that had previously lived in email and spreadsheets.",
      "Modeled application state so a student could see every stage of their process, current status and what was still outstanding, making multi-step workflows that ran for months predictable.",
      "Implemented Python/MySQL REST APIs and relational data models behind role-based access control, so each student saw only their own records while staff managed the full caseload from one dashboard.",
    ],
    tags: ["React", "Redux", "Python", "FastAPI", "MySQL", "REST APIs"],
  },
  {
    id: "exp-freelance",
    role: "Software Developer · Freelance",
    org: "E-commerce & fitness startup clients",
    type: "Industry",
    period: "May 2023 - Dec 2023",
    location: "Remote",
    bullets: [
      "Delivered production full-stack software end to end for two startup clients running entirely on spreadsheets — scoping with the owner, building frontend and backend, deploying, and handling the cutover.",
      "Built an e-commerce platform in React and Redux with catalog, storefront and order management on Python/MySQL REST APIs deployed to AWS, and a gym check-in and payment application, together serving 300+ daily users.",
      "Migrated 10k+ records out of client Excel workbooks into MySQL with a Python ETL script, validating row counts and key fields against the source so both clients cut over in a single pass with no manual re-entry.",
    ],
    tags: ["React", "Redux", "Python", "MySQL", "AWS", "ETL"],
  },
  {
    id: "exp-gsca",
    role: "President · Graduate Students of Color Association",
    org: "Miami University",
    type: "Leadership",
    period: "Aug 2025 - May 2026",
    location: "Oxford, OH",
    bullets: [
      "Selected by the outgoing executive board through a competitive application to lead a 110+ member organization providing academic, cultural and social support to graduate students, and acting as liaison to the Graduate School.",
      "Managed an executive team of four and ran the programming calendar end to end — events, socials, catering, promotion and turnout — coordinating with other graduate organizations so programming complemented rather than competed.",
      "Formally recognized by the Graduate School with a Certificate of Appreciation for Graduate Student Service (2026).",
    ],
    tags: ["Leadership", "Operations", "Advocacy", "Mentoring"],
  },
  {
    id: "exp-council",
    role: "Graduate Student Representative · University Graduate Council",
    org: "Miami University",
    type: "Leadership",
    period: "Aug 2025 - May 2026",
    location: "Oxford, OH",
    bullets: [
      "Elected as one of three graduate student representatives on a fifteen-member body — twelve elected faculty and three students — holding authority over graduate academic policy university-wide.",
      "Reviewed proposed changes to graduate courses and new degree programs, and represented graduate student interests in decisions affecting degree requirements and academic standards across every college.",
    ],
    tags: ["Governance", "Policy", "Academic Standards"],
  },
  {
    id: "exp-gcsp",
    role: "Program Lead · NAE Grand Challenges Scholars Program",
    org: "Miami University · College of Engineering and Computing",
    type: "Leadership",
    period: "Aug 2025 - May 2026",
    location: "Oxford, OH",
    bullets: [
      "Ran day-to-day operations of Miami University's chapter of the National Academy of Engineering initiative preparing undergraduates to work on the NAE's fourteen Grand Challenges for Engineering.",
      "Supported scholars building personalized plans of study spanning research, interdisciplinary coursework, entrepreneurship, a global experience and service learning — tracked across several semesters toward completing their designation.",
      "Handled recruitment and promotion across the College of Engineering and Computing, plus scheduling, communications and event logistics.",
    ],
    tags: ["Mentoring", "Program Ops", "Recruitment"],
  },
];

export const education = [
  {
    degree: "M.S. Computer Science",
    org: "Miami University · College of Engineering and Computing",
    period: "2024 - 2026",
    detail:
      "Thesis: \"SimForge: A Reproducible, Cross-Simulator Benchmarking Framework for Urban Traffic Simulation\" — defended July 2026 and published open-access via the OhioLINK Electronic Theses and Dissertations Center. GPA 3.86 / 4.00, funded by a full graduate assistantship covering tuition and stipend. Coursework: Generative AI, Advanced Database Systems, Machine Learning, Software Testing.",
  },
  {
    degree: "B.Tech. Computer Science",
    org: "Malla Reddy University · Hyderabad, India",
    period: "2020 - 2024",
    detail:
      "CGPA 8.16 / 10.00. Two peer-reviewed IJSREM publications (CNN soil classification, LDA topic modeling). Coursework: Data Structures & Algorithms, Object-Oriented Programming, Artificial Intelligence, Full-Stack Web Development, Database Management Systems, Computer Networks, Operating Systems.",
  },
];
