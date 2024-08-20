import React, { useState } from 'react';
// import Bookmarks from './Bookmarks';
import Recommendations from './Recommendations';

const Popup = () => {
  const [showBookmarks, setShowBookmarks] = useState(false);

  const handleGetStarted = () => {
    setShowBookmarks(true);
  };

  const styles = {
    container: {
      width: '420px',
      height: '550px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#F3F5F7',
    },
    header: {
      backgroundColor: 'white',
      padding: '10px',
      borderBottom: '1px solid #e0e0e0',
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      width: '24px',
      height: '24px',
      marginRight: '10px',
    },
    title: {
      color: '#1e40af',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    card: {

      background: 'linear-gradient(0deg, var(--sidebar-menubar-content-box, #FFF) 0%, var(--sidebar-menubar-content-box, #FFF) 100%), #FFF',
      width: '280px',
      height: '340px',
      padding: '44px 32px',
      margin: '35px',
      borderRadius: '16px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    cardTitle: {
      color: '#1e40af',
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    cardText: {
      color: '#4b5563',
      marginBottom: '15px',
    },
    button: {
      backgroundColor: '#285599',
      color: 'white',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      width: '100%',
      marginTop: '30px',
      padding: '16px 0px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      alignSelf: 'stretch',
      borderRadius: '100px'
    },
  };

  if (showBookmarks) {
    return <Recommendations />;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <svg style={styles.logo} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={styles.title}>A03 Assist</span>
      </header>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Thanks for installing AO3 Assist</h2>
        <p style={styles.cardText}>
          Transform your fanfic journey today! Discover personalized recommendations, add notes, and easily access your reading history with AO3 Assist—the ultimate extension for Archive of Our Own.
        </p>
        {/* <p style={styles.cardText}>Click "Get Started" to unlock these features now!</p> */}
        <button style={styles.button} onClick={handleGetStarted}>
          Get Started !
        </button>
      </div>
    </div>
  );
};

export default Popup;