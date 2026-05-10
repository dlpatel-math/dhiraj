import { motion } from 'motion/react';
import { Network, GraduationCap, Fingerprint, Linkedin, Home, User, FileText, BookOpen, Mail, Users } from 'lucide-react';
import { profile } from '../data/profile';
import { students } from '../data/students';

const baseNavItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'research', icon: BookOpen, label: 'Research' },
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
  { icon: GraduationCap, href: profile.socials.scholar, label: "Google Scholar" },
  { icon: Network, href: "https://www.researchgate.net/profile/Dhiraj-Patel", label: "Research Gate" },
  { icon: Fingerprint, href: profile.socials.orcid, label: "ORCID" },
  { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
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
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-8 border-white/5 mb-4 group ring-2 ring-brand-accent/20">
          <img 
            src={profile.sidebarImage} 
            alt={profile.fullName} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
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
            const Icon = social.icon;
            return (
              <a 
                key={i} 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-accent hover:scale-110 transition-all duration-300"
              >
                <Icon size={16} />
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
