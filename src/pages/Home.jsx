import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedCard from '../components/AnimatedCard';
import ScrollReveal from '../components/ScrollReveal';
import PageContainer from '../components/PageContainer';

const Home = () => {
  return (
    <PageContainer>
      <div style={{ paddingTop: '80px' }}>
        <div style={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <h1 style={{
              fontSize: '3.5rem',
              marginBottom: '1.5rem',
              background: 'linear-gradient(90deg, #ff8c00, #ff4500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              FreeFire Tournament 2025
            </h1>
            <p style={{
              fontSize: '1.25rem',
              marginBottom: '2rem',
              color: '#fff',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6
            }}>
              Compete in the most exciting battle royale tournament of the year! 
              Show off your skills, win amazing prizes, and claim the championship title.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/register" style={{
                  display: 'inline-block',
                  background: 'linear-gradient(90deg, #ff8c00, #ff4500)',
                  color: 'white',
                  padding: '0.8rem 2rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)'
                }}>
                  Register Now
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/details" style={{
                  display: 'inline-block',
                  background: 'transparent',
                  color: '#fff',
                  padding: '0.8rem 2rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  border: '2px solid #ff8c00',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}>
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 1rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '3rem',
            color: '#fff',
            position: 'relative',
            display: 'inline-block'
          }}>
            Tournament Highlights
            <span style={{
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #ff8c00, #ff4500)',
              borderRadius: '2px'
            }}></span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            <AnimatedCard delay={1}>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(255, 140, 0, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: '#ff8c00'
                }}>
                  🏆
                </div>
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Amazing Prizes</h3>
                <p style={{ color: '#ccc', lineHeight: 1.6 }}>
                  Win cash prizes, exclusive in-game items, and the championship trophy.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={1.2}>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(255, 140, 0, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: '#ff8c00'
                }}>
                  ⚔️
                </div>
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Competitive Matches</h3>
                <p style={{ color: '#ccc', lineHeight: 1.6 }}>
                  Face off against the best players in intense battle royale matches.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={1.4}>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(255, 140, 0, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: '#ff8c00'
                }}>
                  🎮
                </div>
                <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Fair Play</h3>
                <p style={{ color: '#ccc', lineHeight: 1.6 }}>
                  Strict anti-cheat measures to ensure a fair and competitive environment.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
