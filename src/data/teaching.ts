export interface TeachingCourse {
  id: number;
  title: string;
  role: string;
  institution: string;
  period: string;
  description: string;
  materialsUrl?: string;
  category: 'Undergraduate' | 'Graduate' | 'Workshop';
}

export const teachingHistory: TeachingCourse[] = [
  {
    id: 1,
    title: "Calculus (MA110 & MA120)",
    role: "Teaching Assistant",
    institution: "IIT Delhi",
    period: "2016 - 2021",
    description: "Conducted weekly tutorials for undergraduate students (B.Tech), covering differential and integral calculus, Taylor series, and multiple integrals. Evaluated weekly assignments and exam papers.",
    category: "Undergraduate"
  },
  {
    id: 2,
    title: "Linear Algebra (MAL101)",
    role: "Teaching Assistant",
    institution: "IIT Delhi",
    period: "2017 - 2019",
    description: "Facilitated problem-solving sessions for first-year engineering students focusing on vector spaces, orthonormal bases, and matrix decomposition.",
    category: "Undergraduate"
  },
  {
    id: 3,
    title: "Functional Analysis & RKHS",
    role: "Support Instructor",
    institution: "IIT Delhi",
    period: "2020",
    description: "Guest lectures for advanced masters and PhD students on the properties of Reproducing Kernel Hilbert Spaces and their applications in sampling theory.",
    category: "Graduate"
  },
  {
    id: 4,
    title: "Network Science & Graph Signal Processing",
    role: "Postdoctoral Research Associate",
    institution: "RWTH Aachen University",
    period: "2023 - Present",
    description: "Mentoring PhD and Master students in research projects focused on network analysis, graph-based data processing, and complex system dynamics.",
    category: "Graduate"
  }
];
