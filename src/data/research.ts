export interface Publication {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: number;
  category: 'journal' | 'preprint' | 'conference';
  link?: string;
  pdfUrl?: string; // Can be a local path (e.g., 'data/file.pdf') or an external link (e.g., 'https://drive.google.com/...')
  abstract?: string;
}

export const publications: Publication[] = [
  { 
    id: 10, 
    title: "Constructive approximation in mixed-norm spaces", 
    authors: "P. Majethiya, S. Bajpeyi, D. Patel",
    journal: "Analysis and Mathematical Physics",
    year: 2026,
    category: "journal",
    link: "https://doi.org/10.1007/s13324-026-01204-8",
    pdfUrl: "data/Document/Research/majethiya2026.pdf"
  },
  { 
    id: 1, 
    title: "Random sampling in reproducing kernel subspaces of $L^p(\\mathbb{R}^n)$", 
    authors: "D. Patel, S. Sivananthan",
    journal: "Journal of Mathematical Analysis and Applications",
    year: 2020,
    category: "journal",
    link: "https://doi.org/10.1016/j.jmaa.2020.124270",
    pdfUrl: "data/Document/Research/patel2020.pdf"
  },
  { 
    id: 2, 
    title: "Random sampling and reconstruction in reproducing kernel subspace of mixed Lebesgue spaces", 
    authors: "P. Goyal, D. Patel, S. Sivananthan",
    journal: "Mathematical Methods in the Applied Sciences",
    year: 2022,
    category: "journal",
    link: "https://doi.org/10.1002/mma.8821",
    pdfUrl: "data/Document/Research/patel2022.pdf"
  },
  { 
    id: 3, 
    title: "Random sampling of signals concentrated on compact set in localized reproducing kernel subspace of $L^p(\\mathbb{R}^n)$", 
    authors: "D. Patel, S. Sivananthan",
    journal: "Advances in Computational Mathematics",
    year: 2023,
    category: "journal",
    link: "https://doi.org/10.1007/s10444-023-10075-7",
    pdfUrl: "data/Document/Research/patel2023a.pdf"
  },
  { 
    id: 4, 
    title: "Spherical random sampling of localized functions on $\\mathbb{S}^{n-1}$", 
    authors: "D. Patel, S. Sivananthan",
    journal: "Proceedings of the American Mathematical Society",
    year: 2023,
    category: "journal",
    link: "https://doi.org/10.1090/proc/16393",
    pdfUrl: "data/Document/Research/patel2023b.pdf"
  },
  { 
    id: 5, 
    title: "Random Average Sampling in a Reproducing Kernel Subspace of Mixed Lebesgue Space $L^{p,q}(\\mathbb{R}^{n+1})$", 
    authors: "D. Patel, S. Sivananthan",
    journal: "Results in Mathematics",
    year: 2023,
    category: "journal",
    link: "https://doi.org/10.1007/s00025-023-02037-8",
    pdfUrl: "data/Document/Research/patel2023c.pdf"
  },
  { 
    id: 6, 
    title: "Convergence of gradient based training for linear Graph Neural Networks", 
    authors: "D. Patel, A. Savostianov, M. T. Schaub",
    journal: "arxiv",
    year: 2025,
    category: "preprint",
    link: "https://doi.org/10.48550/arXiv.2501.14440",
    pdfUrl: "data/Document/Research/patel2025.pdf"
  },
  { 
    id: 7, 
    title: "Sampling and reconstruction in reproducing kernel subspaces of mixed Lebesgue spaces", 
    authors: "A. Kumar, D. Patel, S. Sivananthan",
    journal: "Journal of Pseudo-Differential Operators and Applications",
    year: 2019,
    category: "journal",
    link: "https://doi.org/10.1007/s11868-019-00315-0",
    pdfUrl: "data/Document/Research/kumar2019.pdf"
  },
  { 
    id: 8, 
    title: "Relevant sampling in a reproducing kernel subspace of Orlicz space", 
    authors: "S. Bajpeyi, D. Patel, S. Sivananthan",
    journal: "Analysis and Applications",
    year: 2024,
    category: "journal",
    link: "https://doi.org/10.1142/S021953052450012X",
    pdfUrl: "data/Document/Research/bajpeyi2024a.pdf"
  },
  { 
    id: 9, 
    title: "Random sampling of Mellin band-limited signals", 
    authors: "S. Bajpeyi, D. Patel, S. Sivananthan",
    journal: "Numerical Functional Analysis and Optimization",
    year: 2024,
    category: "journal",
    link: "https://doi.org/10.1080/01630563.2024.2318576",
    pdfUrl: "data/Document/Research/bajpeyi2024b.pdf"
  }
];
