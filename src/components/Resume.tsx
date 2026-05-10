import { motion } from 'motion/react';
import { Download } from 'lucide-react';
import { educationHistory, experienceHistory } from '../data/resumeData';
import { profile } from '../data/profile';

export default function Resume() {
  return (
    <section id="resume" className="py-16 px-8 md:px-12 lg:px-24">
      <div className="section-title">
        <h2>Curriculum Vitae</h2>
        <p className="text-[#4b4949] mb-4">
          My academic trajectory has been defined by a commitment to mathematical rigor and clarity, spanning research in algebraic structures and dedicated undergraduate mentorship.
        </p>
      </div>
        
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-brand-primary my-4">Summary</h3>
          <div className="pl-5 border-l-2 border-brand-accent relative pb-4">
            <div className="absolute w-4 h-4 rounded-full border-2 border-brand-accent bg-white -left-[9px] top-0" />
            <h4 className="text-xl font-bold font-heading text-brand-primary uppercase mb-3">{profile.fullName}</h4>
            <p className="italic text-sm mb-4">{profile.tagline}</p>
            <ul className="list-disc pl-5 text-sm space-y-2 text-slate-700">
              <li>{profile.currentPosition.institution}</li>
              <li>{profile.email}</li>
              <li>{profile.location}</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-brand-primary my-4">Education</h3>
          {educationHistory.map((edu, idx) => (
            <div key={idx} className="pl-5 border-l-2 border-brand-accent relative pb-4">
              <div className="absolute w-4 h-4 rounded-full border-2 border-brand-accent bg-white -left-[9px] top-0" />
              <h4 className="text-xl font-bold font-heading text-brand-primary uppercase mb-2">{edu.degree}</h4>
              <span className="bg-[#f7f8f9] px-4 py-1 inline-block font-bold text-sm mb-3">{edu.period}</span>
              <p className="italic text-sm mb-4">{edu.institution}</p>
              {edu.description && <p className="text-sm border-t border-brand-accent/10 pt-2 text-slate-700">{edu.description}</p>}
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-brand-primary my-4">Research & Professional Experience</h3>
          {experienceHistory.map((exp, idx) => (
            <div key={idx} className="pl-5 border-l-2 border-brand-accent relative pb-4">
              <div className="absolute w-4 h-4 rounded-full border-2 border-brand-accent bg-white -left-[9px] top-0" />
              <h4 className="text-xl font-bold font-heading text-brand-primary uppercase mb-2">{exp.role}</h4>
              <span className="bg-[#f7f8f9] px-4 py-1 inline-block font-bold text-sm mb-3">{exp.period}</span>
              <p className="italic text-sm mb-4">{exp.institution}</p>
              <ul className="list-disc pl-5 text-sm space-y-2 text-slate-700">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-l-4 border-l-brand-primary border-t border-r border-b border-slate-200 p-8 rounded-r-xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-brand-primary mb-2">Detailed Curriculum Vitae</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            If you require a comprehensive overview of my academic background, full list of publications, teaching portfolio, and service history, please download the PDF version of my CV.
          </p>
        </div>
        <a 
          href="/Dhiraj_Patel_CV.pdf"
          download
          className="group flex items-center gap-3 bg-brand-primary text-white px-8 py-4 rounded-lg hover:bg-brand-accent transition-all shadow-md active:scale-95 whitespace-nowrap font-bold text-sm tracking-wide"
        >
          <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
          DOWNLOAD FULL CV
        </a>
      </div>
    </section>
  );
}
