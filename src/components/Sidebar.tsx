import { motion } from 'motion/react';
import { Network, GraduationCap, Fingerprint, Linkedin, Home, User, FileText, BookOpen, Mail, Users, Presentation } from 'lucide-react';
import { profile } from '../data/profile';
import { students } from '../data/students';

const baseNavItems = [
  { id: 'home', icon: User, label: 'Profile' },
  { id: 'research', icon: BookOpen, label: 'Research' },
  { id: 'conferences', icon: Presentation, label: 'Conferences' },
  { id: 'teaching', icon: GraduationCap, label: 'Teaching' },
];

const mentorshipItem = students.length > 0 
  ? [{ id: 'mentorship', icon: Users, label: 'Mentorship' }] 
  : [];

const finalNavItems = [
  ...baseNavItems,
  ...mentorshipItem,
  { id: 'resume', icon: FileText, label: 'Resume' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

const socialLinks = [
  { logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Scholar_logo.svg", href: profile.socials.scholar, label: "Google Scholar" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/ResearchGate_icon_SVG.svg", href: profile.socials.researchgate, label: "ResearchGate" },
  { logo: "https://upload.wikimedia.org/wikipedia/commons/0/06/ORCID_iD.svg", href: profile.socials.orcid, label: "ORCID" },
  { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
];

export default function Sidebar({ 
  activeSection, 
  isOpen, 
  setIsOpen,
  onNavigate
}: { 
  activeSection: string; 
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onNavigate: (id: string) => void;
}) {
  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <header className={`fixed left-0 top-0 h-full w-[300px] bg-sidebar-bg flex flex-col z-[999] transition-all duration-300 overflow-y-auto overflow-x-hidden p-8 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="flex flex-col items-center">
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-8 border-white/5 mb-4 group ring-2 ring-brand-accent/20">
          <img 
            src={profile.sidebarImage} 
            alt={profile.fullName} 
            className="w-full h-full object-cover transition-all duration-500"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop";
            }}
          />
        </div>
        <h1 className="text-2xl font-bold text-white font-heading m-0 text-center tracking-tight">
          {profile.fullName}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {socialLinks.map((social, i) => {
            return (
              <a 
                key={i} 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-brand-accent hover:scale-110 transition-all duration-300 overflow-hidden p-1.5 shadow-sm"
              >
                {social.logo ? (
                  <img src={social.logo} alt={social.label} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <social.icon size={18} className="text-sidebar-bg" />
                )}
              </a>
            );
          })}
        </div>
      </div>

      <nav className="mt-8 flex-1">
        <ul className="flex flex-col gap-4 list-none p-0 m-0">
          {finalNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigate(item.id)}
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

      <div className="mt-auto pt-8 border-t border-white/5">
        <p className="text-[9px] text-sidebar-bg uppercase tracking-[0.2em] font-medium">
          &copy; {new Date().getFullYear()} {[68, 104, 105, 114, 97, 106, 32, 80, 97, 116, 101, 108].map(c => String.fromCharCode(c)).join('')}
        </p>
      </div>
    </header>
  );
}
