import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, Globe } from 'lucide-react';

const mockProjects = [
 { 
  id: 11, 
  title: 'AI-Based Bug Finder', 
  desc: 'AI-powered web application that analyzes user-submitted code and provides real-time debugging suggestions. Detects syntax and logical errors using Firebase backend and AI APIs.', 
  image: './data/Screenshot 2026-04-19 222545.png', 
  tech: ['HTML', 'CSS', 'JavaScript','Python', 'Firebase', 'FastAPI', 'AI APIs'],
  code: "https://github.com/DevilDeath07/Bug-finder-agent",
  demo: 'https://bug-finder-agent.vercel.app/'
},
  { 
    id: 10, 
    title: 'MERN Stack Portfolio', 
    desc: 'A high-end React-based portfolio featuring smooth animations, component-driven UI, and an integrated AI chatbot via Flowise.', 
    image: 'https://balasportfolio.vercel.app/uploads/1767535823320-Screenshot%202026-01-04%20182344.png', 
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Flowise AI'],
    code: 'https://github.com/DevilDeath07/Frontend-portfolio',
    demo: 'https://balamuruganportfolio.vercel.app/'
  },
  { 
    id: 1, 
    title: 'Fire-API', 
    desc: 'A lightweight REST API used for basic CRUD operations and as a backend for web applications.', 
    image: 'https://balasportfolio.vercel.app/uploads/1767518396179-1766505978140-Screenshot%202025-12-23%20213435.png', 
    tech: ['Node.js', 'Express.js', 'MongoDB', 'REST API'],
    code: 'https://github.com/DevilDeath07/fire-api',
    demo: 'https://fire-api-apus.onrender.com/api/crackers/'
  },
  { 
    id: 9, 
    title: 'Responsive API Web App', 
    desc: 'A web application that fetches and displays dynamic data from external APIs seamlessly.', 
    image: 'https://balasportfolio.vercel.app/uploads/1767519983950-Screenshot%202026-01-04%20151425.png', 
    tech: ['HTML5', 'CSS3', 'jQuery', 'AJAX', 'API'],
    code: 'https://github.com/DevilDeath07/responsive-web-development/tree/main/integratig%20API/code',
    demo: 'https://integratingapi.vercel.app/'
  },
  { 
    id: 8, 
    title: 'Interactive Web App with jQuery', 
    desc: 'An interactive web app using jQuery to integrate with external APIs for dynamic experiences.', 
    image: 'https://balasportfolio.vercel.app/uploads/1767519783581-Screenshot%202026-01-04%20151127.png', 
    tech: ['HTML5', 'CSS3', 'jQuery', 'AJAX'],
    code: 'https://github.com/DevilDeath07/responsive-web-development/tree/main/jQuery%20%26%20API/project',
    demo: 'https://j-querypage.vercel.app/'
  },
  { 
    id: 7, 
    title: 'Responsive Bootstrap Web Page', 
    desc: 'A modern web layout built using Bootstrap for true cross-device compatibility and responsiveness.', 
    image: 'https://balasportfolio.vercel.app/uploads/1767519555015-Screenshot%202026-01-04%20150805.png', 
    tech: ['HTML', 'CSS', 'Bootstrap'],
    code: 'https://github.com/DevilDeath07/responsive-web-development/tree/main/responsive_bootstrap_page',
    demo: 'https://responsivepage-ruddy.vercel.app/'
  },
  { 
    id: 4, 
    title: 'Secure Login System', 
    desc: 'Authentication module handling secure login and storing user data within a relational database.', 
    image: 'https://balasportfolio.vercel.app/uploads/1767518883168-1766505316116-Screenshot%202025-12-23%20212500.png', 
    tech: ['Java Servlets', 'MySQL', 'XAMPP'],
    code: 'https://github.com/DevilDeath07/program',
    demo: null
  },
  { 
    id: 2, 
    title: 'Personal Portfolio Website', 
    desc: 'A responsive website designed to showcase professional profiles, technical skills, and projects.', 
    image: 'https://balasportfolio.vercel.app/uploads/1767518659027-1766505002787-Screenshot%202025-12-23%20211933.png', 
    tech: ['HTML', 'CSS', 'JavaScript'],
    code: 'https://github.com/DevilDeath07/portfolio',
    demo: 'https://my-website-60037976973.development.catalystserverless.in/app/index.html'
  },
  { 
    id: 6, 
    title: 'IOT Projects', 
    desc: 'Real-time embedded sensor monitoring and data visualization project utilizing microcontrollers.', 
    image: 'https://balasportfolio.vercel.app/uploads/1767519180935-Screenshot%202026-01-04%20150105.png', 
    tech: ['C++', 'IoT', 'Hardware'],
    code: 'https://github.com/DevilDeath07/IOT-project',
    demo: null
  },
  { 
    id: 5, 
    title: 'Tic-Tac-Toe Game', 
    desc: 'A classic console-based 2-player logic game built utilizing raw C programming.', 
    image: 'https://balasportfolio.vercel.app/uploads/1767518984520-1766505450724-173621686-336db59f-045d-45fa-8ef7-6b7affa3d457.png', 
    tech: ['C Programming'],
    code: 'https://github.com/DevilDeath07/tick-tac-toe/tree/main/tic-tak-toe',
    demo: null
  },
  { 
    id: 3, 
    title: 'Simple Web Calculator', 
    desc: 'A basic DOM-based calculator designed for arithmetic layout handling and javascript logic.', 
    image: 'https://balasportfolio.vercel.app/uploads/1767518810300-1766505148261-Screenshot%202025-12-23%20212052.png', 
    tech: ['HTML', 'CSS', 'JavaScript'],
    code: 'https://github.com/DevilDeath07/project/tree/main/calculator%20project',
    demo: 'https://6804af3994fa97a522daa9d3--friendly-jalebi-5c1cfe.netlify.app/'
  }
];

const Projects = () => {
  const [projects] = useState(mockProjects);
  const [hoveredId, setHoveredId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="page-section" style={{ position: 'relative' }}>
      
      {/* Background glow effects */}
      <div className="glow-background" style={{ top: '10%', left: '-5%', opacity: 0.4 }}></div>
      <div className="glow-background" style={{ bottom: '10%', right: '-5%', opacity: 0.3, animationDelay: '3s' }}></div>

      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Featured <span className="gradient-text">Projects</span>
      </motion.h2>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))', gap: 'clamp(1.5rem, 3vw, 3rem)' }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="glass-panel"
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRadius: 'var(--border-radius-lg)', position: 'relative', border: '1px solid var(--glass-border)', transition: 'all 0.4s ease' }}
              whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(0,0,0,0.5)', borderColor: 'var(--accent-color)' }}
            >
              {/* Image Container */}
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <motion.div 
                  animate={{ scale: hoveredId === project.id ? 1.1 : 1 }}
                  transition={{ duration: 0.6 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </motion.div>
                
                {/* Image Overlay */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
                ></motion.div>
              </div>

              {/* Content Container */}
              <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', flexGrow: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', fontWeight: 700, letterSpacing: '-0.5px' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 1, lineHeight: 1.7 }}>{project.desc}</p>
                
                {/* Tech Stack */}
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                  {project.tech.map(t => (
                    <span key={t} style={{ fontSize: '0.8rem', padding: '6px 14px', borderRadius: '50px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-color)', fontWeight: 600, border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                
                {/* Action Links */}
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                  {project.code && (
                    <motion.a 
                      href={project.code}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ color: 'var(--accent-color)', x: 3 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}
                    >
                      <Github size={20} /> Source Code
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a 
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ color: 'var(--accent-color)', x: 3 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}
                    >
                      <Globe size={20} /> Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
