import React from 'react';

const PageContainer = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      color: '#fff',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      lineHeight: 1.6,
      padding: '0',
      margin: 0,
      boxSizing: 'border-box',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {children}
    </div>
  );
};

export default PageContainer;
