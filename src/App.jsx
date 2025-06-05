import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Rules from './pages/Rules';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Details from './pages/Details';
import Contact from './pages/Contact';
import Success from './pages/Success';
import ScrollReveal from './components/ScrollReveal';
import PageContainer from './components/PageContainer';
import AnimatedCard from './components/AnimatedCard';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: custom * 0.1,
      when: 'beforeChildren'
    }
  })
};

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

// Scroll reveal component


// Page transition wrapper

// Animated card component


// Navbar component


// Simple NavLink component with basic styling
const NavLink = ({ to, children, className = '' }) => {
  return (
    <Link
      to={to}
      style={{
        color: 'white',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        margin: '0 0.25rem',
        display: 'inline-block',
      }}
      className={({ isActive }) => 
        `nav-link ${isActive ? 'active' : ''} ${className}`
      }
    >
      {children}
    </Link>
  );
};

// Add global styles to the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .nav-link {
      transition: background-color 0.3s ease;
    }
    .nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .nav-link.active {
      background-color: rgba(255, 255, 255, 0.2);
    }
  `;
  document.head.appendChild(style);
}

// Styles
const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const labelStyle = {
  color: '#ddd',
  fontSize: '0.9rem',
  fontWeight: '500'
};

const inputStyle = {
  padding: '0.6rem 0.8rem',
  borderRadius: '4px',
  border: '1px solid #444',
  backgroundColor: '#2a2a2a',
  color: 'white',
  fontSize: '1rem',
  '&:focus': {
    outline: 'none',
    borderColor: '#ff8c00'
  }
};

const App = () => {
  const location = useLocation();




  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Navbar />
      <div style={{ minHeight: '100vh' }}> {/* Add margin to prevent content from being hidden behind fixed navbar */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route path="/about" element={
            <PageTransition>
              <About />
            </PageTransition>
          } />
          <Route path="/details" element={
            <PageTransition>
              <Details />
            </PageTransition>
          } />
          <Route path="/rules" element={
            <PageTransition>
              <Rules />
            </PageTransition>
          } />
          <Route path="/register" element={
            <PageTransition>
              <Register />
            </PageTransition>
          } />
          <Route path="/contact" element={
            <PageTransition>
              <Contact />
            </PageTransition>
          } />
          <Route path="/success" element={
            <PageTransition>
              <Success />
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>
      </div> {/* Close the margin div */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem 1rem',
        marginTop: '3rem',
        borderTop: '1px solid #333',
        color: '#aaa',
        fontSize: '0.9rem'
      }}>
        <p>© 2025 FreeFire Tournament. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App
