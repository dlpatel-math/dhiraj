import { motion } from 'motion/react';
import { Calendar, MapPin, Presentation, UserCheck, Award, FileText, ExternalLink, Image as ImageIcon } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { conferences, type Conference } from '../data/conferences';

/**
 * Renders text containing LaTeX math between $ delimiters
 */
function RenderTitle({ title }: { title: string }) {
  const parts = title.split(/(\$.*?\$)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          return <InlineMath key={i} math={math} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function Conferences() {
  const parseYearAndMonth = (dateStr: string) => {
    const yearMatch = dateStr.match(/\d{4}/g);
    const year = yearMatch ? Math.max(...yearMatch.map(y => parseInt(y, 10))) : 0;
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    let monthIndex = -1;
    for (let i = 0; i < months.length; i++) {
      if (dateStr.includes(months[i])) {
        monthIndex = i;
        // Don't break, find the last month mentioned if it's a range
      }
    }
    
    return { year, monthIndex };
  };

  const sortedConferences = [...conferences].sort((a, b) => {
    const dateA = parseYearAndMonth(a.date);
    const dateB = parseYearAndMonth(b.date);
    
    if (dateB.year !== dateA.year) {
      return dateB.year - dateA.year;
    }
    return dateB.monthIndex - dateA.monthIndex;
  });

  const conferenceList = sortedConferences.filter(c => c.category === 'Conference');
  const workshopList = sortedConferences.filter(c => c.category === 'Workshop');

  return (
    <section id="conferences" className="py-20 px-8 md:px-12 bg-white border-t border-slate-100">
      <div className="section-title">
        <h2>Conferences & Workshops</h2>
      </div>

      <div className="w-full space-y-10">
        {/* Conferences Section */}
        <div>
          <div className="flex items-center gap-2 mb-4 border-b-2 border-brand-primary/10 pb-2">
            <Presentation className="text-brand-accent shrink-0" size={18} />
            <h3 className="text-lg font-bold text-brand-primary m-0 uppercase tracking-widest">Conference Presentations</h3>
          </div>

          <div className="space-y-6">
            {conferenceList.map((conf, idx) => (
              <motion.div
                key={conf.id}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6">
                  <div className="md:w-32 shrink-0 md:text-right">
                    <span className="text-sm font-bold text-slate-400 font-mono tracking-tighter">{conf.date}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h4 className="text-base font-bold text-brand-primary leading-snug">
                        {conf.title}
                      </h4>
                      <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase tracking-tighter shrink-0 border border-slate-200">
                        {conf.type}
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin size={12} className="text-slate-300" />
                      {conf.location}
                    </p>

                    {conf.presentationTitle && (
                      <div className="mt-2 text-sm text-slate-600 leading-relaxed italic border-l-2 border-brand-accent/20 pl-3">
                        <RenderTitle title={conf.presentationTitle} />
                      </div>
                    )}

                    {conf.pdfUrl && (
                      <div className="mt-2">
                        <a 
                          href={conf.pdfUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] font-black text-brand-accent hover:text-brand-primary uppercase tracking-widest transition-colors"
                        >
                          <FileText size={12} />
                          Download Poster / Slides
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Workshops Section */}
        <div>
          <div className="flex items-center gap-2 mb-4 border-b-2 border-brand-primary/10 pb-2">
            <Award className="text-brand-accent shrink-0" size={18} />
            <h3 className="text-lg font-bold text-brand-primary m-0 uppercase tracking-widest">Workshops & Schools</h3>
          </div>

          <div className="space-y-6">
            {workshopList.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6"
              >
                 <div className="md:w-32 shrink-0 md:text-right">
                    <span className="text-sm font-bold text-slate-400 font-mono tracking-tighter">{item.date}</span>
                  </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h4 className="text-base font-bold text-brand-primary leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                    <p className="flex items-center gap-1">
                      <MapPin size={12} className="text-slate-300" />
                      {item.location}
                    </p>
                    {item.pdfUrl && (
                      <a 
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-black text-brand-accent/70 hover:text-brand-accent uppercase tracking-widest flex items-center gap-0.5"
                      >
                        <FileText size={12} />
                        Certificate
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
