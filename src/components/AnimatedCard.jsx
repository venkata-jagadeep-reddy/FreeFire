import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: delay * 0.1,
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97]
      }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
      }}
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        padding: '1.5rem',
        transition: 'all 0.3s ease'
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
