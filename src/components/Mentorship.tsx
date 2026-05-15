import { motion } from 'motion/react';
import { ExternalLink, GraduationCap, Calendar, User, Award } from 'lucide-react';
import { students, Student } from '../data/students';

export default function Mentorship() {
  if (students.length === 0) return null;

  // Group students by level
  const groupedStudents = students.reduce((acc, student) => {
    const level = student.level;
    if (!acc[level]) acc[level] = [];
    acc[level].push(student);
    return acc;
  }, {} as Record<string, Student[]>);

  const levels = ['PhD', 'Master', 'Bachelor'];

  return (
    <section id="mentorship" className="py-16 px-8 md:px-12">
      <div className="section-title">
        <h2>Mentorship</h2>
      </div>

      <div className="mt-6 space-y-12">
        {levels.map(level => {
          const levelStudents = groupedStudents[level];
          if (!levelStudents || levelStudents.length === 0) return null;

          return (
            <div key={level}>
              <h3 className="text-xl font-bold text-brand-primary border-b border-brand-primary/10 pb-2 mb-4 flex items-center gap-2">
                <GraduationCap className="text-brand-accent" size={24} />
                {level === 'PhD' ? 'Doctoral Students' : level === 'Master' ? "Master's Students" : "Bachelor's Students"}
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                {levelStudents.map((student) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row gap-4 md:gap-8 p-6 bg-slate-50/50 rounded-xl border border-slate-200 transition-all hover:bg-white hover:shadow-sm"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-slate-800">{student.name}</h4>
                          {student.status === 'Completed' && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">
                              <Award size={10} /> Alumni
                            </span>
                          )}
                          {student.status === 'Current' && (
                            <span className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent text-[10px] font-bold rounded uppercase">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                            <Calendar size={14} className="text-brand-accent" />
                            {student.period}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 items-start">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Thesis Title</span>
                          <p className="text-sm text-brand-primary leading-snug break-words">
                            {student.thesisTitle}
                          </p>
                        </div>

                        {student.coAdvisor && (
                          <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-2 items-start">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Co-Advisor</span>
                            <p className="text-xs text-slate-600 break-words">{student.coAdvisor}</p>
                          </div>
                        )}

                        {student.description && (
                          <p className="text-sm text-slate-600 pl-4 border-l-2 border-slate-200 italic break-words">
                            {student.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {student.link && (
                      <div className="flex items-center">
                        <a 
                          href={student.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-brand-accent hover:bg-brand-accent/10 rounded-full transition-colors"
                          title="Personal Website"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
