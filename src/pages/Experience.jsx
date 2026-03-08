import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Calendar, Building2 } from 'lucide-react';

const mockExperience = [
  { id: 1, role: 'AI & Data Science Intern', company: 'RD INFRO TECHNOLOGY', period: 'Dec 2025 - Jan 2026', desc: 'Explored advanced AI methodologies and contributed to data science research and modeling.' },
  { id: 2, role: 'Full Stack Web Developer Intern', company: 'Business Web Solution', period: 'June 2025 - July 2025', desc: 'Developed responsive frontend interfaces and wrote robust backend APIs.' },
  { id: 3, role: 'B.Tech IT Student', company: 'AAA College', period: '2023 - 2027', desc: 'Active student, participating in Generative AI/Data Science workshops and UX competitions.' },
];

const Experience = () => {
  return (
    <div className="page-section" style={{ position: 'relative' }}>
      
      {/* Background glow effects */}
      <div className="glow-background" style={{ top: '30%', left: '-5%', opacity: 0.3 }}></div>

      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        My <span className="gradient-text">Experience</span>
      </motion.h2>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        {/* Animated Timeline line */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          style={{ position: 'absolute', left: '26px', top: '10px', bottom: '10px', width: '2px', background: 'var(--accent-gradient)', zIndex: 0, opacity: 0.5, boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)' }}
        ></motion.div>

        {mockExperience.map((exp, i) => (
          <motion.div 
            key={exp.id}
            style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 2.5rem)', marginBottom: '3rem', position: 'relative', zIndex: 1 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Timeline Icon */}
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 10, boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)' }}
              className="glass-panel" 
              style={{ width: '54px', height: '54px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', border: '2px solid var(--accent-color)', cursor: 'pointer', flexShrink: 0 }}
            >
              <Briefcase size={22} color="var(--accent-color)" />
            </motion.div>
            
            {/* Content Card */}
            <motion.div 
              whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.4)', borderColor: 'var(--accent-color)' }}
              className="glass-panel" 
              style={{ padding: 'clamp(1.2rem, 3vw, 2.5rem)', flexGrow: 1, position: 'relative', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--glass-border)', transition: 'border-color 0.3s ease' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.4rem', fontWeight: 700 }}>{exp.role}</h3>
                  <h4 style={{ color: 'var(--accent-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 size={16} /> {exp.company}
                  </h4>
                </div>
                <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: '50px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--text-secondary)' }}>
                  <Calendar size={14} /> {exp.period}
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                {exp.desc}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
