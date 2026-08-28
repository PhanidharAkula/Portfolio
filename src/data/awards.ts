export type Award = {
  year: string;
  title: string;
  org: string;
  href?: string;
};

export const awards: Award[] = [
  {
    year: "2026",
    title:
      "First-author paper under review · Attributable Cross-Simulator Benchmarking for Urban Traffic Simulation",
    org: "IEEE T-ITS · with Dr. DJ Rao",
  },
  {
    year: "2026",
    title:
      "First-author paper under review · CITYSCAPE: A Digital Twin Framework for Work-Commute Dynamics",
    org: "Frontiers · with Dr. DJ Rao",
  },
  {
    year: "2026",
    title:
      "M.S. thesis defended & published on OhioLINK ETD · SimForge (Apache-2.0 · Zenodo DOI)",
    org: "Miami University · OhioLINK",
    href: "http://rave.ohiolink.edu/etdc/view?acc_num=miami1784152758005036",
  },
  {
    year: "2026",
    title: "Certificate of Appreciation for Graduate Student Service",
    org: "The Graduate School · Miami University",
  },
  {
    year: "2025",
    title:
      "President · Graduate Students of Color Association (110+ members)",
    org: "Miami University",
  },
  {
    year: "2025",
    title:
      "Elected Graduate Student Representative · University Graduate Council",
    org: "Miami University",
  },
  {
    year: "2024",
    title:
      "Graduate assistantship · full tuition scholarship and stipend · M.S. Computer Science",
    org: "Miami University",
  },
  {
    year: "2023",
    title: "Peer-reviewed publication · Topic Modelling of Web Pages with LDA",
    org: "IJSREM · DOI 27350",
    href: "https://doi.org/10.55041/IJSREM27350",
  },
  {
    year: "2023",
    title: "Peer-reviewed publication · Soil Image Classification with CNNs",
    org: "IJSREM · 2023",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  href?: string;
};

export const certifications: Certification[] = [
  {
    name: "Humans as Subjects · IRB Basic Course",
    issuer: "CITI Program · ID 72099053",
    year: "2025",
    href: "https://www.citiprogram.org/verify/?weda97f46-b8a7-4212-968b-5c4e65bd473a-72099053",
  },
  {
    name: "AWS Academy Graduate · Machine Learning Foundations",
    issuer: "Amazon Web Services",
    year: "2023",
    href: "https://www.credly.com/go/QF5GMOsD",
  },
  {
    name: "Deep Learning",
    issuer: "IIT Madras · NPTEL",
    year: "2023",
    href: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL23CS24S4375869704006060",
  },
  {
    name: "AWS Academy Graduate · Cloud Foundations",
    issuer: "Amazon Web Services",
    year: "2022",
    href: "https://www.credly.com/go/n896CgEW",
  },
  {
    name: "Scaling with Google Cloud Operations",
    issuer: "Google Cloud · Coursera",
    year: "2022",
    href: "https://coursera.org/verify/TSFHFBTSZBZL",
  },
  {
    name: "Front-End Web Development with React",
    issuer: "HKUST · Coursera",
    year: "2022",
  },
];

export const press: { source: string; title: string; href?: string }[] = [
  {
    source: "IEEE T-ITS · 2026 · under review",
    title:
      "Attributable Cross-Simulator Benchmarking for Urban Traffic Simulation: Reproducibility, Consistency, and Regime-Dependent Divergence",
  },
  {
    source: "Frontiers · 2026 · under review",
    title:
      "CITYSCAPE: A Digital Twin Framework for Temporospatial Modeling of Work-Commute Dynamics and Roadway Infrastructure Demand",
  },
  {
    source: "OhioLINK ETD · 2026 · M.S. thesis",
    title:
      "SimForge: A Reproducible, Cross-Simulator Benchmarking Framework for Urban Traffic Simulation",
    href: "http://rave.ohiolink.edu/etdc/view?acc_num=miami1784152758005036",
  },
  {
    source: "Zenodo · 2026 · software",
    title: "SimForge · reproducible cross-simulator benchmarking framework (Apache-2.0)",
    href: "https://doi.org/10.5281/zenodo.21385983",
  },
  {
    source: "IJSREM · 2023",
    title: "Topic Modelling of Web Pages with LDA Methods",
    href: "https://doi.org/10.55041/IJSREM27350",
  },
  {
    source: "IJSREM · 2023",
    title: "Soil Image Classification using Deep Learning",
  },
];
