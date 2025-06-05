import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (custom = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: [0.16, 0.77, 0.47, 0.97]
    }
  })
};

const ScrollReveal = ({ children, delay = 0, style = {}, ...props }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={itemVariants}
    custom={delay}
    style={{ ...style, overflow: 'hidden' }}
    {...props}
  >
    {children}
  </motion.div>
);

export default ScrollReveal;
