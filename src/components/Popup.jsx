import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Recommendations from './Recommendations';

const styles = {
  container: {
    width: '420px',
    height: '550px',
    borderRadius: '12px',
    background: 'var(--Background, #F3F5F7)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    fontFamily: '"Source Sans Pro", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  nav: {
    width: '100%',
    height: '65px',
    background: '#FFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
  },
  logo: {
    position: 'absolute',
    left: '20px',
    width: '36px',
    height: '31.5px',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'scale(1.1)',
    },
  },
  title: {
    color: '#0C2640',
    fontFamily: 'Rubik, sans-serif',
    fontSize: '24px',
    fontWeight: 500,
    letterSpacing: '-0.48px',
    userSelect: 'none',
  },
  content: {
    width: '300px',
    margin: '44px auto',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '30px',
    background: '#FFF',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)',
    },
  },
  heading: {
    color: '#2F68A2',
    fontFamily: 'Lato, sans-serif',
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '120%',
    marginBottom: '20px',
    textShadow: '0 1px 2px rgba(47, 104, 162, 0.1)',
  },
  description: {
    color: '#2C3E50',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '1.6',
    textAlign: 'justify',
    opacity: 0.9,
  },
  button: {
    display: 'flex',
    padding: '16px 0px',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: '100px',
    background: '#285599',
    color: '#FFF',
    fontSize: '16px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    ':hover': {
      background: '#1E4276',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(40, 85, 153, 0.2)',
    },
    ':active': {
      transform: 'translateY(1px)',
    },
    '::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.5s ease',
    },
    ':hover::before': {
      left: '100%',
    },
  },
};

export default function Popup() {
  const [activeComponent, setActiveComponent] = useState('popup');

  const handleGetStarted = () => {
    console.log("Get Started clicked");

    chrome.runtime.sendMessage(
      { action: 'getTokens', tokens: ['refreshToken', 'accessToken'] },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError.message);
        } else if (response && response.refreshToken && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          console.log('Tokens stored in localStorage:', response.accessToken, response.refreshToken);
        } else if (response.error) {
          console.error('Error:', response.error);
        }
      }
    );

    if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
      console.log('Tokens found in localStorage:', localStorage.getItem('accessToken'), localStorage.getItem('refreshToken'));
      setActiveComponent('recommendations');
    }
  };

  if (activeComponent === 'recommendations') {
    return <Recommendations />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <nav style={styles.nav}>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="31.5"
          viewBox="0 0 38 33"
          fill="none"
          style={styles.logo}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <path
            d="M15.0099 7.81305L18.8808 1L27.106 15.3073C31.2781 22.7614 24.3642 30.8168 17.5695 25.0458L15.1854 27.0897C18.8121 30.8491 25.2483 31.689 29.3136 26.4891C30.3303 25.1886 32.4979 25.0267 33.3497 26.4407L37 32.5H20.7881C10.5364 31.5382 12.4437 20.958 18.2848 19.5153L17.6887 16.5095C12.9337 17.4479 8.53713 22.5451 10.8734 29.2924C11.3811 30.7588 10.4194 32.5 8.86755 32.5H1L8.86755 18.9141C14.351 10.979 24.7219 15.6679 22.6954 22.7614L25.7947 23.7233C26.9922 19.3955 24.0963 12.3715 17.247 11.4678C15.5334 11.2418 14.1561 9.31586 15.0099 7.81305Z"
            fill="#0C2640"
            stroke="#0C2640"
          />
        </motion.svg>
        <motion.span
          style={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          AO3 Assist
        </motion.span>
      </nav>
      <motion.div
        style={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.h1
          style={styles.heading}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          Thanks for installing AO3 Assist!
        </motion.h1>
        <motion.p
          style={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Transform your fanfic journey today! Discover personalized recommendations,
          add notes, and easily access your reading history with AO3 Assist—the
          ultimate extension for Archive of Our Own.
        </motion.p>
        <motion.button
          onClick={handleGetStarted}
          style={styles.button}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

