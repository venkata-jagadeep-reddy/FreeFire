import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

const Success = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center',
        color: '#fff'
      }}>
        <h1 style={{
          color: '#4CAF50',
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}>
          Payment Successful! 🎉
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Thank you for registering for the FreeFire Tournament!
          A confirmation email has been sent to your registered email address.
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Return Home
          </button>
          
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0b7dda'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'}
          >
            Register Another Team
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Success;
