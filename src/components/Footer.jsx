import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--glass-border)',
      padding: '5rem 5% 2rem',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow */}
      <div className="glow-background" style={{ bottom: '0', right: '0', opacity: 0.2, width: '400px', height: '400px' }}></div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Main Footer Content - Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <h2 className="gradient-text" style={{ fontSize: '2.4rem', margin: 0, fontWeight: 800, letterSpacing: '-1px' }}>
              Balamurugan
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '300px' }}>
              Crafting premium, responsive, and innovative web experiences using modern technologies and agile methodologies. Let's build the future together.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Home', 'About', 'Skills', 'Projects', 'Experience'].map((item) => (
                <Link 
                  key={item} 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', width: 'fit-content', fontWeight: 500 }}
                  onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-color)'; e.currentTarget.style.transform = 'translateX(8px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Get In Touch</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-secondary)' }}>
              <a href="mailto:balamurugankumar880@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'inherit', textDecoration: 'none', transition: 'color 0.3s', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}><Mail size={16} /></div> 
                <span style={{ wordBreak: 'break-all' }}>balamurugankumar880@gmail.com</span>
              </a>
              <a href="tel:+919500334590" style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'inherit', textDecoration: 'none', transition: 'color 0.3s', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}><Phone size={16} /></div> 
                +91 9500334590
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 500 }}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}><MapPin size={16} /></div> 
                Aruppukkottai, Tamil Nadu
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar: Socials & Copyright */}
        <motion.div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[
              { icon: <Github size={20} />, url: 'https://github.com/DevilDeath07' },
              { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/balamurugan-v-16471828b/' },
              { icon: <Instagram size={20} />, url: 'https://www.instagram.com/conquiror_of_death/' }
            ].map((item, index) => (
              <motion.a 
                key={index}
                href={item.url} 
                target="_blank" 
                rel="noreferrer" 
                className="glass-panel" 
                style={{ 
                  padding: '12px', 
                  display: 'flex', 
                  borderRadius: '12px', 
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  background: 'rgba(255, 255, 255, 0.03)'
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  borderColor: 'var(--accent-color)',
                  color: 'var(--accent-color)',
                  boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>

          <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500, textAlign: 'center' }}>
            &copy; {new Date().getFullYear()} Balamurugan. All rights reserved.
          </div>
        </motion.div>
        
      </div>
    </footer>
  );
};

export default Footer;
