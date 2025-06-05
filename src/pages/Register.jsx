// src/pages/Register.jsx
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
// Razorpay will be loaded via script tag in index.html
import PageContainer from '../components/PageContainer';

/* ------------------------------------------------------------------
   EmailJS configuration (reads from Vite env vars)
   ------------------------------------------------------------------ */
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Warn early if something is missing
if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
  console.error('❌ EmailJS env vars missing - check your .env file.');
}

// Initialise the EmailJS client once (safe in module scope)
emailjs.init(PUBLIC_KEY);

/* ------------------------------------------------------------------ */
/* -------------------------  STYLES  --------------------------------*/
/* ------------------------------------------------------------------ */
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
  transition: 'all 0.3s ease'
};

/* ------------------------------------------------------------------ */
/* -----------------------  COMPONENT  -------------------------------*/
/* ------------------------------------------------------------------ */
const initialFormState = {
  teamName: '',
  email: '',
  phone1: '',
  phone2: '',
  players: Array.from({ length: 4 }, () => ({ name: '', userId: '' }))
};

const Register = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [sending, setSending]   = useState(false);

  /* ------------ handlers ------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlayerChange = (index, field, value) => {
    const players = [...formData.players];
    players[index] = { ...players[index], [field]: value };
    setFormData(prev => ({ ...prev, players }));
  };

  /* Build params exactly matching the {{placeholders}} in EmailJS */
  const buildTemplateParams = (data) => ({
    email:              data.email.trim(),                   // {{email}}
    from_name:          'FreeFire Tournament',               // {{from_name}}
    player_name:        data.players[0]?.name     || 'Player',
    player_id:          data.players[0]?.userId   || 'N/A',
    team_name:          data.teamName             || 'Team',
    registration_date:  new Date().toLocaleDateString()
    // ↳ add more key/values if your template uses them
  });

  /* ------------ submit ------------ */
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        throw new Error('Failed to load Razorpay script');
      };
      document.body.appendChild(script);
    });
  };

  const navigate = useNavigate();

  const sendConfirmationEmail = async (formData) => {
    try {
      const params = buildTemplateParams(formData);
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        params,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send confirmation email');
    }
  };

  const handlePayment = async (formData) => {
    try {
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        console.log('Loading Razorpay script...');
        await loadRazorpayScript();
      }
      
      // Get API URL from environment or use default
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      console.log('Using API URL:', apiUrl);
      
      // Get Razorpay key from environment variables
      const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
      
      if (!key) {
        const errorMsg = 'Razorpay key not found. Please check your environment variables.';
        console.error(errorMsg);
        throw new Error(errorMsg);
      }
      
      console.log('Creating order...');
      // Create order on the server
      const orderResponse = await fetch(`${apiUrl}/api/payment/create-order`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create payment order');
      }
      
      const order = await orderResponse.json();
      console.log('Order created:', order);
      
      // Configure Razorpay options
      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency || 'INR',
        name: "FreeFire Tournament",
        description: "Tournament Registration Fee",
        order_id: order.id,
        handler: async function (response) {
          console.log('Payment response:', response);
          
          try {
            // Verify payment with the server
            const verifyResponse = await fetch(`${apiUrl}/api/payment/verify`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                registrationData: formData
              })
            });

            const result = await verifyResponse.json();
            console.log('Verification result:', result);

            if (!verifyResponse.ok || !result.success) {
              throw new Error(result.error || 'Payment verification failed');
            }

            // Send confirmation email
            try {
              console.log('Sending confirmation email...');
              await sendConfirmationEmail(formData);
              console.log('Email sent successfully');
              alert('Registration and payment successful! Confirmation email sent.');
              navigate('/success');
            } catch (emailErr) {
              console.error('Email sending failed:', emailErr);
              // Still navigate to success as payment was successful
              alert('Registration successful, but failed to send confirmation email.');
              navigate('/success');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert(`Payment verification failed: ${error.message}. Please contact support with payment ID: ${response.razorpay_payment_id}`);
          }
        },
        prefill: {
          name: formData.teamName || 'Team Leader',
          email: formData.email || '',
          contact: formData.phone1 || ''
        },
        theme: {
          color: "#ff8c00" // Match your site's theme
        },
        modal: {
          ondismiss: function() {
            console.log('Payment window was closed by user');
            alert('Payment window was closed. Please try again if you wish to complete your registration.');
          }
        },
        // Additional error handling
        "handler.error": function(error) {
          console.error('Razorpay error:', error);
          alert(`Payment error: ${error.description || 'Unknown error occurred'}`);
        },
        // Disable auto-focus on the first field
        "modal.escape": true,
        // Enable retry for failed payments
        "retry": {
          "enabled": true,
          "max_count": 3
        }
      };
      
      console.log('Opening Razorpay checkout...');
      const rzp = new window.Razorpay(options);
      rzp.open();
      
      // Handle payment close event
      rzp.on('payment.failed', function(response) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description || 'Unknown error'}`);
      });
      
    } catch (error) {
      console.error('Payment processing error:', error);
      alert(`Error: ${error.message || 'Failed to process payment. Please try again.'}`);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      alert('Email is required.');
      return;
    }

    setSending(true);
    try {
      await handlePayment(formData);
    } catch (err) {
      console.error('Error:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setSending(false);
    }
  };

  /* ------------ UI ------------ */
  return (
    <PageContainer>
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '2rem',
          borderRadius: '8px',
          marginTop: '1rem'
        }}
      >
        <h1
          style={{
            color: '#ff8c00',
            marginBottom: '2rem',
            textAlign: 'center'
          }}
        >
          Register for Tournament
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          {/* -------- Team name -------- */}
          <div style={formGroupStyle}>
            <label htmlFor="teamName" style={labelStyle}>
              Team Name:
            </label>
            <input
              id="teamName"
              name="teamName"
              type="text"
              required
              value={formData.teamName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* -------- Email -------- */}
          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>
              Team Leader's Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* -------- Phones -------- */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ ...formGroupStyle, flex: '1 1 250px' }}>
              <label htmlFor="phone1" style={labelStyle}>
                Phone Number 1:
              </label>
              <input
                id="phone1"
                name="phone1"
                type="tel"
                required
                value={formData.phone1}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={{ ...formGroupStyle, flex: '1 1 250px' }}>
              <label htmlFor="phone2" style={labelStyle}>
                Phone Number 2 (optional):
              </label>
              <input
                id="phone2"
                name="phone2"
                type="tel"
                value={formData.phone2}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* -------- Players -------- */}
          <div style={{ margin: '2rem 0 1rem' }}>
            <h3 style={{ color: '#ff8c00', marginBottom: '1rem' }}>
              Team Players
            </h3>
            {formData.players.map((player, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '1rem',
                  borderRadius: '4px',
                  marginBottom: '1rem'
                }}
              >
                <h4
                  style={{ color: '#ff8c00', marginBottom: '1rem' }}
                >
                  Player {idx + 1}
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}
                >
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>
                      Player Name:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={`Player ${idx + 1} Name`}
                      value={player.name}
                      onChange={(e) =>
                        handlePlayerChange(idx, 'name', e.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>
                  <div style={formGroupStyle}>
                    <label style={labelStyle}>
                      Player ID:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={`Player ${idx + 1} ID`}
                      value={player.userId}
                      onChange={(e) =>
                        handlePlayerChange(idx, 'userId', e.target.value)
                      }
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* -------- Submit -------- */}
          <div>
            <button
              type="submit"
              disabled={sending}
              style={{
                background:
                  'linear-gradient(90deg, #ff8c00 0%, #ff4500 100%)',
                opacity: sending ? 0.6 : 1,
                cursor: sending ? 'not-allowed' : 'pointer',
                color: '#fff',
                border: 'none',
                padding: '0.85rem 2rem',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 'bold',
                width: '100%',
                transition: 'all 0.3s ease',
                boxShadow: sending
                  ? 'none'
                  : '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {sending ? 'Sending…' : 'Register Now'}
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default Register;
