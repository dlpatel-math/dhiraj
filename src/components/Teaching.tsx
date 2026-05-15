import { motion } from 'motion/react';
import { Calendar, GraduationCap, FileText, ExternalLink } from 'lucide-react';
import { teachingHistory } from '../data/teaching';

const getSemesterRank = (sem: string): number => {
  const yearMatch = sem.match(/\d{4}/);
  if (!yearMatch) return 0;
  const year = parseInt(yearMatch[0]);

  // Academic year formats like "2024/25" or "2019-20"
  const isRange = sem.includes('/') || sem.includes('-');
  
  if (sem.includes('SS')) return year + 0.4; // Summer (April)
  if (sem.includes('WS')) return year + 0.8; // Winter (Oct)
  
  if (sem.includes('Sem II')) {
    // Sem II of 2019-20 is Jan 2020
    return isRange ? year + 1.1 : year + 0.1;
  }
  if (sem.includes('Sem I')) return year + 0.6; // July
  
  return year;
};

const getLatestRank = (semesters: string[]): number => {
  if (!semesters || semesters.length === 0) return 0;
  return Math.max(...semesters.map(getSemesterRank));
};

export default function Teaching() {
  const sortedTeaching = [...teachingHistory].sort((a, b) => 
    getLatestRank(b.semesters) - getLatestRank(a.semesters)
  );

  return (
    <section id="teaching" className="py-16 px-8 md:px-12 section-bg">
      <div className="section-title">
        <h2>Teaching</h2>
      </div>

      <div className="w-full mt-6">
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-brand-primary flex items-center gap-2 mb-4">
            <GraduationCap size={24} className="text-brand-accent" />
            Teaching Experience
          </h3>
          
          <div className="space-y-8">
            {sortedTeaching.map((item) => (
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
                  <div className="flex flex-wrap items-center gap-2">
                    {item.semesters.map((sem, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md shadow-sm whitespace-nowrap">
                        <Calendar size={12} className="text-brand-accent shrink-0" />
                        {sem}
                      </div>
                    ))}
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
                    <FileText size={14} />
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
