import { motion } from 'motion/react';
import { ChevronRight, Briefcase, Users, GraduationCap } from 'lucide-react';
import { publications } from '../data/research';
import { teachingHistory } from '../data/teaching';
import { profile } from '../data/profile';

export default function About() {
  // Calculate stats from data
  const publicationCount = publications.length;
  const coursesCount = teachingHistory.length;
  
  const allCollaborators = publications.reduce((acc: string[], pub) => {
    const authors = pub.authors.split(', ').map(a => a.trim());
    return [...acc, ...authors];
  }, []);
  
  const uniqueCollaborators = new Set(
    allCollaborators.filter(author => author !== 'D. Patel' && author !== 'Dhiraj Patel')
  ).size;

  return (
    <section id="about" className="py-16 px-8 md:px-12 lg:px-24">
      <div className="section-title">
        <h2>About</h2>
        <p className="text-[#4b4949]">
          {profile.bio}
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
            src={profile.profileImage} 
            className="w-full grayscale hover:grayscale-0 transition-all duration-500 rounded-lg shadow-lg aspect-square object-cover" 
            alt={profile.fullName} 
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop";
            }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-brand-primary mb-2">Mathematical Sampling & Network Scientist.</h3>
          <p className="italic mb-6 text-[#4b4949]">
            {profile.tagline}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>Research Area:</strong> <span>Network Science & Sampling</span></li>
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>Current Position:</strong> <span>{profile.currentPosition.title}</span></li>
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>PhD:</strong> <span>IIT Delhi (2021)</span></li>
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>City:</strong> <span>{profile.location}</span></li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>Research Group:</strong> <a href={profile.currentPosition.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent">{profile.currentPosition.group}, RWTH</a></li>
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>Previous Inst:</strong> <span>IIT Delhi</span></li>
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>Email:</strong> <span>{profile.email}</span></li>
              <li className="flex items-center gap-2 text-sm"><ChevronRight className="text-brand-accent" size={16} /> <strong>Availability:</strong> <span>Collaborations Welcome</span></li>
            </ul>
          </div>
          
          <p className="text-[#4b4949]">
            {profile.detailedBio}
          </p>
        </motion.div>
      </div>

      {/* Facts Section */}
      <div className="flex justify-center flex-wrap gap-12 md:gap-24 mt-24">
        {[
          { icon: Briefcase, count: publicationCount, label: "Publications" },
          { icon: Users, count: uniqueCollaborators, label: "Collaborators" },
          { icon: GraduationCap, count: coursesCount, label: "Courses Taught" },
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

