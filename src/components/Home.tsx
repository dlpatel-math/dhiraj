import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { profile } from '../data/profile';

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = profile.roles[roleIndex];
      const speed = isDeleting ? 75 : 150;
      
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % profile.roles.length);
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + (isDeleting ? -1 : 1)));
      }
      
      setTypingSpeed(speed);
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section id="home" className="w-full h-[60vh] relative flex flex-col justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url("${profile.homeBackground}")` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-white text-4xl md:text-6xl font-bold font-heading mb-4">
            {profile.fullName}
          </h1>
          <p className="text-white text-xl md:text-3xl font-heading mb-8">
            I'm <span className="border-b-4 border-brand-accent pb-1">{displayText}</span><span className="animate-pulse">|</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
