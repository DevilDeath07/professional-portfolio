import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Award, Target } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const icons = [<BookOpen size={30} color="var(--accent-color)" />, <Target size={30} color="var(--accent-color)" />, <Award size={30} color="var(--accent-color)" />, <Trophy size={30} color="var(--accent-color)" />];

  return (
    <div className="page-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        About <span className="gradient-text">Me</span>
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left Side: Animated Image or Shape */}
        <motion.div 
          className="glass-panel"
          style={{ padding: '3rem', height: '100%', position: 'relative', overflow: 'hidden', borderLeft: '4px solid var(--accent-color)' }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="glow-background" style={{ top: '-10%', right: '-10%', opacity: 0.5 }}></div>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>My Story.</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
            Hello! I am an IT student based in Aruppukkottai, currently pursuing my B.Tech at AAA College of Engineering and Technology.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
            My focus lies in full-stack development, UX design, and exploring and researching new technologies. I love combining technical capabilities with creative design to build engaging applications.
          </p>
        </motion.div>

        {/* Right Side: Quick Facts / Stats Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
        >
          {[
            { title: 'Education', value: 'B.Tech IT' },
            { title: 'Projects', value: '7+ Built' },
            { title: 'Certifications', value: '10+ Earned' },
            { title: 'Internships', value: '1+ Completed' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="glass-panel"
              style={{ padding: '2rem', textAlign: 'center', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
              whileHover={{ scale: 1.05, translateY: -5, boxShadow: '0 10px 30px rgba(99, 102, 241, 0.2)' }}
            >
              <div style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '50%', marginBottom: '0.5rem' }}>
                {icons[i]}
              </div>
              <h4 className="gradient-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stat.value}</h4>
              <p style={{ color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default About;
