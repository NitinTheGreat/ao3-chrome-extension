import React, { useState, useRef, useEffect } from 'react';
import { Settings } from 'lucide-react';

const initialNotes = [
  { id: '1', title: 'Everyday Love in Stockholm', tags: ['Humor', 'Hurt', 'Loki'], completed: false },
  { id: '2', title: 'Twist and Shout', tags: ['Angst', 'Tragedy'], completed: false },
  { id: '3', title: 'Crying Lightning', tags: ['Angst', 'Bakugou'], completed: false },
];

const styles = {
  container: {
    width: '400px',
    height: '600px',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: 'white',
    borderBottom: '1px solid #E5E7EB',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1E40AF',
    flexGrow: 1,
    textAlign: 'center',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
  },
  addNoteContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    border: '1px dashed #B0B0B0',
    cursor: 'pointer',
  },
  noteContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    border: '1px solid #E5E7EB',
  },
  noteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    marginRight: '8px',
  },
  noteTitle: {
    fontSize: '16px',
  },
  completedTitle: {
    textDecoration: 'line-through',
    color: '#6B7280',
  },
  tagContainer: {
    marginTop: '8px',
  },
  tag: {
    display: 'inline-block',
    backgroundColor: '#E5E7EB',
    color: '#4B5563',
    padding: '2px 8px',
    borderRadius: '9999px',
    fontSize: '12px',
    marginRight: '8px',
    marginBottom: '4px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    width: '360px',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#1E40AF',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
    marginBottom: '16px',
  },
  tagInput: {
    width: '100%',
    padding: '8px',
    border: '1px solid #D1D5DB',
    borderRadius: '4px',
  },
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '8px',
  },
  tagInModal: {
    backgroundColor: '#E5E7EB',
    color: '#374151',
    padding: '4px 8px',
    borderRadius: '16px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
  },
  removeTagButton: {
    marginLeft: '4px',
    color: '#6B7280',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '16px',
  },
  addButton: {
    backgroundColor: '#1E40AF',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
  },
};

const SettingsComponent = () => (
  <div style={{ padding: '16px' }}>
    <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Settings</h2>
    <p>This is the settings component. Add your settings options here.</p>
  </div>
);

export default function Component() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : initialNotes;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', tags: [] });
  const [currentTag, setCurrentTag] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.title.trim() === '') return;
    const newNoteWithId = {
      ...newNote,
      id: Date.now().toString(),
      completed: false,
    };
    setNotes(prevNotes => [...prevNotes, newNoteWithId]);
    setNewNote({ title: '', tags: [] });
    setCurrentTag('');
    setIsModalOpen(false);
  };

  const toggleNoteCompletion = id => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const handleTagInput = e => {
    const value = e.target.value;
    if (value.endsWith(' ') && value.trim() !== '') {
      setNewNote(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag('');
    } else {
      setCurrentTag(value);
    }
  };

  const removeTag = tagToRemove => {
    setNewNote(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderNotes = () => {
    return notes.map(note => (
      <div key={note.id} style={styles.noteContainer}>
        <div style={styles.noteHeader}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              style={styles.checkbox}
              checked={note.completed}
              onChange={() => toggleNoteCompletion(note.id)}
            />
            <span style={{
              ...styles.noteTitle,
              ...(note.completed ? styles.completedTitle : {})
            }}>
              {note.title}
            </span>
          </div>
        </div>
        <div style={styles.tagContainer}>
          {note.tags.map(tag => (
            <span key={tag} style={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.iconButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 style={styles.headerTitle}>Notes</h1>
        <button
          style={styles.iconButton}
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings color="#1E40AF" size={24} />
        </button>
      </header>
      <div style={styles.content}>
        {showSettings ? (
          <SettingsComponent />
        ) : (
          <>
            <div
              style={styles.addNoteContainer}
              onClick={() => setIsModalOpen(true)}
            >
              <div style={styles.noteHeader}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" style={styles.checkbox} disabled />
                  <span style={{ ...styles.noteTitle, color: '#9CA3AF' }}>Add Name</span>
                </div>
                <span style={{ color: '#9CA3AF', fontSize: '20px' }}>+</span>
              </div>
              <p style={{ ...styles.tag, backgroundColor: 'transparent', color: '#9CA3AF' }}>#Add Tags</p>
            </div>
            {renderNotes()}
          </>
        )}
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div ref={modalRef} style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Add a new Note :</h3>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Add name"
                style={styles.input}
                value={newNote.title}
                onChange={e => setNewNote({ ...newNote, title: e.target.value })}
              />
              <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}>✏️</span>
            </div>
            <div style={styles.tagList}>
              {newNote.tags.map(tag => (
                <span key={tag} style={styles.tagInModal}>
                  #{tag}
                  <button onClick={() => removeTag(tag)} style={styles.removeTagButton}>
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="#Add tags"
              style={styles.tagInput}
              value={currentTag}
              onChange={handleTagInput}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <button
                style={styles.addButton}
                onClick={addNote}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}