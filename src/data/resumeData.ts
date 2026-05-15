export interface Education {
  degree: string;
  period: string;
  institution: string;
  description?: string;
}

export interface Experience {
  role: string;
  period: string;
  institution: string;
  bullets: string[];
}

export const resumeHeader = {
  name: "Dhiraj Patel, Ph.D.",
  tagline: "Postdoctoral Researcher",
  institution: "RWTH Aachen University",
  department: "Department of Computer Science",
  group: "Chair of Computational Network Science",
  email: "patel@netsci.rwth-aachen.de",
  address: "Aachen, Germany",
  summary: "Postdoctoral researcher in mathematical sampling theory and network science. Current work focuses on theoretical aspects of graph-structured data and network analysis."
};

export const educationHistory: Education[] = [
  {
    degree: "Ph.D. in Mathematics",
    period: "2018 - 2023",
    institution: "Indian Institute of Technology (IIT) Delhi, India",
    description: "Thesis: \"Random sampling in reproducing kernel subspaces\"."
  },
  {
    degree: "Master of Science in Mathematics",
    period: "2015 - 2017",
    institution: "Indian Institute of Technology (IIT) Kanpur, India"
    // description: ""
  }
];

export const experienceHistory: Experience[] = [
  /* 
  // Example for future roles:
  {
    role: "Assistant Professor",
    period: "20XX - Future",
    institution: "Your Next Institute",
    bullets: [
      "Leading research in mathematical network science...",
      "Teaching graduate courses in graph signal processing...",
      "Supervising Ph.D. students and postdocs..."
    ]
  },
  */
  {
  role: "Postdoctoral Researcher",
  period: "2023 - Present",
  institution: "RWTH Aachen University, Germany",
  bullets: [
    "Working in the Computational Network Science group led by Prof. Michael T. Schaub on theoretical aspects of network dynamics, graph learning, and data-driven network analysis.",
    "Investigating theoretical aspects of Graph Neural Networks (GNNs), including convergence behavior and learning dynamics on graph-structured data.",
    "Developing mathematical frameworks connecting sampling theory with analysis of complex networks and graph-structured data.",
    "Supervised the Bachelor thesis of Richard Hildenstab on convergence of gradient flow training for Multiscale Linear Graph Neural Networks.",
    "Assisted in teaching multiple undergraduate and graduate courses, including Algorithmic Foundations of Data Science and Network Analytics.",
    "Supervised student seminars in Advanced Topics in Network Science."
  ]
},
{
  role: "Research Fellow",
  period: "2018 - 2023",
  institution: "Indian Institute of Technology (IIT) Delhi, India",
  bullets: [
    "Developed stability and error analysis for sampling and reconstruction in shift-invariant spaces and Reproducing Kernel Hilbert Spaces (RKHS).",
    "Conducted research on non-uniform and random sampling theory, focusing on signal recovery in structured mathematical spaces.",
    "Supported instruction across undergraduate and graduate mathematics courses, including Calculus, Linear Algebra, Real Analysis, and Functional Analysis."
  ]
}
];
