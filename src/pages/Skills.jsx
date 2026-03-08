import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { database } from '../firebase';
import { ref, onValue } from "firebase/database";
import { Code2, LayoutTemplate, Database, Server, Cpu, Terminal, GitBranch, BrainCircuit, Users } from 'lucide-react';

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([
    {
      id: "programming",
      title: "Programming Languages",
      icon: <Terminal size={24} />,
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 80 },
        { name: "Java", level: 70 },
        { name: "C", level: 65 },
        { name: "C++", level: 60 }
      ]
    },
    {
      id: "frontend",
      title: "Frontend Development",
      icon: <LayoutTemplate size={24} />,
      skills: [
        { name: "HTML", level: 90 },
        { name: "CSS", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "React.js", level: 75 },
        { name: "Angular", level: 60 }
      ]
    },
    {
      id: "backend",
      title: "Backend Development",
      icon: <Server size={24} />,
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Express.js", level: 75 },
        { name: "PHP", level: 65 }
      ]
    },
    {
      id: "database",
      title: "Database",
      icon: <Database size={24} />,
      skills: [
        { name: "MySQL", level: 75 },
        { name: "MongoDB", level: 70 }
      ]
    },
    {
      id: "devops",
      title: "DevOps & Tools",
      icon: <GitBranch size={24} />,
      skills: [
        { name: "Git / GitHub", level: 85 },
        { name: "n8n", level: 75 },
        { name: "Flowise", level: 70 },
        { name: "Docker", level: 60 }
      ]
    },
    {
      id: "fundamentals",
      title: "Core CS Fundamentals",
      icon: <Code2 size={24} />,
      skills: [
        { name: "OOP", level: 85 },
        { name: "DSA", level: 80 },
        { name: "DBMS", level: 80 },
        { name: "Operating Systems", level: 75 },
        { name: "Computer Networks", level: 75 }
      ]
    },
    {
      id: "ai",
      title: "Data Science & AI",
      icon: <BrainCircuit size={24} />,
      skills: [
        { name: "LLM & Prompt Eng.", level: 80 },
        { name: "Data Analysis", level: 75 },
        { name: "RAG", level: 75 },
        { name: "Machine Learning", level: 60 }
      ]
    },
    {
      id: "soft",
      title: "Other / Soft Skills",
      icon: <Users size={24} />,
      skills: [
        { name: "Problem Solving", level: 85 },
        { name: "Logical Thinking", level: 85 },
        { name: "Team Collaboration", level: 80 },
        { name: "Debugging", level: 80 },
        { name: "Time Management", level: 75 }
      ]
    }
  ]);

  useEffect(() => {
    // Left firebase connection logic here just in case! 
    const skillsRef = ref(database, 'skills');
    onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // If the database structure matched this new category format, we would update it here.
        // For now, these highly detailed static categories are active.
        console.log("Database connection active. Using local high-detail state.");
      }
    }, (error) => {
      console.log('Firebase connection error, using mock data:', error);
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="page-section" style={{ position: 'relative' }}>
      
      {/* Background glow effects */}
      <div className="glow-background" style={{ top: '20%', left: '-10%', opacity: 0.3 }}></div>
      <div className="glow-background" style={{ top: '60%', right: '-10%', opacity: 0.3, animationDelay: '2s' }}></div>

      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        My <span className="gradient-text">Skills</span>
      </motion.h2>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}
        >
          {skillCategories.map((category) => (
            <motion.div 
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.4)', borderColor: 'var(--accent-color)' }}
              className="glass-panel"
              style={{ padding: '2rem', borderRadius: 'var(--border-radius-lg)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--glass-border)', transition: 'border-color 0.3s' }}
            >
              {/* Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--accent-color)' }}>
                  {category.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>{category.title}</h3>
              </div>

              {/* Skills List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flexGrow: 1 }}>
                {category.skills.map((skill, index) => (
                  <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{skill.name}</span>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.9rem' }}>{skill.level}%</span>
                    </div>
                    
                    <div style={{ height: '6px', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden', width: '100%' }}>
                      <motion.div 
                        style={{ height: '100%', background: 'var(--accent-gradient)', borderRadius: '50px', boxShadow: '0 0 10px rgba(99, 102, 241, 0.8)' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
