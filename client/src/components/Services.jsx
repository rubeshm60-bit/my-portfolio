import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, LayoutTemplate } from 'lucide-react';

function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Normalize and scale values (-15 to 15 degrees max)
    const rX = -(mouseY / (height / 2)) * 10;
    const rY = (mouseX / (width / 2)) * 10;
    
    setRotateX(rX);
    setRotateY(rY);
    setScale(1.02);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out',
      }}
      className={`glass rounded-2xl p-8 cursor-pointer relative overflow-hidden group select-none ${className}`}
    >
      {/* Glow gradient spotlight following mouse position if wanted, or subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </div>
  );
}

export default function Services() {
  const services = [
    {
      icon: <Code className="w-10 h-10 text-primary-400 mb-6" />,
      title: "Full-Stack Development",
      description: "Building production-grade, highly scalable web architectures using the MERN stack (MongoDB, Express, React, Node.js) with clean, maintainable patterns."
    },
    {
      icon: <Brain className="w-10 h-10 text-primary-400 mb-6" />,
      title: "AI Integration",
      description: "Infusing intelligent features into applications, ranging from conversational AI models and vector DB searching to agentic workflows."
    },
    {
      icon: <LayoutTemplate className="w-10 h-10 text-primary-400 mb-6" />,
      title: "3D & Creative Design",
      description: "Creating highly interactive 3D frontend architectures using WebGL, React Three Fiber, and custom GLSL shaders to captivate audiences."
    }
  ];

  return (
    <section id="services" className="relative w-full min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center bg-neutral-950/80">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary-400 font-semibold mb-3">EXPERTISE</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-500 bg-clip-text text-transparent">
            Premium Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <TiltCard className="h-full flex flex-col items-start border-neutral-800 bg-neutral-900/40 hover:border-primary-500/30 transition-all duration-300">
                {service.icon}
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">
                  {service.description}
                </p>
                <div className="w-8 h-1 bg-primary-500/30 mt-6 group-hover:w-full transition-all duration-300" />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
