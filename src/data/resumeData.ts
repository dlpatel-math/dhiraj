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

export const educationHistory: Education[] = [
  {
    degree: "Ph.D. in Mathematics",
    period: "2018 - 2023",
    institution: "Indian Institute of Technology (IIT) Delhi, India",
    description: "Thesis: \"Sampling and reconstruction of signals in reproducing kernel Hilbert spaces and shift-invariant spaces\". Supervised by Dr. Sivananthan Sampath."
  },
  {
    degree: "Master of Science in Mathematics",
    period: "2015 - 2017",
    institution: "Indian Institute of Technology (IIT) Kanpur, India",
    description: "Focused on advanced mathematical analysis and algebraic structures."
  }
];

export const experienceHistory: Experience[] = [
  {
    role: "Postdoctoral Researcher",
    period: "2023 - Present",
    institution: "RWTH Aachen University, Germany",
    bullets: [
      "Applying sampling theory to the analysis of complex networks and graph signal processing.",
      "Collaborating with Prof. Michael T. Schaub on integrating bottom-up dynamical models and data-driven approaches.",
      "Investigating multiple levels of organization in high-dimensional data."
    ]
  },
  {
    role: "Senior Research Fellow",
    period: "2016 - 2021",
    institution: "IIT Delhi, India",
    bullets: [
      "Published multiple first-author articles in journals like Signal Processing and Numerical Algorithms.",
      "Developed stability and error analysis for sampling in shift-invariant spaces.",
      "Mentored incoming graduate students in the Department of Mathematics."
    ]
  }
];
