import React from 'react';
import { motion } from 'framer-motion';
import Canvas3D from './Canvas3D';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom smooth ease
      },
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* 3D Canvas Background */}
      <Canvas3D />

      {/* Vignette Overlay for Premium Cinematic Depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,rgba(10,5,20,0.8)_85%)]" />

      {/* Foreground Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="ui-overlay text-center px-4 max-w-4xl flex flex-col items-center justify-center"
      >
        <motion.p 
          variants={itemVariants}
          className="text-xs md:text-sm tracking-[0.4em] uppercase text-primary-300 font-semibold mb-4 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
        >
          Creative Developer & 3D Designer
        </motion.p>
        
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-8xl font-black tracking-tight mb-6 bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent select-none filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        >
          Rubesh M
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-sm md:text-lg text-neutral-400 max-w-xl mb-10 leading-relaxed font-light"
        >
          Crafting immersive, high-performance 3D web applications and cutting-edge user experiences at the intersection of design and technology.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a 
            href="#services" 
            className="px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 border border-primary-500/30 bg-primary-500/10 hover:bg-primary-500 hover:text-white glass-glow flex items-center gap-2"
          >
            Explore Services
          </a>
          <a 
            href="#projects" 
            className="px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-300 border border-white/10 bg-white/5 hover:bg-white/10"
          >
            View Projects
          </a>
        </motion.div>

        {/* Floating Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer pointer-events-auto"
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[10px] tracking-widest uppercase text-neutral-500">Scroll</span>
          <ArrowDown className="w-4 h-4 text-neutral-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
