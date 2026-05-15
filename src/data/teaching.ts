export interface TeachingCourse {
  id: number;
  title: string;
  role: string;
  institution: string;
  semesters: string[];
  description: string;
  materialsUrl?: string;
  category: 'Undergraduate' | 'Graduate' | 'Workshop';
}

export const teachingHistory: TeachingCourse[] = [
  {
    id: 6,
    title: "Network Analytics",
    role: "Teaching Assistant",
    institution: "RWTH Aachen University",
    semesters: ["SS 2026"],
    description: "Evaluated group assignments for a master-level practical course on network analysis. Reviewed submissions on topics such as spectral clustering, network embeddings, and graph neural networks, and responded to student queries during the course.",
    category: "Graduate"
  },
  {
    id: 1,
    title: "Calculus (MTL100)",
    role: "Teaching Assistant",
    institution: "IIT Delhi",
    semesters: ["Sem I-II, 2019-20", "Sem I, 2020-21", "Sem II, 2021-22", "Sem I, 2022-23"],
    description: "Conducted weekly tutorial sessions for first-year undergraduate students, covering single and multivariable calculus, sequences and series, vector calculus, and integral theorems. Guided students through problem-solving assignments and evaluated examination papers.",
    // materialsUrl: "/data/Document/Teaching/calculus_notes.pdf",
    category: "Undergraduate"
  },
  {
    id: 2,
    title: "Linear Algebra (MTL101)",
    role: "Teaching Assistant",
    institution: "IIT Delhi",
    semesters: ["Sem I, 2018-19", "Sem II, 2020-21"],
    description: "Conducted weekly tutorial sessions for first-year undergraduate students on linear algebra and differential equations, including Laplace transform methods. Guided students through problem-solving assignments and evaluated examination papers.",
    category: "Undergraduate"
  },
  {
    id: 3,
    title: "Functional Analysis (MTL411)",
    role: "Teaching Assistant",
    institution: "IIT Delhi",
    semesters: ["Sem II, 2018-19"],
    description: "Prepared assignment sheets and evaluated examination papers for final-year BS Mathematics students.",
    category: "Undergraduate"
  },
  {
    id: 4,
    title: "Real Analysis (MTL503)",
    role: "Teaching Assistant",
    institution: "IIT Delhi",
    semesters: ["Sem I, 2021-22"],
    description: "Conducted weekly tutorial sessions for first-year M.Sc. students and evaluated examination papers. Assisted with assignment discussions covering real analysis, including metric spaces, sequences of functions, and multivariable calculus.",
    category: "Graduate"
  },
  {
    id: 5,
    title: "Algorithmic Foundation of Data Science",
    role: "Teaching Assistant",
    institution: "RWTH Aachen University",
    semesters: ["WS 2024/25", "WS 2025/26"],
    description: "Conducted bi-weekly tutorial sessions for master students, prepared assignments, and assisted with problem-solving discussions. Evaluated examination papers and supported students in understanding core concepts in modern data processing and algorithmic data science.",
    category: "Graduate"
  }
];
