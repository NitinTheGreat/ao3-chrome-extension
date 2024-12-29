import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialNotes = [];

const Notes = () => {
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
      completed: false
    };
    setNotes(prevNotes => [...prevNotes, newNoteWithId]);
    setNewNote({ title: '', tags: [] });
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

  const sortedNotes = [...notes].sort((a, b) => {
    const aMatchCount = a.tags.filter(tag => selectedTags.includes(tag)).length;
    const bMatchCount = b.tags.filter(tag => selectedTags.includes(tag)).length;
    if (aMatchCount !== bMatchCount) {
      return bMatchCount - aMatchCount;
    }
    return notes.indexOf(a) - notes.indexOf(b);
  });

  const renderNotes = (completed) => {
    return sortedNotes
      .filter(note => note.completed === completed)
      .map(note => (
        <motion.div 
          key={note.id} 
          className="flex h-auto px-4 py-2 items-center self-stretch bg-white mb-2 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <input
            type="checkbox"
            className="w-4 h-4 mr-2 rounded border border-[rgba(0,0,0,0.80)] bg-[#EEE]"
            checked={completed}
            onChange={() => toggleNoteCompletion(note.id)}
          />
          <div className="flex-grow overflow-hidden">
            <span className={`text-sm ${completed ? "line-through" : ""}`}>{note.title}</span>
            <p className="text-xs text-gray-400 mt-1 truncate">
              {note.tags.map(tag => (
                <span 
                  key={tag} 
                  className={`inline-block mr-1 ${
                    selectedTags.includes(tag) ? 'text-blue-500 font-bold' : ''
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </p>
          </div>
          <button onClick={() => deleteNote(note.id)} className="ml-2 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </motion.div>
      ));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-151px)] bg-gray-100 overflow-hidden">
      <div className="flex-grow overflow-y-auto px-4 py-4">
        <h2 className="text-lg font-semibold mb-2 text-blue-700">Reading List</h2>
        <motion.div 
          className="flex w-full h-12 px-4 items-center gap-2 rounded-lg border border-dashed border-[#B0B0B0] bg-white mb-4 cursor-pointer" 
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 10V38M10 24H38" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-gray-500 text-sm">Add Note</span>
        </motion.div>

        {notes.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No notes yet. Add your first note!</p>
          </div>
        ) : (
          <>
            <AnimatePresence>
              {renderNotes(false)}
            </AnimatePresence>

            <h2 className="text-lg font-semibold mb-2 mt-4 text-blue-700">Completed</h2>
            <AnimatePresence>
              {renderNotes(true)}
            </AnimatePresence>
          </>
        )}
      </div>

      <div className="px-4 py-2 bg-white border-t">
        <h2 className="text-sm font-semibold mb-2 text-blue-700">Tags</h2>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search Tags"
            className="w-full p-1 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
          {allTags.filter(tag => tag.toLowerCase().includes(searchTag.toLowerCase())).map(tag => (
            <button
              key={tag}
              className={`px-2 py-1 rounded-full text-xs ${
                selectedTags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => toggleSelectedTag(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              ref={modalRef} 
              className="bg-white rounded-xl w-full max-w-[300px] p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h3 className="text-lg font-bold mb-4 text-blue-900">Add a new Note</h3>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Add name"
                  className="w-full p-2 border rounded-md text-sm"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {newNote.tags.map(tag => (
                    <span 
                      key={tag}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center"
                    >
                      #{tag}
                      <button 
                        onClick={() => removeTag(tag)} 
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="#Add tags"
                  className="w-full p-2 border rounded-md text-sm"
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
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-[#285599] text-white px-4 py-2 rounded-md text-sm font-semibold"
                  onClick={addNote}
                >
                  Add Note
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notes;

