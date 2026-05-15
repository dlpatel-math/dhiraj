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
    <section id="about" className="py-20 px-8 md:px-12 bg-white border-t border-slate-100">
      <div className="w-full px-4">
        <div className="section-title mb-6">
          <h2>About Me</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
          {/* Left Side: Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-accent/20 to-brand-primary/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                <img 
                  src={profile.profileImage} 
                  alt={profile.fullName}
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-brand-accent">
                  <Briefcase size={20} />
                </div>
                <div>
                  <span className="text-2xl font-bold text-brand-primary leading-none block">{publicationCount}</span>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Publications</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-brand-accent">
                  <Users size={20} />
                </div>
                <div>
                  <span className="text-2xl font-bold text-brand-primary leading-none block">{uniqueCollaborators}</span>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Collaborators</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-brand-accent">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <span className="text-2xl font-bold text-brand-primary leading-none block">{coursesCount}</span>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Courses Taught</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-brand-primary tracking-tight">
                {profile.fullName}
              </h3>
              <p className="text-lg font-bold text-brand-accent uppercase tracking-[0.15em]">
                {profile.tagline}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pb-4 border-b border-slate-100">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-brand-accent/5 flex items-center justify-center shrink-0">
                    <ChevronRight className="text-brand-accent" size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Research Area</p>
                    <p className="text-slate-700 font-bold leading-tight">{profile.researchArea}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-brand-accent/5 flex items-center justify-center shrink-0">
                    <ChevronRight className="text-brand-accent" size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Position</p>
                    <p className="text-slate-700 font-bold leading-tight">{profile.currentPosition.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{profile.currentPosition.group}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-brand-accent/5 flex items-center justify-center shrink-0">
                    <ChevronRight className="text-brand-accent" size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Institute</p>
                    <p className="text-slate-700 font-bold leading-tight">{profile.currentPosition.institution}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-brand-accent/5 flex items-center justify-center shrink-0">
                    <ChevronRight className="text-brand-accent" size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">PhD</p>
                    <p className="text-slate-700 font-bold">{profile.phd}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-brand-accent/5 flex items-center justify-center shrink-0">
                    <ChevronRight className="text-brand-accent" size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Location & Office</p>
                    <p className="text-slate-700 font-bold leading-tight">{profile.location}</p>
                    <p className="text-xs text-slate-500 mt-1">{profile.office}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-brand-accent/5 flex items-center justify-center shrink-0">
                    <ChevronRight className="text-brand-accent" size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email</p>
                    <a href={`mailto:${profile.email}`} className="text-brand-primary font-mono font-bold hover:text-brand-accent transition-colors block mt-0.5">{profile.email}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                {profile.detailedBio}
              </p>
            </div>

          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-12 border-t border-slate-100 mt-12"
        >
          <div className="relative px-8 text-center max-w-4xl mx-auto">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl text-brand-primary/5 font-serif">"</span>
            <p className="text-2xl font-medium text-brand-primary/70 italic leading-relaxed relative z-10">
              “It is not knowledge, but the act of learning, not possession but the act of getting there, which grants the greatest enjoyment.”
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-brand-accent/30"></div>
              <span className="text-brand-accent font-bold uppercase tracking-[0.3em] text-sm">Carl Friedrich Gauss</span>
              <div className="h-px w-12 bg-brand-accent/30"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

