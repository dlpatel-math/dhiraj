export interface Student {
  id: number;
  name: string;
  level: 'PhD' | 'Master' | 'Bachelor';
  thesisTitle: string;
  status: 'Current' | 'Completed';
  period: string;
  coAdvisor?: string;
  description?: string;
  link?: string;
}

export const students: Student[] = [
  /*
  {
    id: 1,
    name: "Jane Smith",
    level: "PhD",
    thesisTitle: "Optimal Sampling Strategies in High-Dimensional Dynamic Networks",
    status: "Current",
    period: "2024 - Present",
    coAdvisor: "Prof. Michael T. Schaub",
    description: "Investigating the intersection of GSP and dynamical systems on graphs.",
    link: "https://example.com"
  },
  {
    id: 2,
    name: "Robert Weber",
    level: "Master",
    thesisTitle: "Reconstruction of Signals in Non-Uniform Shift-Invariant Spaces",
    status: "Completed",
    period: "2023 - 2024",
    description: "Developed numerical algorithms for stable signal recovery from jittered samples."
  }
  */
];