import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Recommendations = () => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [recommendations, setRecommendations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://ao3-aiml.onrender.com/recommendations/Dipit12');
      setRecommendations(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      width: '420px',
      height: '550px',
      backgroundColor: '#F3F5F7',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    },
    navbar: {
      height: '64px',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      zIndex: 10,
    },
    logo: {
      position: 'absolute',
      left: '20px',
      width: '36px',
      height: '31.5px',
    },
    navTitle: {
      color: '#0C2640',
      fontSize: '24px',
      fontWeight: 500,
    },
    content: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px',
    },
    footer: {
      height: '85px',
      backgroundColor: '#FFFFFF',
      position: 'relative',
    },
    footerSvg: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    footerContent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '85px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      paddingBottom: '16px',
    },
    footerButton: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
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
      position: 'absolute',
      bottom: '32px',
      left: '50%',
      transform: 'translateX(-50%)',
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
    },
    recommendationCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    recommendationTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#285599',
    },
    recommendationList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    recommendationItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
    },
    bulletPoint: {
      marginRight: '8px',
      flexShrink: 0,
    },
    recommendationLink: {
      color: '#285599',
      textDecoration: 'none',
      fontSize: '14px',
      wordBreak: 'break-all',
    },
    loadingSpinner: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenClick = () => {
    window.open('https://archiveofourown.org', '_blank');
  };

  const Notes = () => (
    <div style={{ padding: '20px', color: '#285599' }}>
      <h2>Notes Component</h2>
      <p>This is a placeholder for the Notes component.</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'notes':
        return <Notes />;
      default:
        return (
          <AnimatePresence>
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={styles.loadingSpinner}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #285599',
                    borderTop: '4px solid transparent',
                    borderRadius: '50%',
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={styles.content}
              >
                {Object.entries(recommendations).map(([category, links], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={styles.recommendationCard}
                  >
                    <h3 style={styles.recommendationTitle}>{category}</h3>
                    <ul style={styles.recommendationList}>
                      {links.map((link, linkIndex) => (
                        <motion.li
                          key={linkIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 5 + linkIndex) * 0.05 }}
                          style={styles.recommendationItem}
                        >
                          <svg style={styles.bulletPoint} width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 4.44124C4.28813 2.56223 3.14849 1.90601 1 1C2.10881 2.36504 2.78571 3.18542 2.78571 4.44124C2.78571 5.59851 2.29529 6.41651 1 7.88248C3.23029 6.82396 4.4375 6.00544 6 4.44124Z" fill="#535353" stroke="#535353" strokeLinejoin="round"/>
                          </svg>
                          <motion.a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.recommendationLink}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {link}
                          </motion.a>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        );
    }
  };

  return (
    <div style={styles.container}>
      <motion.nav
        style={styles.navbar}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="31.5" viewBox="0 0 38 33" fill="none" style={styles.logo}>
          <path d="M15.0099 7.81305L18.8808 1L27.106 15.3073C31.2781 22.7614 24.3642 30.8168 17.5695 25.0458L15.1854 27.0897C18.8121 30.8491 25.2483 31.689 29.3136 26.4891C30.3303 25.1886 32.4979 25.0267 33.3497 26.4407L37 32.5H20.7881C10.5364 31.5382 12.4437 20.958 18.2848 19.5153L17.6887 16.5095C12.9337 17.4479 8.53713 22.5451 10.8734 29.2924C11.3811 30.7588 10.4194 32.5 8.86755 32.5H1L8.86755 18.9141C14.351 10.979 24.7219 15.6679 22.6954 22.7614L25.7947 23.7233C26.9922 19.3955 24.0963 12.3715 17.247 11.4678C15.5334 11.2418 14.1561 9.31586 15.0099 7.81305Z" fill="#0C2640" stroke="#0C2640"/>
        </svg>
        <motion.span
          style={styles.navTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Recommendations
        </motion.span>
      </motion.nav>

      {renderContent()}

      <footer style={styles.footer}>
        <svg style={styles.footerSvg} width="420" height="85" viewBox="0 0 420 85" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H420V85H0V0Z" fill="white"/>
          <path d="M170 0C170 0 182 20 210 20C238 20 250 0 250 0H170Z" fill="#F3F5F7"/>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="-2" stdDeviation="3" floodOpacity="0.2"/>
          </filter>
          <rect width="420" height="85" fill="white" filter="url(#shadow)"/>
        </svg>

        <div style={styles.footerContent}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTabClick('recommendations')}
            style={{
              ...styles.footerButton,
              color: activeTab === 'recommendations' ? '#285599' : '#4b5563',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={styles.footerButtonText}>Recommendations</span>
            {activeTab === 'recommendations' && (
              <motion.div
                layoutId="activeTabOutline"
                style={{
                  position: 'absolute',
                  top: -4,
                  left: -4,
                  right: -4,
                  bottom: -4,
                  border: '2px solid #285599',
                  borderRadius: '8px',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenClick}
            style={styles.centerButton}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTabClick('notes')}
            style={{
              ...styles.footerButton,
              color: activeTab === 'notes' ? '#285599' : '#4b5563',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={styles.footerButtonText}>Notes</span>
            {activeTab === 'notes' && (
              <motion.div
                layoutId="activeTabOutline"
                style={{
                  position: 'absolute',
                  top: -4,
                  left: -4,
                  right: -4,
                  bottom: -4,
                  border: '2px solid #285599',
                  borderRadius: '8px',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default Recommendations;

