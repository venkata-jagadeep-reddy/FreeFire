import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

// Logo will be added here
// You can replace this with an image logo by:
// 1. Adding your logo to the public/images folder
// 2. Using it like: <img src="/images/your-logo.png" alt="Logo" />

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
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Close menu when route changes
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

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
    <>
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
          padding: '0 1rem',
          position: 'relative'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <div style={{
              height: '40px',
              width: '40px',
              marginRight: '10px',
              background: '#ff8c00',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
              FF
            </div>
            <span style={{ 
              color: '#ff8c00', 
              fontWeight: 'bold', 
              fontSize: '1.5rem',
              whiteSpace: 'nowrap'
            }}>
              FreeFire Tournament
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/details">Details</NavLink>
            <NavLink to="/rules">Rules</NavLink>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'none',
              zIndex: 1001
            }}
            className="mobile-menu-button"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </motion.nav>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              background: 'rgba(10, 10, 10, 0.98)',
              zIndex: 999,
              padding: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
            ref={menuRef}
            className="mobile-nav"
          >
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '1rem',
              padding: '1rem 0'
            }}>
              <NavLink to="/" style={{ display: 'block', padding: '0.75rem 0' }}>Home</NavLink>
              <NavLink to="/about" style={{ display: 'block', padding: '0.75rem 0' }}>About</NavLink>
              <NavLink to="/details" style={{ display: 'block', padding: '0.75rem 0' }}>Details</NavLink>
              <NavLink to="/rules" style={{ display: 'block', padding: '0.75rem 0' }}>Rules</NavLink>
              <NavLink to="/register" style={{ display: 'block', padding: '0.75rem 0' }}>Register</NavLink>
              <NavLink to="/contact" style={{ display: 'block', padding: '0.75rem 0' }}>Contact</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
          .mobile-nav a {
            font-size: 1.1rem;
            text-align: center;
            width: 100%;
          }
          nav a img {
            height: 30px !important;
          }
          nav a span {
            font-size: 1.1rem !important;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
