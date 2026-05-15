export interface Conference {
  id: number;
  title: string;
  location: string;
  date: string;
  type: 'Poster Presentation' | 'Oral Presentation' | 'Participant';
  presentationTitle?: string;
  organization?: string;
  category: 'Conference' | 'Workshop';
  pdfUrl?: string; // Can be a local path (e.g., 'data/file.pdf') or an external link (e.g., 'https://...')
}

export const conferences: Conference[] = [
  {
    id: 4,
    title: "NCM Harmonic Analysis",
    location: "IISER Bhopal, India",
    date: "December 10 - 14, 2019",
    type: "Participant",
    category: "Workshop"
  },
  {
    id: 2,
    title: "Applied Harmonic Analysis and Friends",
    location: "Strobl, Austria",
    date: "June 19 - 25, 2022",
    type: "Poster Presentation",
    presentationTitle: "Random sampling of signals concentrated on compact set in localized reproducing kernel subspace of $L^p(\\mathbb{R}^n)$",
    category: "Conference"
  },
  {
    id: 1,
    title: "16th Discussion Meeting in Harmonic Analysis",
    location: "IISER Bhopal, India",
    date: "December 16 - 19, 2019",
    type: "Poster Presentation",
    presentationTitle: "Random sampling in a reproducing kernel subspace of $L^p(\\mathbb{R}^n)$",
    category: "Conference"
  },
  {
    id: 3,
    title: "International Meet in Analysis",
    location: "University of Delhi, India",
    date: "November 24, 2018",
    type: "Participant",
    category: "Conference"
  },
  {
    id: 5,
    title: "AIS Harmonic Analysis",
    location: "NISER Bhubaneswar, India",
    date: "December 17 - January 5, 2019",
    type: "Participant",
    category: "Workshop"
  },
  {
    id: 6,
    title: "International Association of Applied Mathematics and Mechanics (GAMM)",
    location: "Poznan University of Technology, Poland",
    date: "April 7 - 11, 2025",
    type: "Oral Presentation",
    presentationTitle: "Convergence of gradient based training for linear Graph Neural Networks",
    category: "Conference"
  }
];
