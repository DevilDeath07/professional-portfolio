import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/8943/8943377.png';
const USER_AVATAR = 'https://img.icons8.com/color/512/user-male-circle--v1.png';
const FLOWISE_API = 'https://cloud.flowiseai.com/api/v1/prediction/cfd71caf-bcfc-465f-8331-423adae16c08';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi there! 👋 I'm Balamurugan's AI assistant. Ask me anything about his projects, skills, or experience!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(FLOWISE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }),
      });
      const data = await res.json();
      const botText = data.text || data.answer || 'Sorry, I could not process that.';
      setMessages((prev) => [...prev, { role: 'bot', text: botText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: '⚠️ Something went wrong. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((p) => !p)}
        whileHover={{ scale: 1.1, boxShadow: '0 10px 30px rgba(99,102,241,0.6)' }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          boxShadow: '0 6px 24px rgba(99,102,241,0.45)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          overflow: 'hidden',
        }}
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: '26px', color: 'white', lineHeight: 1 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.img
              key="avatar"
              src={BOT_AVATAR}
              alt="AI Bot"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ width: '38px', height: '38px', objectFit: 'contain' }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '20px',
              width: 'min(380px, calc(100vw - 40px))',
              height: 'min(560px, calc(100vh - 130px))',
              background: 'rgba(15, 23, 42, 0.97)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(99,102,241,0.3)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
              zIndex: 9998,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flexShrink: 0,
            }}>
              <div style={{ position: 'relative' }}>
                <img src={BOT_AVATAR} alt="Bot" style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', objectFit: 'contain', background: 'white', padding: '3px' }} />
                <span style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%', border: '2px solid #4f46e5' }} />
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>Bala AI Assistant</div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem' }}>● Online — powered by Flowise</div>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(99,102,241,0.3) transparent',
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: 'flex',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                    gap: '10px',
                  }}
                >
                  <img
                    src={msg.role === 'bot' ? BOT_AVATAR : USER_AVATAR}
                    alt={msg.role}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, background: 'white', padding: msg.role === 'bot' ? '2px' : '0' }}
                  />
                  <div style={{
                    maxWidth: '72%',
                    padding: '12px 16px',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
                      : 'rgba(30,41,59,0.9)',
                    color: 'white',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    border: msg.role === 'bot' ? '1px solid rgba(99,102,241,0.2)' : 'none',
                    boxShadow: msg.role === 'user' ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
                  }}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}
                >
                  <img src={BOT_AVATAR} alt="bot" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white', padding: '2px', objectFit: 'contain' }} />
                  <div style={{
                    padding: '14px 18px',
                    borderRadius: '18px 18px 18px 4px',
                    background: 'rgba(30,41,59,0.9)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    display: 'flex',
                    gap: '6px',
                    alignItems: 'center',
                  }}>
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                        style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6366f1', display: 'block' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <div style={{
              padding: '14px 16px',
              borderTop: '1px solid rgba(99,102,241,0.2)',
              display: 'flex',
              gap: '10px',
              background: 'rgba(15,23,42,0.98)',
              flexShrink: 0,
            }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me a question..."
                disabled={loading}
                style={{
                  flex: 1,
                  background: 'rgba(30,41,59,0.8)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  color: '#f8fafc',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(99,102,241,0.7)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(99,102,241,0.25)'}
              />
              <motion.button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: input.trim() ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 'rgba(30,41,59,0.8)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                  color: 'white',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                🚀
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
