import React from 'react';
import { motion } from 'framer-motion';

const PrizeCard = ({ position, price, items, color, emoji }) => {
  const colorStyles = {
    gold: { bg: 'rgba(255, 215, 0, 0.1)', border: 'rgba(255, 215, 0, 0.3)', text: '#ffd700' },
    silver: { bg: 'rgba(192, 192, 192, 0.1)', border: 'rgba(192, 192, 192, 0.3)', text: '#c0c0c0' },
    bronze: { bg: 'rgba(205, 127, 50, 0.1)', border: 'rgba(205, 127, 50, 0.3)', text: '#cd7f32' }
  };

  const style = colorStyles[color] || colorStyles.gold;

  return (
    <motion.div
      className="prize-card"
      whileHover={{ 
        y: -5,
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)'
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        background: style.bg,
        padding: '1.2rem',
        borderRadius: '10px',
        border: `1px solid ${style.border}`,
        position: 'relative',
        overflow: 'hidden',
        flex: '1 1 300px',
        maxWidth: '320px',
        minWidth: '280px',
        marginBottom: '1rem'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: style.bg,
        color: style.text,
        padding: '0.2rem 0.8rem',
        borderRadius: '15px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        border: `1px solid ${style.border}`
      }}>
        {emoji} {position}
      </div>
      <h3 style={{ 
        color: style.text,
        fontSize: '1.5rem',
        margin: '1.8rem 0 1rem 0',
        textAlign: 'center'
      }}>
        {price}
      </h3>
      <ul style={{ 
        listStyle: 'none', 
        padding: '0',
        textAlign: 'center',
        color: '#e0e0e0',
        lineHeight: '1.8',
        margin: '0',
        paddingLeft: '0.5rem'
      }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PrizeCard;
