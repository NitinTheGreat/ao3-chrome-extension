import React, { useState } from 'react';
import Recommendations from './Recommendations';

export default function Popup() {
  const [activeComponent, setActiveComponent] = useState('popup');

  const handleGetStarted = () => {
    console.log("Get Started clicked");

    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedAccessToken && storedRefreshToken) {
      console.log('Tokens found in localStorage:', storedAccessToken, storedRefreshToken);
      setActiveComponent('recommendations');
    } else {
      console.log('Tokens not found, redirecting to Google');
      window.open('https://google.com', '_blank');
    }
  };

  if (activeComponent === 'recommendations') {
    return <Recommendations />;
  }

  return (
    <div style={{
      width: '420px',
      height: '550px',
      borderRadius: '4px',
      background: 'var(--Background, #F3F5F7)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <nav style={{
        width: '424px',
        height: '65px',
        background: '#FFF',
        boxShadow: '2px -2px 6px 4px rgba(0, 0, 0, 0.20)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="31.5" viewBox="0 0 38 33" fill="none" style={{ position: 'absolute', left: '20px' }}>
          <path d="M15.0099 7.81305L18.8808 1L27.106 15.3073C31.2781 22.7614 24.3642 30.8168 17.5695 25.0458L15.1854 27.0897C18.8121 30.8491 25.2483 31.689 29.3136 26.4891C30.3303 25.1886 32.4979 25.0267 33.3497 26.4407L37 32.5H20.7881C10.5364 31.5382 12.4437 20.958 18.2848 19.5153L17.6887 16.5095C12.9337 17.4479 8.53713 22.5451 10.8734 29.2924C11.3811 30.7588 10.4194 32.5 8.86755 32.5H1L8.86755 18.9141C14.351 10.979 24.7219 15.6679 22.6954 22.7614L25.7947 23.7233C26.9922 19.3955 24.0963 12.3715 17.247 11.4678C15.5334 11.2418 14.1561 9.31586 15.0099 7.81305Z" fill="#0C2640" stroke="#0C2640"/>
        </svg>
        <span style={{
          color: '#0C2640',
          fontFamily: 'Rubik, sans-serif',
          fontSize: '24px',
          fontWeight: 500,
          letterSpacing: '-0.48px',
        }}>
          AO3 Assist
        </span>
      </nav>
      <div style={{
        width: '300px',
        height: '366px',
        margin: '44px auto',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '30px',
        background: '#FFF',
        borderRadius: '4px',
      }}>
        <h1 style={{
          color: '#2F68A2',
          fontFamily: 'Lato, sans-serif',
          fontSize: '24px',
          fontWeight: 600,
          lineHeight: '119.976%',
          marginBottom: '20px',
        }}>
          Thanks for installing AO3 Assist!
        </h1>
        <p style={{
          color: '#000',
          fontFamily: '"Source Sans Pro", sans-serif',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: 'normal',
          textAlign: 'justify',
        }}>
          Transform your fanfic journey today! Discover personalized recommendations, add notes, and easily access your reading history with AO3 Assist—the ultimate extension for Archive of Our Own.
        </p>
        <button 
          onClick={handleGetStarted}
          style={{
            display: 'flex',
            padding: '16px 0px',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
            borderRadius: '100px',
            background: '#285599',
            color: '#FFF',
            fontFamily: '"Source Sans Pro", sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}