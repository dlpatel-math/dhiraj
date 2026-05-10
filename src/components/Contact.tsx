import { motion } from 'motion/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { profile } from '../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="py-16 px-8 md:px-12 lg:px-24">
      <div className="section-title">
        <h2>Contact</h2>
        <p className="text-[#4b4949]">
          For research collaborations, teaching opportunities, or queries regarding my publications, please feel free to reach out through any of the following channels or the contact form below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-8 mt-8">
        <div className="flex flex-col gap-8">
          <div className="bg-white p-8 shadow-md rounded-lg flex gap-4 items-start group">
            <div className="w-11 h-11 rounded-full bg-[#dce8f8] text-brand-accent flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-brand-primary mb-1">Office:</h4>
              <p className="text-sm text-[#4b4949] leading-relaxed">
                {profile.address}<br />
                {profile.office}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 shadow-md rounded-lg flex gap-4 items-start group">
            <div className="w-11 h-11 rounded-full bg-[#dce8f8] text-brand-accent flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
              <Mail size={20} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-brand-primary mb-1">Email:</h4>
              <p className="text-sm text-[#4b4949]">{profile.email}</p>
            </div>
          </div>

          <div className="bg-white p-8 shadow-md rounded-lg flex gap-4 items-start group">
            <div className="w-11 h-11 rounded-full bg-[#dce8f8] text-brand-accent flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
              <Phone size={20} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-brand-primary mb-1">Call:</h4>
              <p className="text-sm text-[#4b4949]">{profile.phone} (Group Office)</p>
            </div>
          </div>
          
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2522.9995!2d6.0617!3d50.778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0997f6c34277b%3A0x28042407519ba5e!2sAhornstra%C3%9Fe%2055%2C%2052074%20Aachen%2C%20Germany!5e0!3m2!1sen!2sde!4v1700000000000!5m2!1sen!2sde" 
            frameBorder="0" 
            style={{ border: 0, width: '100%', height: '290px' }} 
            allowFullScreen 
            title="Office Location Map"
          />
        </div>

        <div className="bg-white p-8 shadow-md rounded-lg">
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#272829]">Your Name</label>
                <input type="text" className="border border-[#ced4da] px-3 py-2 focus:border-brand-accent outline-none transition-colors rounded" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#272829]">Your Email</label>
                <input type="email" className="border border-[#ced4da] px-3 py-2 focus:border-brand-accent outline-none transition-colors rounded" />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#272829]">Subject</label>
              <input type="text" className="border border-[#ced4da] px-3 py-2 focus:border-brand-accent outline-none transition-colors rounded" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#272829]">Message</label>
              <textarea rows={6} className="border border-[#ced4da] px-3 py-2 focus:border-brand-accent outline-none transition-colors rounded resize-none" />
            </div>
            
            <button className="bg-brand-accent text-white py-3 px-8 rounded-full hover:bg-brand-accent/90 transition-colors mx-auto font-semibold">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
