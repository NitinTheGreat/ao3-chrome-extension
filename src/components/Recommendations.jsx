import React, { useState } from 'react';
import RecommendationsCard from './RecommendationCard';
import Bookmarks from './Bookmarks';
import Notes from './Notes';

const Recommendations = () => {
  const [activeTab, setActiveTab] = useState('recommendations');

  const styles = {
    container: {
      width: '420px',
      height: '550px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    },
    header: {
      backgroundColor: 'white',
      padding: '12px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #e5e7eb',
    },
    title: {
      color: '#1e40af',
      fontSize: '20px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      width: '24px',
      height: '24px',
      marginRight: '8px',
    },
    settingsIcon: {
      cursor: 'pointer',
      fontSize: '20px',
    },
    content: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '80px',
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      paddingBottom: '10px',
    },
    footerBackground: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: 'white',
    },
    footerButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '12px',
      color: '#4b5563',
      position: 'relative',
      zIndex: 2,
    },
    footerButtonActive: {
      color: '#2563eb',
    },
    footerButtonIcon: {
      width: '24px',
      height: '24px',
      marginBottom: '4px',
    },
    centerButton: {
      position: 'absolute',
      bottom: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      zIndex: 3,
    },
    circularElement: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100px',
      height: '50px',
      borderTopLeftRadius: '50px',
      borderTopRightRadius: '50px',
      backgroundColor: 'white',
      zIndex: 1,
    },
    activeLine: {
      position: 'absolute',
      bottom: '54px',
      left: '25%',
      width: '50%',
      height: '2px',
      backgroundColor: '#2563eb',
    },
  };

  const demoData = [
    {
      title: 'vision',
      links: [
        'https://archiveofourown.org/works/57908641',
        'https://archiveofourown.org/works/57816841',
        'https://archiveofourown.org/works/57703315',
        'https://archiveofourown.org/works/57678076',
        'https://archiveofourown.org/works/57640432',
      ],
    },
    {
      title: 'okiura',
      links: [
        'https://archiveofourown.org/works/57908641',
        'https://archiveofourown.org/works/57816841',
        'https://archiveofourown.org/works/57703315',
        'https://archiveofourown.org/works/57678076',
        'https://archiveofourown.org/works/57640432',
      ],
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenClick = () => {
    window.open('https://google.com', '_blank');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'bookmarks':
        return <Bookmarks />;
      case 'notes':
        return <Notes />;
      default:
        return (
          <>
            <header style={styles.header}>
              <div style={styles.title}>
                <svg style={styles.logo} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Recommendations
              </div>
              <span style={styles.settingsIcon}>⚙️</span>
            </header>
            <div style={styles.content}>
              {demoData.map((bookmark, index) => (
                <RecommendationsCard key={index} title={bookmark.title} links={bookmark.links} />
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div style={styles.container}>
      {renderContent()}
      <footer style={styles.footer}>
        <div style={styles.footerBackground}></div>
        <div style={styles.circularElement}></div>
        <button
          style={{
            ...styles.footerButton,
            ...(activeTab === 'recommendations' ? styles.footerButtonActive : {}),
          }}
          onClick={() => handleTabClick('recommendations')}
        >
          {activeTab === 'recommendations' && <div style={styles.activeLine} />}
          <svg style={styles.footerButtonIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke={activeTab === 'recommendations' ? '#2563eb' : '#4b5563'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Recommendations
        </button>
        <button style={styles.centerButton} onClick={handleOpenClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          style={{
            ...styles.footerButton,
            ...(activeTab === 'notes' ? styles.footerButtonActive : {}),
          }}
          onClick={() => handleTabClick('notes')}
        >
          {activeTab === 'notes' && <div style={styles.activeLine} />}
          <svg style={styles.footerButtonIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={activeTab === 'notes' ? '#2563eb' : '#4b5563'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Notes
        </button>
      </footer>
    </div>
  );
};

export default Recommendations;