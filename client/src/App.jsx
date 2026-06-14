import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import ContactFooter from './components/ContactFooter';
import LeadModal from './components/LeadModal';

export default function App() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 selection:bg-primary-500 selection:text-white">
      {/* Immersive Scroll Sections */}
      <Hero />
      <Services />
      <Projects />
      <ContactFooter />
      
      {/* Floating Action Button & Glassmorphic Inquiry Modal */}
      <LeadModal />
    </div>
  );
}
