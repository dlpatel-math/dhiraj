import { motion } from 'motion/react';
import { Home, User, FileText, BookOpen, GraduationCap, Mail, Github, Linkedin, Twitter } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'research', icon: BookOpen, label: 'Research' },
  { id: 'resume', icon: FileText, label: 'Resume' },
  { id: 'skills', icon: GraduationCap, label: 'Teaching' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

const socialLinks = [
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Github, href: "#" },
];

export default function Sidebar({ 
  activeSection, 
  isOpen, 
  setIsOpen 
}: { 
  activeSection: string; 
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className={`fixed left-0 top-0 h-full w-[300px] bg-sidebar-bg flex flex-col z-[999] transition-all duration-300 overflow-y-auto overflow-x-hidden p-8 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex flex-col items-center">
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-8 border-white/5 mb-4 group">
          <img 
            src="./data/Image/profile.svg" 
            alt="Dhiraj Patel" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-2xl font-bold text-white font-heading m-0 text-center">
          Dhiraj Patel
        </h1>
        
        <div className="flex gap-2 mt-4">
          {socialLinks.map((social, i) => {
            const Icon = social.icon;
            return (
              <a 
                key={i} 
                href={social.href}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-accent transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>

      <nav className="mt-8 flex-1">
        <ul className="flex flex-col gap-4 list-none p-0 m-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-4 py-2 group transition-colors duration-300 w-full text-left ${isActive ? 'text-brand-accent' : 'text-white/60 hover:text-white'}`}
                >
                  <Icon 
                    size={24} 
                    className={`transition-colors duration-300 ${isActive ? 'text-brand-accent' : 'text-white/60 group-hover:text-brand-accent'}`} 
                  />
                  <span className="text-sm font-medium tracking-wide">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

    </header>
  );
}
