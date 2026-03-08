import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail, Code2, Database } from 'lucide-react';

const Home = () => {
  // Staggered animation wrapper
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="page-section" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', position: 'relative' }}>
      {/* Background glow effects */}
      <div className="glow-background" style={{ top: '10%', left: '-10%' }}></div>
      <div className="glow-background" style={{ bottom: '10%', right: '-10%', animationDelay: '2s' }}></div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', width: '100%', alignItems: 'center' }}>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ zIndex: 2 }}
        >
          <motion.div variants={itemVariants}>
            <span style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-block' }}>
              Hello World, I am
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', margin: '0.5rem 0 1.5rem', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            Balamurugan <br />
            <span className="gradient-text">Full Stack Dev.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '500px', lineHeight: 1.8 }}>
            I am an IT Student & Programmer dedicated to building scalable web applications and conducting innovative research. Let's create something extraordinary.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/projects" className="btn-primary" style={{ textDecoration: 'none', display: 'flex' }}>
                View My Work <ArrowRight size={20} />
              </Link>
            </motion.div>
            <motion.a 
              href="/resume.pdf" 
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV <Download size={20} />
            </motion.a>
          </motion.div>

          {/* Social Links under buttons */}
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Connect</span>
            <div style={{ height: '1px', width: '40px', background: 'var(--glass-border)' }}></div>
            <a href="https://github.com/DevilDeath07" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><motion.div whileHover={{ y: -3, color: 'var(--accent-color)' }}><Github size={24} /></motion.div></a>
            <a href="https://www.linkedin.com/in/balamurugan-v-16471828b/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)' }}><motion.div whileHover={{ y: -3, color: 'var(--accent-color)' }}><Linkedin size={24} /></motion.div></a>
            <a href="mailto:balamurugankumar880@gmail.com" style={{ color: 'var(--text-primary)' }}><motion.div whileHover={{ y: -3, color: 'var(--accent-color)' }}><Mail size={24} /></motion.div></a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* Pulsing ring behind the image */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="glass-panel" 
            style={{ width: '100%', maxWidth: '380px', aspectRatio: '1/1', borderRadius: '50%', background: 'var(--accent-gradient)', position: 'absolute', zIndex: 0 }}
          ></motion.div>
          
          <img 
            className="animate-float"
            src="/profile.png" 
            alt="Balamurugan Profile" 
            style={{ width: '100%', maxWidth: '350px', aspectRatio: '1/1', borderRadius: '50%', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', position: 'relative', zIndex: 1, border: '4px solid var(--accent-color)', objectFit: 'cover' }} 
          />

          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="glass-panel" 
            style={{ position: 'absolute', top: '10%', right: '5%', zIndex: 2, padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '50px', backdropFilter: 'blur(20px)' }}
          >
            <Code2 size={24} color="#61dafb" />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Frontend</span>
          </motion.div>

          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="glass-panel" 
            style={{ position: 'absolute', bottom: '15%', left: '5%', zIndex: 2, padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '50px', backdropFilter: 'blur(20px)' }}
          >
            <Database size={24} color="#4db33d" />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Backend</span>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Home;
