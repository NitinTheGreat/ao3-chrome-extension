import React, { useState } from 'react';
import Recommendations from './Recommendations';

const Popup = () => {
  const [activeComponent, setActiveComponent] = useState('popup'); // Default to popup

  const styles = {
    container: {
      width: '420px',
      height: '550px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      position: 'relative',
      overflow: 'hidden',
    },
    header: {
      backgroundColor: 'white',
      padding: '12px 16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottom: '1px solid #e5e7eb',
      width: '100%',
    },
    logo: {
      width: '24px',
      height: '24px',
      marginRight: '8px',
    },
    title: {
      color: '#1e40af',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    cardTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#1e40af',
    },
    cardText: {
      fontSize: '16px',
      color: '#4b5563',
      marginBottom: '24px',
    },
    button: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
    },
  };

  const handleGetStarted = () => {
    console.log("Get Started clicked");

    // Check if tokens are already stored in localStorage
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedAccessToken && storedRefreshToken) {
      console.log('Tokens found in localStorage:', storedAccessToken, storedRefreshToken);

      // Switch to the Recommendations component
      setActiveComponent('recommendations');
    } else {
      // If tokens are not found, redirect to Google
      console.log('Tokens not found, redirecting to Google');
      window.open('https://google.com', '_blank');
    }
  };

  return (
    <>
      {activeComponent === 'popup' && (
        <div style={styles.container}>
          <header style={styles.header}>
            <svg style={styles.logo} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={styles.title}>AO3 Assist</span>
          </header>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Thanks for installing AO3 Assist</h2>
            <p style={styles.cardText}>
              Transform your fanfic journey today! Discover personalized recommendations, add notes, and easily access your reading history with AO3 Assist—the ultimate extension for Archive of Our Own.
            </p>
            <button style={styles.button} onClick={handleGetStarted}>
              Get Started!
            </button>
          </div>
        </div>
      )}

      {activeComponent === 'recommendations' && <Recommendations />}
    </>
  );
};

export default Popup;
