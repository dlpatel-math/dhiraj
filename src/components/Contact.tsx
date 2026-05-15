import React from 'react';
import { Mail, MapPin, Phone, Linkedin, GraduationCap, Network, Fingerprint } from 'lucide-react';
import { profile } from '../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="py-16 px-8 md:px-12">
      <div className="section-title">
        <h2>Contact</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
        <div className="space-y-8">
          <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-lg flex gap-4 items-start group">
            <div className="w-11 h-11 rounded-full bg-[#f0f4f8] text-brand-accent flex items-center justify-center transition-all duration-300">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#374151] mb-1">Office Address</h4>
              <p className="text-[#4b5563] leading-relaxed">
                {profile.address}<br />
                {profile.office}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-lg flex gap-4 items-start group">
            <div className="w-11 h-11 rounded-full bg-[#f0f4f8] text-brand-accent flex items-center justify-center transition-all duration-300">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#374151] mb-1">Email Address</h4>
              <p className="text-[#4b5563] break-all">
                <a href={`mailto:${profile.email}`} className="hover:text-brand-accent transition-colors">
                  {profile.email}
                </a>
              </p>
            </div>
          </div>

          {/* @ts-ignore */}
          {profile.phone && (
            <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-lg flex gap-4 items-start group">
              <div className="w-11 h-11 rounded-full bg-[#f0f4f8] text-brand-accent flex items-center justify-center transition-all duration-300">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#374151] mb-1">Phone</h4>
                {/* @ts-ignore */}
                <p className="text-[#4b5563]">{profile.phone}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 items-center pt-4">
            {profile.socials.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-brand-accent hover:border-brand-accent transition-all shadow-sm flex items-center justify-center w-12 h-12" title="LinkedIn">
                <Linkedin size={22} />
              </a>
            )}
            {profile.socials.scholar && (
              <a href={profile.socials.scholar} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white border border-gray-200 rounded-full hover:border-brand-accent transition-all shadow-sm flex items-center justify-center w-12 h-12" title="Google Scholar">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Scholar_logo.svg" alt="Google Scholar" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </a>
            )}
            {profile.socials.researchgate && (
              <a href={profile.socials.researchgate} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white border border-gray-200 rounded-full hover:border-brand-accent transition-all shadow-sm flex items-center justify-center w-12 h-12" title="ResearchGate">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/ResearchGate_icon_SVG.svg" alt="ResearchGate" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </a>
            )}
            {profile.socials.orcid && (
              <a href={profile.socials.orcid} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white border border-gray-200 rounded-full hover:border-brand-accent transition-all shadow-sm flex items-center justify-center w-12 h-12" title="ORCID">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/06/ORCID_iD.svg" alt="ORCID" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </a>
            )}
          </div>
        </div>

        <div className="h-full min-h-[400px] rounded-lg overflow-hidden shadow-md">
          <iframe 
            src={profile.mapEmbedUrl} 
            className="w-full h-full transition-all duration-500"
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            title="Office Location Map"
          />
        </div>
      </div>
    </section>
  );
}


