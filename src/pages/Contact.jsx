import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import ScrollReveal from '../components/ScrollReveal';

// EmailJS configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_dngc3u7',
  TEMPLATE_ID: 'template_rc90chx',
  PUBLIC_KEY: '7OoHbK8q3EN6gsaXh',
  ADMIN_EMAIL: 'jagadeep.bsg@gmail.com'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ success: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Check if EmailJS is initialized
  const isEmailJSReady = !!emailjs;

  useEffect(() => {
    if (!isEmailJSReady) {
      console.error('EmailJS failed to initialize');
      setStatus({
        success: false,
        message: 'Email service is not available. Please try again later.'
      });
    }
  }, [isEmailJSReady]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        success: false,
        message: 'Please fill in all fields.'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        success: false,
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ success: null, message: 'Sending message...' });

    try {
      if (!isEmailJSReady) {
        throw new Error('Email service is not available. Please try again later.');
      }

      console.log('Sending form data:', formData);
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: EMAILJS_CONFIG.ADMIN_EMAIL,
        reply_to: formData.email
      };

      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Failed to send message');
      }

      console.log('EmailJS response:', response);
      
      setStatus({ 
        success: true, 
        message: '🎉 Message sent successfully! We\'ll get back to you soon.' 
      });
      // Clear form
      setFormData({ name: '', email: '', message: '' });
      // Reset status after 5 seconds
      setTimeout(() => {
        if (isMounted.current) {
          setStatus({ success: null, message: '' });
        }
      }, 5000);
    } catch (error) {
      console.error('Email sending error:', error);
      
      let errorMessage = 'Failed to send message. Please try again later.';
      
      // More specific error messages
      if (error.status) {
        errorMessage = `Error ${error.status}: ${error.text || 'Failed to send message'}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.error('EmailJS error details:', {
        error,
        status: error.status,
        text: error.text,
        message: error.message
      });
      
      setStatus({ 
        success: false, 
        message: errorMessage 
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 1rem 2rem', minHeight: 'calc(100vh - 200px)' }}>
      <ScrollReveal delay={0.1}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '2.5rem',
          borderRadius: '12px',
          borderLeft: '4px solid #8a2be2',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            color: '#8a2be2',
            marginBottom: '1.5rem',
            fontSize: '2.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem'
          }}>
            <span>📬</span>
            <span>Contact Us</span>
          </h1>
          
          <p style={{
            color: '#e0e0e0',
            fontSize: '1.1rem',
            lineHeight: '1.7',
            marginBottom: '2rem',
            maxWidth: '800px'
          }}>
            Have questions about the tournament or need assistance? Reach out to us using the information below or send us a message.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <motion.div 
              whileHover={{ y: -5 }}
              style={{
                background: 'rgba(138, 43, 226, 0.1)',
                padding: '1.5rem',
                borderRadius: '8px',
                borderLeft: '3px solid #8a2be2'
              }}
            >
              <h3 style={{ color: '#8a2be2', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📧</span>
                <span>Email</span>
              </h3>
              <p style={{ color: '#e0e0e0', margin: 0, wordBreak: 'break-word' }}>
                <a href="mailto:contact@freefiretournament.com" style={{ color: '#8a2be2', textDecoration: 'none' }}>
                  contact@freefiretournament.com
                </a>
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              style={{
                background: 'rgba(0, 172, 237, 0.1)',
                padding: '1.5rem',
                borderRadius: '8px',
                borderLeft: '3px solid #00aced'
              }}
            >
              <h3 style={{ color: '#00aced', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>💬</span>
                <span>Discord</span>
              </h3>
              <p style={{ color: '#e0e0e0', margin: 0 }}>
                <a href="https://discord.gg/freefire" target="_blank" rel="noopener noreferrer" style={{ color: '#00aced', textDecoration: 'none' }}>
                  Join our Discord Server
                </a>
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              style={{
                background: 'rgba(0, 123, 255, 0.1)',
                padding: '1.5rem',
                borderRadius: '8px',
                borderLeft: '3px solid #007bff'
              }}
            >
              <h3 style={{ color: '#007bff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📱</span>
                <span>Social Media</span>
              </h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://twitter.com/freefire" target="_blank" rel="noopener noreferrer" style={{ color: '#1da1f2', textDecoration: 'none' }}>
                  Twitter
                </a>
                <span style={{ color: '#666' }}>|</span>
                <a href="https://instagram.com/freefire" target="_blank" rel="noopener noreferrer" style={{ color: '#e1306c', textDecoration: 'none' }}>
                  Instagram
                </a>
                <span style={{ color: '#666' }}>|</span>
                <a href="https://facebook.com/freefire" target="_blank" rel="noopener noreferrer" style={{ color: '#4267B2', textDecoration: 'none' }}>
                  Facebook
                </a>
              </div>
            </motion.div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ color: '#8a2be2', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Send us a Message</h2>
            
            {status.message && (
              <div style={{ 
                marginBottom: '1.5rem',
                padding: '1rem',
                borderRadius: '4px',
                backgroundColor: status.success ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
                borderLeft: `4px solid ${status.success ? '#28a745' : '#dc3545'}`,
                color: status.success ? '#28a745' : '#dc3545'
              }}>
                {status.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="name" style={{ display: 'block', color: '#e0e0e0', marginBottom: '0.5rem' }}>Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '4px',
                    border: '1px solid #444',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="email" style={{ display: 'block', color: '#e0e0e0', marginBottom: '0.5rem' }}>Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '4px',
                    border: '1px solid #444',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="message" style={{ display: 'block', color: '#e0e0e0', marginBottom: '0.5rem' }}>Your Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '4px',
                    border: '1px solid #444',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    fontSize: '1rem',
                    resize: 'vertical',
                    minHeight: '120px'
                  }}
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                style={{
                  background: 'linear-gradient(90deg, #8a2be2 0%, #4b0082 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 2rem',
                  borderRadius: '4px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: 'opacity 0.3s ease'
                }}
                type="submit"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Contact;
