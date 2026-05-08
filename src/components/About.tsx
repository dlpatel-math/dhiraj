import { motion } from 'motion/react';
import { ChevronRight, Briefcase, Users, Mic, Award } from 'lucide-react';
import { publications } from '../data/research';

export default function About() {
  // Calculate stats from publications data
  const publicationCount = publications.length;
  
  const allCollaborators = publications.reduce((acc: string[], pub) => {
    const authors = pub.authors.split(', ').map(a => a.trim());
    return [...acc, ...authors];
  }, []);
  
  const uniqueCollaborators = new Set(
    allCollaborators.filter(author => author !== 'D. Patel')
  ).size;

  return (
    <section id="about" className="py-16 px-8 md:px-12 lg:px-24">
      <div className="section-title">
        <h2>About</h2>
        <p className="text-[#4b4949]">
          I am a Postdoctoral Researcher in Mathematics with a deep interest in Algebraic Geometry and Number Theory. My work focuses on exploring the intersections between arithmetic properties and geometric structures, contributing to both theoretical frameworks and computational applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-8 mt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <img 
            src="./data/Image/about.svg" 
            className="w-full grayscale hover:grayscale-0 transition-all duration-500 rounded-lg shadow-lg" 
            alt="Dhiraj Patel" 
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-brand-primary mb-2">Mathematician & Researcher.</h3>
          <p className="italic mb-6 text-[#4b4949]">
            Dedicated to advancing mathematical knowledge through rigorous research and inspiring the next generation of scholars through innovative teaching.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>Research Area:</strong> <span>Algebraic Geometry</span></li>
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>Current Position:</strong> <span>Postdoctoral Researcher</span></li>
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>PhD:</strong> <span>Aachen University (2023)</span></li>
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>City:</strong> <span>Aachen, Germany</span></li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>Phone:</strong> <span>+49 123 456 7890</span></li>
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>Website:</strong> <span>www.math-patel.com</span></li>
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>Email:</strong> <span>dpatel@university.edu</span></li>
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>Status:</strong> <span>On Job Market</span></li>
            </ul>
          </div>
          
          <p className="text-[#4b4949]">
            My academic journey is driven by a passion for uncovering the underlying structures of mathematical objects. I am committed to open research and the effective communication of complex ideas, aiming to bridge the gap between abstract theory and tangible understanding.
          </p>
        </motion.div>
      </div>

      {/* Facts Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
        {[
          { icon: Briefcase, count: publicationCount, label: "Publications" },
          { icon: Users, count: uniqueCollaborators, label: "Collaborators" },
          { icon: Mic, count: 18, label: "Invited Talks" },
          { icon: Award, count: 5, label: "Grants & Fellowships" },
        ].map((fact, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-white mb-4">
              <fact.icon size={24} />
            </div>
            <span className="text-4xl font-bold font-heading mb-2">{fact.count}</span>
            <p className="text-xs font-semibold text-[#4b4949] uppercase tracking-wide text-center">{fact.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
