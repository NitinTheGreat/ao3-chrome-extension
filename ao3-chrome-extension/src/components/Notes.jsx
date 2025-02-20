import React, { useState, useRef, useEffect } from 'react';

const initialNotes = [];

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : initialNotes;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: [], color: '#ffffff' });
  const [currentTag, setCurrentTag] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOption, setSortOption] = useState('date');
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
      createdAt: new Date().toISOString(),
    };
    setNotes(prevNotes => [...prevNotes, newNoteWithId]);
    setNewNote({ title: '', content: '', tags: [], color: '#ffffff' });
    setCurrentTag('');
    setIsModalOpen(false);
  };

  const toggleNoteCompletion = (id) => {
    setNotes(prevNotes => prevNotes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const handleTagInput = (e) => {
    const value = e.target.value;
    if (value.endsWith(' ') && value.trim() !== '') {
      setNewNote(prev => ({
        ...prev,
        tags: [...prev.tags, value.trim()]
      }));
      setCurrentTag('');
    } else {
      setCurrentTag(value);
    }
  };

  const removeTag = (tagToRemove) => {
    setNewNote(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSelectedTag = (tag) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const sortNotes = (notesToSort) => {
    switch (sortOption) {
      case 'date':
        return notesToSort.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'alphabetical':
        return notesToSort.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return notesToSort;
    }
  };

  const filteredAndSortedNotes = sortNotes(notes.filter(note => 
    selectedTags.length === 0 || note.tags.some(tag => selectedTags.includes(tag))
  ));

  const renderNotes = (completed) => {
    return filteredAndSortedNotes
      .filter(note => note.completed === completed)
      .map(note => (
        <div key={note.id} style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px',
          marginBottom: '12px',
          backgroundColor: note.color,
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          transform: 'translateY(0)',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleNoteCompletion(note.id)}
            style={{ 
              marginRight: '12px',
              width: '18px',
              height: '18px',
              accentColor: '#285599'
            }}
            aria-label={`Mark note "${note.title}" as ${completed ? 'incomplete' : 'complete'}`}
          />
          <div style={{ flexGrow: 1, overflow: 'hidden' }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              marginBottom: '4px',
              color: '#333',
              textDecoration: completed ? 'line-through' : 'none'
            }}>{note.title}</h3>
            <p style={{ 
              fontSize: '14px', 
              color: '#555', 
              marginBottom: '8px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>{note.content}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {note.tags.map(tag => (
                <span key={tag} style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  color: '#285599',
                  backgroundColor: 'rgba(40, 85, 153, 0.1)',
                  padding: '2px 6px',
                  borderRadius: '12px'
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <button 
            onClick={() => deleteNote(note.id)} 
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '12px',
              padding: '4px',
              borderRadius: '50%',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            aria-label={`Delete note "${note.title}"`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      ));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 151px)',
      backgroundColor: '#f8f9fa',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        padding: '16px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#285599',
          margin: 0
        }}>Reading Notes</h2>
        <div>
          <label htmlFor="sort-select" style={{ marginRight: '8px', fontSize: '14px', color: '#666' }}>Sort by:</label>
          <select 
            id="sort-select"
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              padding: '6px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px',
              color: '#333',
              backgroundColor: '#fff'
            }}
          >
            <option value="date">Date</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
      <div style={{
        flexGrow: 1,
        overflowY: 'auto',
        padding: '16px'
      }}>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '12px',
            backgroundColor: '#285599',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '16px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e3c6e'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#285599'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add New Note
        </button>

        {notes.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#666', marginTop: '32px' }}>
            <p>No notes yet. Add your first note!</p>
          </div>
        ) : (
          <>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#285599'
            }}>Active Notes</h3>
            {renderNotes(false)}

            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginTop: '24px',
              marginBottom: '12px',
              color: '#285599'
            }}>Completed Notes</h3>
            {renderNotes(true)}
          </>
        )}
      </div>

      <div style={{
        padding: '12px 16px',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e0e0e0'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: '#285599'
        }}>Filter by Tags</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleSelectedTag(tag)}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selectedTags.includes(tag) ? '#285599' : '#e0e0e0',
                color: selectedTags.includes(tag) ? 'white' : '#333',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!selectedTags.includes(tag)) {
                  e.currentTarget.style.backgroundColor = '#d0d0d0';
                }
              }}
              onMouseLeave={(e) => {
                if (!selectedTags.includes(tag)) {
                  e.currentTarget.style.backgroundColor = '#e0e0e0';
                }
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div ref={modalRef} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            width: '90%',
            maxWidth: '400px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#285599'
            }}>Add a New Note</h3>
            <input
              type="text"
              placeholder="Note Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '12px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '16px'
              }}
            />
            <textarea
              placeholder="Note Content"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '12px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '16px',
                minHeight: '120px',
                resize: 'vertical'
              }}
            />
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '14px', marginRight: '8px', color: '#333' }}>Note Color:</label>
              <input
                type="color"
                value={newNote.color}
                onChange={(e) => setNewNote({ ...newNote, color: e.target.value })}
                style={{ verticalAlign: 'middle', width: '30px', height: '30px', padding: '0', border: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {newNote.tags.map(tag => (
                <span 
                  key={tag}
                  style={{
                    backgroundColor: '#e0e0e0',
                    color: '#333',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  #{tag}
                  <button 
                    onClick={() => removeTag(tag)} 
                    style={{
                      marginLeft: '6px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: '#666',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="#Add tags (space to add)"
              value={currentTag}
              onChange={handleTagInput}
              onKeyDown={(e) => {
                if (e.key === ' ' && currentTag.trim() !== '') {
                  e.preventDefault();
                  setNewNote(prev => ({
                    ...prev,
                    tags: [...prev.tags, currentTag.trim()]
                  }));
                  setCurrentTag('');
                }
              }}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '16px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  backgroundColor: '#f0f0f0',
                  color: '#333',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: '12px',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              >
                Cancel
              </button>
              <button
                onClick={addNote}
                style={{
                  backgroundColor: '#285599',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e3c6e'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#285599'}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;

