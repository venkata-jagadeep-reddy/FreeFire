import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import ScrollReveal from '../components/ScrollReveal';

const About = () => {
  return (
    <div style={{ padding: '100px 1rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1.5rem',
          background: 'linear-gradient(90deg, #ff8c00, #ff4500)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          About FreeFire Tournament
        </h1>
        <div style={{
          height: '4px',
          width: '100px',
          background: 'linear-gradient(90deg, #ff8c00, #ff4500)',
          margin: '0 auto',
          borderRadius: '2px'
        }}></div>
      </motion.div>

      <div style={{ marginBottom: '4rem' }}>
        <ScrollReveal delay={0.2}>
          <AnimatedCard delay={0.2}>
            <div style={{ padding: '2rem' }}>
              <h2 style={{
                color: '#ff8c00',
                marginBottom: '1.5rem',
                fontSize: '2rem',
                position: 'relative',
                display: 'inline-block'
              }}>
                Welcome to the Arena
                <span style={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: 0,
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #ff8c00, #ff4500)',
                  borderRadius: '2px'
                }}></span>
              </h2>
              <p style={{
                color: '#e0e0e0',
                lineHeight: '1.8',
                fontSize: '1.1rem',
                marginBottom: '2rem'
              }}>
                Welcome to the official FreeFire Tournament platform, where the most skilled players from around the globe 
                converge to compete in the ultimate battle royale experience. Our platform is dedicated to delivering 
                high-stakes, adrenaline-pumping tournaments that challenge even the most seasoned FreeFire veterans.
              </p>
              <p style={{
                color: '#e0e0e0',
                lineHeight: '1.8',
                fontSize: '1.1rem',
                marginBottom: '2rem'
              }}>
                Whether you're a solo warrior or part of an elite squad, our tournaments offer the perfect stage to showcase 
                your skills, strategic thinking, and lightning-fast reflexes against worthy opponents.
              </p>
            </div>
          </AnimatedCard>
        </ScrollReveal>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        <ScrollReveal delay={0.4}>
          <AnimatedCard delay={0.4}>
            <div style={{ padding: '2rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'rgba(255, 140, 0, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.5rem',
                color: '#ff8c00'
              }}>
                🎯
              </div>
              <h3 style={{
                color: '#fff',
                marginBottom: '1rem',
                fontSize: '1.5rem'
              }}>
                Our Mission
              </h3>
              <p style={{
                color: '#ccc',
                lineHeight: '1.7',
                fontSize: '1rem'
              }}>
                To create a fair, inclusive, and thrilling competitive environment where FreeFire players of all skill levels 
                can test their abilities, learn from the best, and experience the excitement of professional esports.
              </p>
            </div>
          </AnimatedCard>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <AnimatedCard delay={0.6}>
            <div style={{ padding: '2rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'rgba(255, 140, 0, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.5rem',
                color: '#ff8c00'
              }}>
                ⚔️
              </div>
              <h3 style={{
                color: '#fff',
                marginBottom: '1rem',
                fontSize: '1.5rem'
              }}>
                Tournament Format
              </h3>
              <p style={{
                color: '#ccc',
                lineHeight: '1.7',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}>
                Our tournaments feature multiple rounds of intense battle royale action, including:
              </p>
              <ul style={{
                color: '#ccc',
                paddingLeft: '1.5rem',
                lineHeight: '1.8',
                margin: 0
              }}>
                <li>Qualifier rounds to determine the best players</li>
                <li>Group stages for strategic team play</li>
                <li>Knockout rounds leading to the grand finale</li>
                <li>Special events and show matches</li>
              </ul>
            </div>
          </AnimatedCard>
        </ScrollReveal>

        <ScrollReveal delay={0.8}>
          <AnimatedCard delay={0.8}>
            <div style={{ padding: '2rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'rgba(255, 140, 0, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.5rem',
                color: '#ff8c00'
              }}>
                🏆
              </div>
              <h3 style={{
                color: '#fff',
                marginBottom: '1rem',
                fontSize: '1.5rem'
              }}>
                Why Compete?
              </h3>
              <p style={{
                color: '#ccc',
                lineHeight: '1.7',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}>
                Joining our tournaments gives you the chance to:
              </p>
              <ul style={{
                color: '#ccc',
                paddingLeft: '1.5rem',
                lineHeight: '1.8',
                margin: 0
              }}>
                <li>Win cash prizes and exclusive in-game items</li>
                <li>Gain recognition in the FreeFire community</li>
                <li>Improve your skills against top-tier competition</li>
                <li>Connect with other passionate players</li>
                <li>Experience the thrill of competitive gaming</li>
              </ul>
            </div>
          </AnimatedCard>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.4}>
        <div style={{
          background: 'rgba(255, 140, 0, 0.05)',
          borderRadius: '8px',
          padding: '2rem',
          borderLeft: '4px solid #ff8c00',
          marginTop: '2rem'
        }}>
          <h3 style={{
            color: '#ff8c00',
            fontSize: '1.5rem',
            marginBottom: '1rem'
          }}>
            Ready to Join the Battle?
          </h3>
          <p style={{
            color: '#e0e0e0',
            lineHeight: '1.7',
            marginBottom: '1.5rem',
            fontSize: '1.1rem'
          }}>
            Register now to secure your spot in the next tournament and take your first step towards becoming a FreeFire champion!
          </p>
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: 'inline-block' }}
          >
            <a 
              href="/register" 
              style={{
                display: 'inline-block',
                background: 'linear-gradient(90deg, #ff8c00, #ff4500)',
                color: 'white',
                padding: '0.8rem 2rem',
                borderRadius: '4px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)'
              }}
            >
              Register Now
            </a>
          </motion.div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default About;
