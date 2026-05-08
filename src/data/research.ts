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
    id: 3, 
    title: "On the weights of Galois representations attached to Hilbert modular forms", 
    authors: "D. Patel, M. Müller",
    journal: "arXiv preprint",
    year: 2025,
    category: "preprint",
    link: "./data/Document/galois_representations_2025.pdf"
  },
  { 
    id: 1, 
    title: "Explicit computation of L-functions for hyperelliptic curves of genus 3", 
    authors: "D. Patel, A. Smith, J. Doe",
    journal: "Journal of Number Theory",
    year: 2024,
    category: "journal",
    link: "./data/Document/l_functions_genus3.pdf"
  },
  { 
    id: 2, 
    title: "Modular forms and their applications in string theory", 
    authors: "D. Patel",
    journal: "Journal of High Energy Physics",
    year: 2023,
    category: "journal",
    link: "./data/Document/modular_forms_string_theory.pdf"
  },
  { 
    id: 6, 
    title: "Solutions to certain classes of Diophantine equations via elliptic curves", 
    authors: "D. Patel, K. Lee",
    journal: "Acta Arithmetica",
    year: 2023,
    category: "journal",
    link: "./data/Document/diophantine_solutions.pdf"
  },
  { 
    id: 4, 
    title: "A comparative study of computational group theory algorithms", 
    authors: "R. Garcia, D. Patel",
    journal: "Proceedings of the ISSAC",
    year: 2022,
    category: "conference",
    link: "./data/Document/comp_group_theory_issac.pdf"
  },
  { 
    id: 5, 
    title: "Dynamics of billiard flows on Riemann surfaces", 
    authors: "D. Patel",
    journal: "Mathematische Annalen",
    year: 2021,
    category: "journal",
    link: "./data/Document/billiard_flows_riemann.pdf"
  },
];
