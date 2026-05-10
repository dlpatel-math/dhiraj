/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import About from './components/About';
import Teaching from './components/Teaching';
import Mentorship from './components/Mentorship';
import Resume from './components/Resume';
import Research from './components/Research';
import Contact from './components/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'research', 'teaching', 'mentorship', 'resume', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-brand-bg relative">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-[1000] w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center lg:hidden"
      >
        <span className="text-xl">{sidebarOpen ? '✕' : '☰'}</span>
      </button>

      <Sidebar activeSection={activeSection} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'opacity-50 blur-sm overflow-hidden' : ''} lg:ml-[300px]`}>
        <Home />
        <About />
        <Research />
        <Teaching />
        <Mentorship />
        <Resume />
        <Contact />
      </main>
    </div>
  );
}

