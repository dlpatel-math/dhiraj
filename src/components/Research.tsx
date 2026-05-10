import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { ExternalLink, FileText, Calendar, BookOpen, Network, ChevronDown, ChevronUp } from 'lucide-react';
import { publications, type Publication } from '../data/research';
import CollaborationNetwork from './CollaborationNetwork';

const categories = [
  { id: 'all', label: 'All Publications' },
  { id: 'journal', label: 'Journal Articles' },
  { id: 'preprint', label: 'Preprints' },
  { id: 'conference', label: 'Conference Papers' },
];

export default function Research() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNetwork, setShowNetwork] = useState(false);

  const sortedAndFilteredPublications = useMemo(() => {
    // First, sort by year descending (latest first)
    const sorted = [...publications].sort((a, b) => b.year - a.year);
    
    // Then filter by category
    if (activeFilter === 'all') return sorted;
    return sorted.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="research" className="py-16 px-8 md:px-12 lg:px-24 section-bg min-h-screen">
      <div className="section-title">
        <h2>Research & Publications</h2>
        <p className="text-[#4b4949]">
          My research primarily focuses on Arithmetic Geometry and Number Theory. Below is a selection of my published works and current preprints, sorted chronologically.
        </p>
      </div>

      <div className="flex flex-col items-center mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 bg-white/50 backdrop-blur-sm p-1.5 rounded-xl shadow-sm border border-black/5">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveFilter(cat.id);
                  setShowNetwork(false);
                }}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeFilter === cat.id && !showNetwork ? 'bg-brand-accent text-white shadow-md' : 'text-[#272829] hover:bg-black/5'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          
          <div className="hidden md:block w-px h-6 bg-black/10 mx-1" />

          <button
            onClick={() => setShowNetwork(!showNetwork)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${showNetwork ? 'bg-brand-primary text-white shadow-md' : 'text-[#272829] hover:bg-black/5'}`}
          >
            <Network size={16} />
            <span>Co-authorship</span>
            {showNetwork ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showNetwork && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="mb-12 overflow-hidden max-w-5xl mx-auto"
          >
            <div className="bg-slate-50 p-4 rounded-2xl border border-black/5">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <CollaborationNetwork />
              </div>
            </div>
            <div className="mt-8 mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-black/5" />
              <span className="text-[10px] font-bold text-[#aaa] uppercase tracking-widest">Publications Gallery Below</span>
              <div className="h-px flex-1 bg-black/5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        <ol className="space-y-6">
          <AnimatePresence mode="popLayout">
            {sortedAndFilteredPublications.map((pub, index) => (
              <motion.li
                layout
                key={pub.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex gap-4 group"
              >
                <div className="flex-shrink-0 flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-xs font-bold text-brand-primary bg-white shadow-sm ring-4 ring-[#f2f5f9]">
                    {index + 1}
                  </span>
                  <div className="w-px h-full bg-black/5 mt-2 hidden group-last:block" />
                </div>

                <div className="flex-1 pb-4 border-b border-black/5 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] uppercase font-black tracking-widest px-1.5 py-0.5 rounded ${
                      pub.category === 'journal' ? 'bg-blue-100 text-blue-700' : 
                      pub.category === 'preprint' ? 'bg-amber-100 text-amber-700' : 
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {pub.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#999] font-medium">
                      <Calendar size={12} />
                      {pub.year}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-brand-primary mb-1 group-hover:text-brand-accent transition-colors leading-snug">
                    {pub.title}
                  </h3>
                  
                  <p className="text-sm text-[#4b4949] mb-1">
                    {pub.authors.split(', ').map((author, index) => (
                      <span key={index}>
                        {author === 'D. Patel' ? <strong className="text-brand-primary underline decoration-brand-accent/30 underline-offset-2">D. Patel</strong> : author}
                        {index < pub.authors.split(', ').length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                    <p className="text-xs italic text-[#777] flex items-center gap-1.5">
                      <BookOpen size={14} className="text-brand-accent" />
                      {pub.journal}
                    </p>

                    <div className="flex items-center gap-2">
                      {pub.link && (
                        <a 
                          href={pub.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs font-bold text-brand-accent hover:underline decoration-brand-accent transition-all"
                        >
                          <FileText size={14} />
                          View PDF
                        </a>
                      )}
                      <a 
                        href="#" 
                        className="text-[#ccc] hover:text-brand-accent transition-all"
                        title="Citation Metadata"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
        
        {sortedAndFilteredPublications.length === 0 && (
          <div className="text-center py-12 text-[#999]">
            No publications found in this category.
          </div>
        )}
      </div>
    </section>
  );
}

