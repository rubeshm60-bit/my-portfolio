
import { ExternalLink, GitBranch } from 'lucide-react';
import { motion } from 'framer-motion'; // Idhai add pannunga

export default function Projects() {
  const projects = [
    {
      title: "Synthetix AI Dashboard",
      category: "Full-Stack / AI",
      image: "/project1.png",
      description: "A real-time hyperrealistic monitoring dashboard tracking decentralized AI agents. Built with React, WebGL, Node.js, and Vector search database integrations.",
      link: "#",
      github: "#",
      heightClass: "h-80 md:h-[420px]"
    },
    {
      title: "Quantum 3D Configurator",
      category: "Creative 3D Design",
      image: "/project2.png",
      description: "Interactive e-commerce product customizer leveraging WebGL and custom fragment shaders, rendering assets in hyperrealistic detail with real-time physics.",
      link: "#",
      github: "#",
      heightClass: "h-64 md:h-[320px]"
    },
    {
      title: "OmniLedger Crypto System",
      category: "MERN Stack / Web3",
      image: "/project3.png",
      description: "A robust cryptocurrency trading system offering simulated portfolios, analytics, and responsive ledger tracking. Connected with MongoDB and Express.",
      link: "#",
      github: "#",
      heightClass: "h-72 md:h-[380px]"
    }
  ];

  return (
    <section id="projects" className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-neutral-950">
      {/* Subtle layout glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary-400 font-semibold mb-3">SHOWCASE</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-500 bg-clip-text text-transparent">
            Selected Masterpieces
          </h2>
        </motion.div>

        {/* Masonry Columns Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="break-inside-avoid w-full block group"
            >
              <div className="glass border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/20 hover:border-primary-500/30 transition-all duration-500">
                {/* Image Wrap */}
                <div className={`relative w-full ${project.heightClass} overflow-hidden`}>
                  {/* Image mask reveal effect on hover */}
                  <div className="absolute inset-0 bg-neutral-950/45 group-hover:bg-neutral-950/20 transition-colors duration-500 z-10" />
                  
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      // fallback back to a high-quality styling if image loading fails locally
                      e.target.style.display = 'none';
                    }}
                  />
                  
                  {/* Floating tags */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full bg-neutral-950/80 border border-white/10 text-primary-300">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center border-t border-neutral-800/60 pt-4">
                    <div className="flex gap-4">
                      <a href={project.github} className="text-neutral-400 hover:text-white transition-colors">
                        <GitBranch className="w-4 h-4" />
                      </a>
                      <a href={project.link} className="text-neutral-400 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Project &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
