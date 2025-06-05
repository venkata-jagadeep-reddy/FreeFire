import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';

// Styles
const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginBottom: '1rem'
};

const labelStyle = {
  color: '#e0e0e0',
  fontSize: '0.9rem',
  fontWeight: '500'
};

const inputStyle = {
  padding: '0.75rem 1rem',
  borderRadius: '4px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'rgba(255, 255, 255, 0.05)',
  color: '#fff',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  ':focus': {
    outline: 'none',
    borderColor: '#ff8c00',
    boxShadow: '0 0 0 2px rgba(255, 140, 0, 0.2)'
  }
};

const Register = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    leaderEmail: '',
    phone1: '',
    phone2: '',
    players: [
      { name: '', userId: '' },
      { name: '', userId: '' },
      { name: '', userId: '' },
      { name: '', userId: '' }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...formData.players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: value
    };
    setFormData(prevState => ({
      ...prevState,
      players: updatedPlayers
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert('Registration successful! We will contact you soon.');
  };

  return (
    <PageContainer>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '2rem',
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h1 style={{ color: '#ff8c00', marginBottom: '2rem', textAlign: 'center' }}>Register for Tournament</h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={formGroupStyle}>
            <label htmlFor="teamName" style={labelStyle}>Team Name:</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="leaderEmail" style={labelStyle}>Team Leader's Email:</label>
            <input
              type="email"
              id="leaderEmail"
              name="leaderEmail"
              value={formData.leaderEmail}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={formGroupStyle}>
              <label htmlFor="phone1" style={labelStyle}>Phone Number 1:</label>
              <input
                type="tel"
                id="phone1"
                name="phone1"
                value={formData.phone1}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            
            <div style={formGroupStyle}>
              <label htmlFor="phone2" style={labelStyle}>Phone Number 2 (Optional):</label>
              <input
                type="tel"
                id="phone2"
                name="phone2"
                value={formData.phone2 || ''}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ margin: '2rem 0 1rem' }}>
            <h3 style={{ color: '#ff8c00', marginBottom: '1rem' }}>Team Players</h3>
            {formData.players.map((player, index) => (
              <div key={index} style={{ 
                background: 'rgba(255,255,255,0.05)', 
                padding: '1rem', 
                borderRadius: '4px',
                marginBottom: '1rem'
              }}>
                <h4 style={{ color: '#ff8c00', marginBottom: '1rem' }}>Player {index + 1}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={formGroupStyle}>
                    <label htmlFor={`player${index}Name`} style={labelStyle}>Player Name:</label>
                    <input
                      type="text"
                      id={`player${index}Name`}
                      value={player.name}
                      onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                      style={inputStyle}
                      required
                      placeholder={`Player ${index + 1} Name`}
                    />
                  </div>
                  <div style={formGroupStyle}>
                    <label htmlFor={`player${index}Id`} style={labelStyle}>Player ID:</label>
                    <input
                      type="text"
                      id={`player${index}Id`}
                      value={player.userId}
                      onChange={(e) => handlePlayerChange(index, 'userId', e.target.value)}
                      style={inputStyle}
                      required
                      placeholder={`Player ${index + 1} ID`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <button 
              type="submit" 
              style={{
                background: 'linear-gradient(90deg, #ff8c00 0%, #ff4500 100%)',
                color: 'white',
                border: 'none',
                padding: '0.8rem 2rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                width: '100%',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              Register Now
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default Register;
