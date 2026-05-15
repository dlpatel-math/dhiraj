import { motion } from 'motion/react';
import { educationHistory, experienceHistory, resumeHeader } from '../data/resumeData';
import { profile } from '../data/profile';
import { Mail, MapPin, Building2, BookText } from 'lucide-react';

export default function Resume() {
  return (
    <section id="resume" className="py-16 px-8 md:px-12 bg-white">
      <div className="section-title">
        <h2>Curriculum Vitae</h2>
      </div>
        
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
        {/* Left Column: Summary & Education */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-brand-primary mb-4 flex items-center gap-2 uppercase tracking-widest border-b border-slate-100 pb-2">
              <BookText size={20} className="text-brand-accent" />
              Professional Summary
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="text-2xl font-bold text-brand-primary mb-1">{resumeHeader.name}</h4>
              <p className="text-brand-accent font-bold text-sm mb-4 uppercase tracking-tighter">{resumeHeader.tagline}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <Building2 size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">{resumeHeader.institution}</p>
                    <p className="text-xs">{resumeHeader.department}</p>
                    <p className="text-xs">{resumeHeader.group}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={16} className="text-slate-400 shrink-0" />
                  <span>{resumeHeader.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <MapPin size={16} className="text-slate-400 shrink-0" />
                  <span>{resumeHeader.address}</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-700 bg-white p-4 rounded-xl border border-slate-200/50 italic">
                "{resumeHeader.summary}"
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-brand-primary mb-4 flex items-center gap-2 uppercase tracking-widest border-b border-slate-100 pb-2">
              <Building2 size={20} className="text-brand-accent" />
              Education
            </h3>
            <div className="space-y-8">
              {educationHistory.map((edu, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-6 border-l-2 border-brand-accent/20"
                >
                  <div className="absolute w-3 h-3 rounded-full bg-brand-accent -left-[7px] top-1.5" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold text-brand-primary uppercase tracking-tight">{edu.degree}</h4>
                    <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full whitespace-nowrap">{edu.period}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-600 mb-2 italic">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {edu.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Experience */}
        <div>
          <h3 className="text-xl font-bold text-brand-primary mb-4 flex items-center gap-2 uppercase tracking-widest border-b border-slate-100 pb-2">
            <Building2 size={20} className="text-brand-accent" />
            Experience
          </h3>
          <div className="space-y-10">
            {experienceHistory.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-6 border-l-2 border-brand-accent/20"
              >
                <div className="absolute w-3 h-3 rounded-full bg-slate-200 -left-[7px] top-1.5 ring-4 ring-white" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="text-base font-bold text-brand-primary uppercase tracking-tight">{exp.role}</h4>
                  <span className="text-[10px] font-black bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-full whitespace-nowrap">{exp.period}</span>
                </div>
                <p className="text-sm font-medium text-slate-600 mb-4 italic">{exp.institution}</p>
                <ul className="space-y-3">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-sm text-slate-600 flex gap-3 leading-relaxed">
                      <span className="text-brand-accent font-bold">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
