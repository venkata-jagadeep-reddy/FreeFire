import React from 'react';
import PageContainer from '../components/PageContainer';
import ScrollReveal from '../components/ScrollReveal';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PrizeCard from '../components/PrizeCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Details = () => {
  return (
    <PageContainer>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 1rem 2rem' }}>
      <h1 style={{
        color: '#ff8c00',
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '2.5rem',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        Tournament Details
      </h1>
      
      {/* Schedule Section - Full Width */}
      <div style={{ marginBottom: '2rem' }}>
        <ScrollReveal delay={0}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '2rem',
            borderRadius: '12px',
            borderLeft: '4px solid #ff8c00',
            marginBottom: '2rem'
          }}>
            <h2 style={{ 
              color: '#ff8c00', 
              marginBottom: '1.5rem',
              fontSize: '1.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>📅</span>
              <span>Tournament Schedule</span>
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem 2rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              <div style={{ padding: '0.5rem 0' }}>
                <h3 style={{ color: '#ff8c00', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Registration</h3>
                <p style={{ color: '#e0e0e0', margin: 0 }}>June 1 - June 30, 2025</p>
              </div>
              <div style={{ padding: '0.5rem 0' }}>
                <h3 style={{ color: '#ff8c00', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Qualifiers</h3>
                <p style={{ color: '#e0e0e0', margin: 0 }}>July 5-7, 2025</p>
              </div>
              <div style={{ padding: '0.5rem 0' }}>
                <h3 style={{ color: '#ff8c00', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Quarter Finals</h3>
                <p style={{ color: '#e0e0e0', margin: 0 }}>July 12-13, 2025</p>
              </div>
              <div style={{ padding: '0.5rem 0' }}>
                <h3 style={{ color: '#ff8c00', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Semi Finals</h3>
                <p style={{ color: '#e0e0e0', margin: 0 }}>July 19, 2025</p>
              </div>
              <div style={{ padding: '0.5rem 0' }}>
                <h3 style={{ color: '#ff8c00', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Grand Finale</h3>
                <p style={{ color: '#e0e0e0', margin: 0 }}>July 26, 2025</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Prizes Section - Separate Card */}
      <div style={{ marginBottom: '2rem' }}>
        <ScrollReveal delay={0.2}>
          <div style={{
            background: 'rgba(0, 123, 255, 0.05)',
            padding: '2rem',
            borderRadius: '12px',
            borderLeft: '4px solid #00bfff',
            marginBottom: '2rem'
          }}>
            <h2 style={{ 
              color: '#00bfff', 
              marginBottom: '1.5rem',
              fontSize: '1.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>🏆</span>
              <span>Tournament Prizes</span>
            </h2>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ 
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem',
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              <PrizeCard 
                position="1st Place"
                price="₹2,000"
                items={['Cash Prize', 'Exclusive In-Game Items', "Winner's Trophy"]}
                color="gold"
                emoji="🥇"
              />
              
              <PrizeCard 
                position="2nd Place"
                price="₹1,000"
                items={['Cash Prize', 'In-Game Items', 'Runner-up Trophy']}
                color="silver"
                emoji="🥈"
              />
              
              {/* <PrizeCard 
                position="3rd Place"
                price="₹1,000"
                items={['Cash Prize', 'In-Game Items', 'Special Recognition']}
                color="bronze"
                emoji="🥉"
              /> */}
            </div>
            
            <p style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              color: '#aaa',
              fontStyle: 'italic',
              padding: '0 1rem'
            }}>
              * Top performers will receive special recognition and additional in-game rewards
            </p>
          </motion.div>
          </div>
        </ScrollReveal>
      </div>

      {/* How to Participate Section */}
      <div style={{ marginBottom: '2rem' }}>
        <ScrollReveal delay={0.3}>
          <div style={{
            background: 'rgba(50, 205, 50, 0.05)',
            padding: '2rem',
            borderRadius: '12px',
            borderLeft: '4px solid #32cd32'
          }}>
            <h2 style={{ 
              color: '#32cd32', 
              marginBottom: '1.5rem',
              fontSize: '1.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>🎮</span>
              <span>How to Participate</span>
            </h2>
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Form a team of 4 players</li>
            <li>Register your team through our registration page</li>
            <li>Pay the entry fee of ₹200 per team</li>
            <li>Join our Discord server for updates and match schedules</li>
            <li>Be ready for your scheduled matches</li>
          </ol>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/register" style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg, #ff8c00 0%, #ff4500 100%)',
              color: 'white',
              padding: '0.6rem 1.5rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}>
              Register Your Team Now
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/rules" style={{
          color: '#ff8c00',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          border: '1px solid #ff8c00',
          padding: '0.8rem 1.5rem',
          borderRadius: '4px',
          transition: 'all 0.3s ease'
        }}>
          View Complete Rules & Regulations
          <span style={{ fontSize: '1.2rem' }}>→</span>
        </Link>
      </div>
    </div>
  </PageContainer>
  );
};

export default Details;
