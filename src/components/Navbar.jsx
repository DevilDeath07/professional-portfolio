import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
      zIndex: 1000,
      transition: 'var(--transition)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%'
      }}>
        {/* Logo */}
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Code2 size={32} color="var(--accent-color)" />
          <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Bala.Dev</span>
        </NavLink>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-menu">
          {window.innerWidth > 768 && navLinks.map(link => (
            <NavLink 
              key={link.name} 
              to={link.path}
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent-color)' : 'var(--text-primary)',
                fontWeight: isActive ? 700 : 500,
                position: 'relative'
              })}
            >
              {link.name}
            </NavLink>
          ))}
          <button 
            onClick={toggleTheme} 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: window.innerWidth <= 768 ? 'block' : 'none' }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '80px',
              left: 0,
              right: 0,
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--glass-border)',
              padding: '2rem 5%',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            {navLinks.map(link => (
              <NavLink 
                key={link.name} 
                to={link.path}
                onClick={closeMenu}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--accent-color)' : 'var(--text-primary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '1.2rem'
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
