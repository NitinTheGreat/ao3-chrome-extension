import { useState, useRef, useEffect } from 'react';

const initialNotes = [
  { id: '1', title: 'The Shoebox Project', tags: ['Humor', 'Drama'], completed: false },
  { id: '2', title: 'Twist and Shout', tags: ['Angst', 'Historical', 'Tragedy'], completed: false },
  { id: '3', title: 'Everyday Love in Stockholm', tags: ['Humor', 'Hurt', 'Loki'], completed: false },
  { id: '4', title: 'Everyday Love in Stockholm', tags: ['Humor', 'Hurt', 'Loki'], completed: false },
  { id: '5', title: 'Crying Lightning', tags: ['Angst', 'Skugrou'], completed: false },
  { id: '6', title: 'The Shoebox Project', tags: ['Humor', 'Drama'], completed: true },
];

export default function Component() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : initialNotes;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', tags: [] });
  const [currentTag, setCurrentTag] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
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

  const deleteNote = id => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
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

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

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

  const toggleSelectedTag = tag => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const sortedNotes = [...notes].sort((a, b) => {
    const aMatchCount = a.tags.filter(tag =>
      selectedTags.includes(tag) || tag.toLowerCase().includes(searchTag.toLowerCase())
    ).length;
    const bMatchCount = b.tags.filter(tag =>
      selectedTags.includes(tag) || tag.toLowerCase().includes(searchTag.toLowerCase())
    ).length;
    if (aMatchCount !== bMatchCount) {
      return bMatchCount - aMatchCount; // Sort by match count first
    }
    // If match counts are equal, maintain original order
    return notes.indexOf(a) - notes.indexOf(b);
  });

  const renderNotes = completed => {
    return sortedNotes
      .filter(note => note.completed === completed)
      .map(note => (
        <div
          key={note.id}
          style={styles.noteContainer}
        >
          <div style={styles.noteHeader}>
            <div style={styles.noteTitleContainer}>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={completed}
                onChange={() => toggleNoteCompletion(note.id)}
              />
              <span style={{ ...styles.noteTitle, ...(completed ? styles.lineThrough : {}) }}>
                {note.title}
              </span>
            </div>
            <span style={styles.deleteButton} onClick={() => deleteNote(note.id)}>
              Delete
            </span>
          </div>
          <p style={styles.tagContainer}>
            {note.tags.map(tag => (
              <span
                key={tag}
                style={{
                  ...styles.tag,
                  ...(selectedTags.includes(tag) || tag.toLowerCase().includes(searchTag.toLowerCase())
                    ? styles.tagSelected
                    : {}),
                }}
              >
                #{tag}
              </span>
            ))}
          </p>
        </div>
      ));
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.header}>Notes</h1>
        <div>
            <h2 style={styles.subHeader}>Search Tags :</h2>
            <div style={styles.searchContainer}>
              <div style={styles.searchInputContainer}>
                <input
                  type="text"
                  placeholder="Search Tags"
                  style={styles.searchInput}
                  value={searchTag}
                  onChange={e => setSearchTag(e.target.value)}
                />
                <span style={styles.searchIcon}>🔍</span>
              </div>
            </div>
          </div>
        <div style={styles.gridContainer}>
          <div>
            <h2 style={styles.subHeader}>Manage your Reading list :</h2>
            <div
              style={styles.addNoteContainer}
              onClick={() => setIsModalOpen(true)}
            >
              <div style={styles.noteHeader}>
                <div style={styles.noteTitleContainer}>
                  <input type="checkbox" style={styles.checkbox} disabled />
                  <span style={styles.placeholderText}>Add Name</span>
                </div>
                <span style={styles.addButton}>+</span>
              </div>
              <p style={styles.placeholderTag}>#Add Tags</p>
            </div>

            {renderNotes(false)}

            <h2 style={styles.subHeader}>Completed :</h2>
            {renderNotes(true)}
          </div>

          {/* <div>
            <h2 style={styles.subHeader}>Search Tags :</h2>
            <div style={styles.searchContainer}>
              <div style={styles.searchInputContainer}>
                <input
                  type="text"
                  placeholder="Search Tags"
                  style={styles.searchInput}
                  value={searchTag}
                  onChange={e => setSearchTag(e.target.value)}
                />
                <span style={styles.searchIcon}>🔍</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div ref={modalRef} style={styles.modalContent}>
            <h3 style={styles.modalHeader}>Add a new Note :</h3>
            <div style={styles.inputContainer}>
              <input
                type="text"
                placeholder="Add name"
                style={styles.input}
                value={newNote.title}
                onChange={e => setNewNote({ ...newNote, title: e.target.value })}
              />
              <span style={styles.editIcon}>✏️</span>
            </div>
            <div style={styles.tagInputContainer}>
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
                style={styles.input}
                value={currentTag}
                onChange={handleTagInput}
              />
            </div>
            <div style={styles.addButtonContainer}>
              <button style={styles.modalAddButton} onClick={addNote}>
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    padding: '1rem',
    overflow: 'auto',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    marginBottom: '250px',
  },
  header: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1E3A8A',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
  },
  subHeader: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#1E40AF',
  },
  addNoteContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: '0.5rem',
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid #E5E7EB',
    cursor: 'pointer',
  },
  noteContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: '0.5rem',
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid #E5E7EB',
  },
  noteHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noteTitleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: '0.5rem',
  },
  noteTitle: {
    fontSize: '1rem',
  },
  lineThrough: {
    textDecoration: 'line-through',
  },
  deleteButton: {
    color: '#9CA3AF',
    cursor: 'pointer',
  },
  tagContainer: {
    fontSize: '0.875rem',
    color: '#6B7280',
    marginTop: '0.25rem',
  },
  tag: {
    display: 'inline-block',
    marginRight: '0.25rem',
  },
  tagSelected: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  addButton: {
    color: '#9CA3AF',
  },
  placeholderTag: {
    fontSize: '0.875rem',
    color: '#9CA3AF',
    marginTop: '0.25rem',
  },
  searchContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: '0.5rem',
    padding: '1rem',
    border: '1px solid #E5E7EB',
  },
  searchInputContainer: {
    position: 'relative',
    marginBottom: '1rem',
  },
  searchInput: {
    width: '80%',
    paddingLeft: '1rem',
    paddingRight: '2.5rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    borderRadius: '9999px',
    border: '1px solid #D1D5DB',
    outline: 'none',
    focus: {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
    },
  },
  searchIcon: {
    position: 'absolute',
    right: '0.75rem',
    top: '0.5rem',
    color: '#9CA3AF',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '1rem 0 0 0',
    width: '420px',
    height: '550px',
    padding: '2rem',
  },
  modalHeader: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#1E3A8A',
  },
  inputContainer: {
    marginBottom: '1.5rem',
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    paddingRight: '2rem',
    border: '1px solid #D1D5DB',
  },
  editIcon: {
    position: 'absolute',
    right: '0.5rem',
    top: '0.5rem',
    color: '#9CA3AF',
  },
  tagInputContainer: {
    marginBottom: '1.5rem',
  },
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  tagInModal: {
    backgroundColor: '#E5E7EB',
    color: '#374151',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
  },
  removeTagButton: {
    marginLeft: '0.25rem',
    color: '#6B7280',
    cursor: 'pointer',
  },
  addButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  modalAddButton: {
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '0.5rem 1.5rem',
    borderRadius: '0.375rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
};
