import { motion } from 'motion/react';
import { Calendar, GraduationCap, ExternalLink } from 'lucide-react';
import { teachingHistory } from '../data/teaching';

export default function Teaching() {
  return (
    <section id="teaching" className="py-16 px-8 md:px-12 lg:px-24 section-bg">
      <div className="section-title">
        <h2>Teaching</h2>
        <p className="text-[#4b4949]">
          Commitment to pedagogical excellence and the mentorship of future mathematicians through rigorous instruction and curriculum development.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-brand-primary flex items-center gap-2 mb-8">
            <GraduationCap size={24} className="text-brand-accent" />
            Teaching Experience
          </h3>
          
          <div className="space-y-8">
            {teachingHistory.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative pl-8 border-l-2 border-black/5 hover:border-brand-accent transition-colors"
              >
                <div className="absolute w-3 h-3 rounded-full bg-slate-200 group-hover:bg-brand-accent group-hover:scale-125 -left-[7px] top-2 transition-all duration-300" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-brand-primary leading-tight group-hover:text-brand-accent transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-brand-accent font-semibold mt-1">
                      {item.role} @ {item.institution}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#777] uppercase bg-white border border-black/5 px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap self-start md:self-center">
                    <Calendar size={14} className="text-brand-accent" />
                    {item.period}
                  </div>
                </div>

                <p className="text-base text-[#4b4949] leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.materialsUrl && (
                  <a 
                    href={item.materialsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 text-brand-primary text-xs font-bold rounded-lg hover:bg-brand-primary hover:text-white transition-all shadow-sm border border-brand-primary/10"
                  >
                    <ExternalLink size={14} />
                    View Course Materials
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
