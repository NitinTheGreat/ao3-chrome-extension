import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
  onOpenClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ activeTab, onTabClick, onOpenClick }) => {
  const styles = {
    footer: {
      height: '87px',
      position: 'relative' as const,
    },
    footerContent: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      height: '87px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      paddingBottom: '16px',
      zIndex: 2,
    },
    footerButton: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
      position: 'relative' as const,
      padding: '4px',
    },
    footerButtonText: {
      marginTop: '4px',
      fontSize: '12px',
    },
    centerButton: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      position: 'absolute' as const,
      bottom: '42px',
      left: '50%',
      transform: 'translateX(-50%)',
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
      zIndex: 100,
    },
    activeIndicator: {
      position: 'absolute' as const,
      top: '-2px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '24px',
      height: '2px',
      backgroundColor: '#285599',
      borderRadius: '1px',
    }
  };

  return (
    <footer style={styles.footer}>
      <svg 
        width="420" 
        height="87" 
        viewBox="0 0 420 87" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 1
        }}
      >
        <g filter="url(#filter0_d_917_22384)">
          <path d="M153.401 12H0V97H420V12H266.74C260.174 12 254.602 16.6248 252.481 22.8388C235.059 73.876 184.976 73.8871 167.671 22.8721C165.558 16.6419 159.98 12 153.401 12Z" fill="white"/>
        </g>
        <defs>
          <filter id="filter0_d_917_22384" x="-10" y="0" width="440" height="105" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_917_22384"/>
            <feOffset dy="-2"/>
            <feGaussianBlur stdDeviation="3"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_917_22384"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_917_22384" result="shape"/>
          </filter>
        </defs>
      </svg>

      <div style={styles.footerContent}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabClick('recommendations')}
          style={{
            ...styles.footerButton,
            color: activeTab === 'recommendations' ? '#285599' : '#4b5563',
          }}
        >
          {activeTab === 'recommendations' && (
            <div style={styles.activeIndicator} />
          )}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={styles.footerButtonText}>Recommendations</span>
        </motion.button>

        <button
          onClick={onOpenClick}
          style={styles.centerButton}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabClick('notes')}
          style={{
            ...styles.footerButton,
            color: activeTab === 'notes' ? '#285599' : '#4b5563',
          }}
        >
          {activeTab === 'notes' && (
            <div style={styles.activeIndicator} />
          )}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={styles.footerButtonText}>Notes</span>
        </motion.button>
      </div>
    </footer>
  );
};

