import React from 'react';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function ContactFooter() {
  return (
    <footer className="relative w-full border-t border-neutral-900 bg-neutral-950/90 py-16 px-6 md:px-12 overflow-hidden">
      {/* Background glow spot */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-white">Rubesh M</h2>
          <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
            Building the next generation of 3D, full-stack, and intelligent web applications. Available for freelance opportunities, full-time roles, and consulting.
          </p>
        </div>

        {/* Contact details */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-2">Connect</h3>
          
          <a 
            href="mailto:rubeshm60@gmail.com" 
            className="flex items-center gap-3 text-neutral-400 hover:text-primary-300 transition-colors text-sm font-light group"
          >
            <span className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 group-hover:border-primary-500/30 transition-colors">
              <Mail className="w-4 h-4 text-primary-400" />
            </span>
            rubeshm60@gmail.com
          </a>

          <a 
            href="tel:+919095749906" 
            className="flex items-center gap-3 text-neutral-400 hover:text-primary-300 transition-colors text-sm font-light group"
          >
            <span className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 group-hover:border-primary-500/30 transition-colors">
              <Phone className="w-4 h-4 text-primary-400" />
            </span>
            +91 9095749906
          </a>

          <div className="flex items-center gap-3 text-neutral-400 text-sm font-light">
            <span className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800">
              <MapPin className="w-4 h-4 text-primary-400" />
            </span>
            India
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 border-t border-neutral-900/60 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-light">
        <p>&copy; {new Date().getFullYear()} Rubesh M. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Designed & crafted with <Heart className="w-3.5 h-3.5 text-primary-500 fill-primary-500" /> by Antigravity
        </p>
      </div>
    </footer>
  );
}
