export type Award = {
  year: string;
  title: string;
  org: string;
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
  },
  {
    year: "2026",
    title: "Certificate of Appreciation · Graduate School",
    org: "Miami University",
  },
  {
    year: "2025",
    title: "Elected President · Graduate Students of Color Association (104 members)",
    org: "Miami University",
  },
  {
    year: "2025",
    title: "Elected Member · Graduate Student Council Board",
    org: "Miami University",
  },
  {
    year: "2024",
    title: "Full scholarship + assistantship · M.S. Computer Science",
    org: "Miami University",
  },
  {
    year: "2023",
    title: "Peer-reviewed publication · Topic Modelling of Web Pages with LDA",
    org: "IJSREM · DOI 27350",
  },
  {
    year: "2023",
    title: "Peer-reviewed publication · Soil Image Classification with CNNs",
    org: "IJSREM · DOI 23138",
  },
  {
    year: "2022 - 2025",
    title: "10+ technical certifications · AWS Cloud Foundations · Applied ML & AI · Software Engineering",
    org: "AICTE · Coursera · NPTEL · Forage · AWS",
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
    href: "https://doi.org/10.55041/IJSREM23138",
  },
];
