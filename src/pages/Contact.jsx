import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { database } from '../firebase';
import { ref, push, set } from 'firebase/database';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Attempting genuine firebase push, but fallback cleanly
    const contactRef = ref(database, 'contacts');
    const newContactRef = push(contactRef);
    
    const payload = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    set(newContactRef, payload)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 4000);
      })
      .catch((error) => {
        console.error("Firebase error:", error);
        setStatus('error');
        // Do not clear the form data so they don't lose their message.
        setTimeout(() => setStatus(null), 4000);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle = {
    padding: '16px', 
    borderRadius: '12px', 
    background: 'var(--bg-primary)', 
    border: '1px solid var(--glass-border)', 
    color: 'var(--text-primary)', 
    outline: 'none', 
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontFamily: 'inherit'
  };

  return (
    <div className="page-section" style={{ position: 'relative' }}>
      <div className="glow-background" style={{ bottom: '10%', right: '10%', opacity: 0.3 }}></div>

      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Get in <span className="gradient-text">Touch</span>
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'flex-start' }}>
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ position: 'sticky', top: '100px' }}
        >
          <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Let's talk about your <span style={{ color: 'var(--accent-color)' }}>project.</span></h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
            Feel free to reach out for collaborations, project inquiries, or simply to say hello. I'm always open to discussing new opportunities and bringing architectures to life.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              { icon: <Mail size={24} />, title: 'Email', value: 'balamurugankumar880@gmail.com', link: 'mailto:balamurugankumar880@gmail.com' },
              { icon: <MapPin size={24} />, title: 'Location', value: 'Aruppukkottai, Tamil Nadu, India', link: '#' },
              { icon: <Phone size={24} />, title: 'Phone', value: '+91 9500334590', link: 'tel:+919500334590' }
            ].map((contact, i) => (
              <motion.a 
                href={contact.link}
                key={i}
                whileHover={{ x: 10 }}
                style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', textDecoration: 'none' }}
              >
                <motion.div 
                  whileHover={{ rotate: 360, backgroundColor: 'var(--accent-color)', color: '#fff' }}
                  transition={{ duration: 0.5 }}
                  className="glass-panel" 
                  style={{ padding: '16px', borderRadius: '50%', color: 'var(--accent-color)', display: 'flex', border: '1px solid var(--glass-border)' }}
                >
                  {contact.icon}
                </motion.div>
                <div>
                  <h4 style={{ marginBottom: '0.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>{contact.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}>{contact.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="glass-panel"
          style={{ padding: '3.5rem', borderRadius: 'var(--border-radius-lg)', position: 'relative', overflow: 'hidden' }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent-gradient)' }}></div>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr)', gap: '2rem' }}>
              <motion.div whileFocus={{ scale: 1.01 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="name" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle} 
                  required 
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                />
              </motion.div>
              
              <motion.div whileFocus={{ scale: 1.01 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="email" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle} 
                  required 
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                />
              </motion.div>
            </div>

            <motion.div whileFocus={{ scale: 1.01 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="message" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="6"
                value={formData.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: 'vertical' }} 
                required 
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
              ></textarea>
            </motion.div>

            <motion.button 
              type="submit" 
              className="btn-primary" 
              style={{ padding: '16px', fontSize: '1.1rem', borderRadius: '12px' }}
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message <Send size={20} />
            </motion.button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ padding: '16px', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderRadius: '12px', textAlign: 'center', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', border: '1px solid rgba(34, 197, 94, 0.2)' }}
                >
                  <CheckCircle2 size={20} /> Message Sent Successfully!
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '12px', textAlign: 'center', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                >
                  <MapPin size={20} /> Failed to send. Please check your Firebase Rules!
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
