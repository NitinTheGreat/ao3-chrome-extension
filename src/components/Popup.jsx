import React, { useState } from 'react';
import { FaBook, FaShareAlt, FaStickyNote } from 'react-icons/fa';
import '../css/Popup.css'; // Importing the CSS file

function Popup() {
  const [activeTab, setActiveTab] = useState('books');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="popup-container">
      <h1 className="popup-title">Recommendations</h1>
      
      {/* Example content */}
      <div className="content">
        {activeTab === 'books' && (
          <div>
            <h2 className="content-title">Books:</h2>
            <p>List of recommended books...</p>
          </div>
        )}
        {activeTab === 'share' && (
          <div>
            <h2 className="content-title">Share:</h2>
            <p>Sharing options...</p>
          </div>
        )}
        {activeTab === 'notes' && (
          <div>
            <h2 className="content-title">Notes:</h2>
            <p>Your notes...</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div
          className={`nav-item ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => handleTabChange('books')}
        >
          <FaBook size={24} />
        </div>
        <div
          className={`nav-item ${activeTab === 'share' ? 'active' : ''}`}
          onClick={() => handleTabChange('share')}
        >
          <FaShareAlt size={24} />
        </div>
        <div
          className={`nav-item ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => handleTabChange('notes')}
        >
          <FaStickyNote size={24} />
        </div>
      </div>
    </div>
  );
}

export default Popup;
