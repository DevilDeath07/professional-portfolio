import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { database } from '../firebase';
import { ref, onValue, remove } from 'firebase/database';
import { Mail, Clock, Trash2, User, KeyRound } from 'lucide-react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Protect the route with a simple password
  // (In a real production app you'd use Firebase Authentication instead!)
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock admin password
      setIsAuthenticated(true);
    } else {
      alert("Incorrect admin password.");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const messagesRef = ref(database, 'contacts');
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array and sort by newest first
        const messagesList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setMessages(messagesList);
      } else {
        setMessages([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      const messageRef = ref(database, `contacts/${id}`);
      remove(messageRef).catch(error => {
         console.error("Error deleting message:", error);
         alert("Failed to delete message. Check console or firebase rules.");
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="page-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          className="glass-panel" 
          style={{ padding: '3rem', borderRadius: 'var(--border-radius-lg)', maxWidth: '400px', width: '100%', textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div style={{ display: 'inline-flex', padding: '15px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-color)', marginBottom: '1.5rem' }}>
            <KeyRound size={40} />
          </div>
          <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', fontWeight: 800 }}>Admin Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '15px', borderRadius: '10px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', outline: 'none' }}
              required
            />
            <button type="submit" className="btn-primary" style={{ padding: '15px', borderRadius: '10px', fontSize: '1.1rem', marginTop: '1rem' }}>
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-section" style={{ position: 'relative', minHeight: '100vh' }}>
      
      {/* Background glow effects */}
      <div className="glow-background" style={{ top: '10%', right: '10%', opacity: 0.2 }}></div>

      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admin <span className="gradient-text">Messages</span>
      </motion.h2>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>You have <strong style={{ color: 'var(--accent-color)' }}>{messages.length}</strong> total messages.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', borderRadius: 'var(--border-radius-lg)', color: 'var(--text-secondary)' }}>
            <Mail size={40} style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <h3>No messages yet</h3>
            <p>Your inbox is empty. When users submit the contact form, they will appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-panel"
                  style={{ padding: '2rem', borderRadius: 'var(--border-radius-lg)', position: 'relative', borderLeft: '4px solid var(--accent-color)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                        <User size={18} color="var(--accent-color)"/> {msg.name}
                      </div>
                      <a href={`mailto:${msg.email}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem', background: 'rgba(255,255,255,0.05)', padding: '5px 12px', borderRadius: '50px' }}>
                        <Mail size={14} /> {msg.email}
                      </a>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        <Clock size={14} /> 
                        {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'No timestamp'}
                      </div>
                      
                      <button 
                        onClick={() => handleDelete(msg.id)}
                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                        title="Delete Message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {msg.message}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
