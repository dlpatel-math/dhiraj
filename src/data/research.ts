export interface Publication {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: number;
  category: 'journal' | 'preprint' | 'conference';
  link?: string;
  abstract?: string;
}

export const publications: Publication[] = [
  { 
    id: 1, 
    title: "Sampling and reconstruction of signals in shift-invariant spaces: Revisit through reproducing kernel Hilbert spaces", 
    authors: "D. Patel, S. Sampath",
    journal: "Signal Processing",
    year: 2021,
    category: "journal",
    link: "https://doi.org/10.1016/j.sigpro.2021.108034"
  },
  { 
    id: 2, 
    title: "Generalized prolate spheroidal wave functions in reproducing kernel Hilbert spaces", 
    authors: "D. Patel, S. Sampath",
    journal: "Numerical Algorithms",
    year: 2020,
    category: "journal",
    link: "https://doi.org/10.1007/s11075-019-00787-1"
  },
  { 
    id: 3, 
    title: "Optimal sampling for signal reconstruction in reproducing kernel Hilbert spaces", 
    authors: "D. Patel, S. Sampath",
    journal: "Journal of Mathematical Analysis and Applications",
    year: 2019,
    category: "journal",
    link: "https://doi.org/10.1016/j.jmaa.2019.04.053"
  },
  { 
    id: 4, 
    title: "Sampling and reconstruction of signals in Sobolev spaces of fractional order", 
    authors: "D. Patel, S. Sampath",
    journal: "Sampling Theory in Signal and Image Processing",
    year: 2018,
    category: "journal",
  },
  { 
    id: 5, 
    title: "Stability and error analysis for sampling in shift-invariant spaces", 
    authors: "D. Patel, S. Sampath",
    journal: "Journal of Applied Mathematics and Computing",
    year: 2022,
    category: "journal",
    link: "https://doi.org/10.1007/s12190-021-01640-w"
  },
  { 
    id: 6, 
    title: "Graph Signal Processing in the context of Complex Networks", 
    authors: "D. Patel, M. T. Schaub",
    journal: "In Preparation",
    year: 2024,
    category: "preprint",
  }
];
