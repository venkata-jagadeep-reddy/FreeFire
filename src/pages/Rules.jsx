import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedCard from '../components/AnimatedCard';

const Rules = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    }
  };

  const ruleSections = [
    {
      title: 'Entry Fee & Prizes',
      icon: '💰',
      color: '#ff8c00',
      rules: [
        '₹200 per team (Non-refundable)',
        '1st Place: ₹2,000 Cash + In-Game Rewards',
        '2nd Place: ₹1,500 Cash + In-Game Rewards',
        '3rd Place: Special In-Game Rewards'
      ]
    },
    {
      title: 'Team Rules',
      icon: '👥',
      color: '#9370db',
      rules: [
        'Each team must have exactly 4 players.',
        'Team name must be appropriate and not contain offensive language.',
        'Team members cannot be changed after registration.',
        'All team members must be registered with their correct in-game IDs.',
        'Teams must be ready 15 minutes before their scheduled match time.',
        'Each team must have a designated team leader for communication.',
        'Teams must maintain good sportsmanship throughout the tournament.'
      ]
    },
    {
      title: 'Gameplay Rules',
      icon: '🎮',
      color: '#4caf50',
      rules: [
        'All matches will be played in the designated game mode.',
        'Use of hacks or cheats will result in immediate disqualification.',
        'Players must respect the schedule and be on time for their matches.',
        'Any disputes must be reported to the tournament admin immediately.',
        "The tournament admin's decision is final in all matters."
      ]
    },
    {
      title: 'Technical Requirements',
      icon: '💻',
      color: '#2196f3',
      rules: [
        'Stable internet connection (minimum 10Mbps recommended).',
        'Latest version of FreeFire must be installed.',
        'Minimum 2GB free storage space for game and recordings.',
        'Screen recording of matches is recommended for dispute resolution.',
        'Players are responsible for their own technical issues during matches.'
      ]
    },
    {
      title: 'Code of Conduct',
      icon: '⚖️',
      color: '#ff5722',
      rules: [
        'All participants must maintain good sportsmanship at all times.',
        'No toxic behavior, harassment, or hate speech will be tolerated.',
        'Follow the instructions of tournament admins and moderators.',
        'Any form of cheating or exploitation will result in immediate disqualification.',
        'Decisions made by tournament officials are final and binding.'
      ]
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 1rem 2rem', color: '#e0e0e0', minHeight: '100vh', position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', background: 'linear-gradient(90deg, #ff8c00, #ff4500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Tournament Rules & Regulations
        </h1>
        <div style={{ height: '4px', width: '150px', background: 'linear-gradient(90deg, #ff8c00, #ff4500)', margin: '0.5rem auto 0', borderRadius: '2px' }} />
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" style={{ display: 'grid', gap: '1.8rem', maxWidth: '1000px', margin: '0 auto' }}>
        {ruleSections.map((section, idx) => (
          <motion.div key={section.title} variants={item}>
            <AnimatedCard delay={0.2 + idx * 0.1}>
              <div style={{ padding: '2rem', borderLeft: `4px solid ${section.color}`, background: `${section.color}20` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: `${section.color}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{section.icon}</div>
                  <h2 style={{ color: section.color, margin: 0, fontSize: '1.8rem', fontWeight: 600 }}>{section.title}</h2>
                </div>
                <ul style={{ paddingLeft: '1.8rem', margin: 0, display: 'grid', gap: '0.8rem', color: '#e0e0e0', lineHeight: '1.6' }}>
                  {section.rules.map((rule, index) => (
                    <motion.li key={index} variants={item} style={{ padding: '0.5rem 0', borderBottom: index < section.rules.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none' }}>{rule}</motion.li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: 0.3, duration: 0.6 }} style={{ textAlign: 'center', margin: '4rem auto 2rem', maxWidth: '800px', padding: '2rem', background: 'rgba(255, 140, 0, 0.05)', borderRadius: '12px', border: '1px solid rgba(255, 140, 0, 0.1)' }}>
        <h3 style={{ color: '#ff8c00', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Ready to Compete?</h3>
        <p style={{ color: '#e0e0e0', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          By participating in this tournament, you agree to all the rules and regulations outlined above. Make sure you understand everything before proceeding with registration.
        </p>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block' }}>
          <Link to="/register" style={{ display: 'inline-block', background: 'linear-gradient(90deg, #ff8c00, #ff4500)', color: 'white', padding: '1rem 2.5rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)' }}>
            I Agree &amp; Register Now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Rules;
