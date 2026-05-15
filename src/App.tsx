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
import Conferences from './components/Conferences';
import Contact from './components/Contact';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionNames: Record<string, string> = {
      home: 'Profile',
      research: 'Research',
      teaching: 'Teaching',
      conferences: 'Conferences',
      mentorship: 'Mentorship',
      resume: 'Resume',
      contact: 'Contact'
    };
    const currentName = sectionNames[activeSection] || 'Home';
    document.title = `Dhiraj Patel - ${currentName}`;
  }, [activeSection]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
      case 'about':
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Home />
            <About />
          </motion.div>
        );
      case 'research':
        return (
          <motion.div
            key="research"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Research />
          </motion.div>
        );
      case 'conferences':
        return (
          <motion.div
            key="conferences"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Conferences />
          </motion.div>
        );
      case 'teaching':
        return (
          <motion.div
            key="teaching"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Teaching />
          </motion.div>
        );
      case 'mentorship':
        return (
          <motion.div
            key="mentorship"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Mentorship />
          </motion.div>
        );
      case 'resume':
        return (
          <motion.div
            key="resume"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Resume />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Contact />
          </motion.div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex bg-brand-bg relative overflow-x-hidden min-h-screen">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-[1000] w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center lg:hidden shadow-lg"
      >
        <span className="text-xl">{sidebarOpen ? '✕' : '☰'}</span>
      </button>

      <Sidebar 
        activeSection={activeSection} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        onNavigate={setActiveSection}
      />
      
      <main className={`flex-1 min-w-0 transition-all duration-300 ${sidebarOpen ? 'opacity-50 blur-sm overflow-hidden' : ''} lg:ml-[300px] bg-white min-h-screen`}>
        <div className="w-full">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

