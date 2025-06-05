import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavLink = ({ to, children, className = '' }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${className} ${isActive ? 'active' : ''}`}
      style={{
        color: isActive ? '#ff8c00' : 'white',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'all 0.3s ease',
        ':hover': {
          color: '#ff8c00',
          background: 'rgba(255, 140, 0, 0.1)'
        }
      }}
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      style={{
        background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(0, 0, 0, 0.8)',
        padding: '1rem',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        borderBottom: scrolled ? '1px solid rgba(255, 140, 0, 0.4)' : '1px solid rgba(255, 140, 0, 0.2)',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem'
      }}>
        <Link to="/" style={{ color: '#ff8c00', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.5rem' }}>
          FreeFire Tournament
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/details">Details</NavLink>
          <NavLink to="/rules">Rules</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
