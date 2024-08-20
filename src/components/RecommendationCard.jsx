import React from 'react';

const recommendationsCard = ({ title, links, onNotesClick }) => {
  const styles = {
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      marginBottom: '16px',
    },
    title: {
      color: '#2563eb',
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '12px',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      fontSize: '14px',
      marginBottom: '8px',
      color: '#4b5563',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title} :</h3>
      <ul style={styles.list}>
        {links.map((link, index) => (
          <li key={index} style={styles.listItem}>{link}</li>
        ))}
      </ul>
    </div>
  );
};

export default recommendationsCard;