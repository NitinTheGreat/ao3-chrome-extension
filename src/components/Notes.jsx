import { useState, useRef, useEffect } from 'react'

const initialNotes = [
  { id: '1', title: 'The Shoebox Project', tags: ['Humor', 'Drama'], completed: false },
  { id: '2', title: 'Twist and Shout', tags: ['Angst', 'Historical', 'Tragedy'], completed: false },
  { id: '3', title: 'Everyday Love in Stockholm', tags: ['Humor', 'Hurt', 'Loki'], completed: false },
  { id: '4', title: 'Everyday Love in Stockholm', tags: ['Humor', 'Hurt', 'Loki'], completed: false },
  { id: '5', title: 'Crying Lightning', tags: ['Angst', 'Skugrou'], completed: false },
  { id: '6', title: 'The Shoebox Project', tags: ['Humor', 'Drama'], completed: true },
]

export default function Component() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes')
    return savedNotes ? JSON.parse(savedNotes) : initialNotes
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', tags: [] })
  const [currentTag, setCurrentTag] = useState('')
  const [searchTag, setSearchTag] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const modalRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (newNote.title.trim() === '') return
    const newNoteWithId = {
      ...newNote,
      id: Date.now().toString(),
      completed: false
    }
    setNotes(prevNotes => [...prevNotes, newNoteWithId])
    setNewNote({ title: '', tags: [] })
    setCurrentTag('')
    setIsModalOpen(false)
  }

  const toggleNoteCompletion = (id) => {
    setNotes(prevNotes => prevNotes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    ))
  }

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  const handleTagInput = (e) => {
    const value = e.target.value
    if (value.endsWith(' ') && value.trim() !== '') {
      setNewNote(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag('')
    } else {
      setCurrentTag(value)
    }
  }

  const removeTag = (tagToRemove) => {
    setNewNote(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)))

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleSelectedTag = (tag) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    )
  }

  const sortedNotes = [...notes].sort((a, b) => {
    const aMatchCount = a.tags.filter(tag => 
      selectedTags.includes(tag) || tag.toLowerCase().includes(searchTag.toLowerCase())
    ).length
    const bMatchCount = b.tags.filter(tag => 
      selectedTags.includes(tag) || tag.toLowerCase().includes(searchTag.toLowerCase())
    ).length
    if (aMatchCount !== bMatchCount) {
      return bMatchCount - aMatchCount // Sort by match count first
    }
    // If match counts are equal, maintain original order
    return notes.indexOf(a) - notes.indexOf(b)
  })

  const renderNotes = (completed) => {
    return sortedNotes
      .filter(note => note.completed === completed)
      .map(note => (
        <div key={note.id} className="bg-gray-100 rounded-lg shadow p-4 mb-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={completed}
                onChange={() => toggleNoteCompletion(note.id)}
              />
              <span className={completed ? "line-through" : ""}>{note.title}</span>
            </div>
            <span className="text-gray-400 cursor-pointer" onClick={() => deleteNote(note.id)}>Delete</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            {note.tags.map(tag => (
              <span 
                key={tag} 
                className={`inline-block mr-1 ${
                  selectedTags.includes(tag) || tag.toLowerCase().includes(searchTag.toLowerCase()) 
                    ? 'text-blue-500 font-bold' 
                    : ''
                }`}
              >
                #{tag}
              </span>
            ))}
          </p>
        </div>
      ))
  }

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-900">Notes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2 text-blue-700">Manage your Reading list :</h2>
            <div className="bg-gray-100 rounded-lg shadow p-4 mb-4 border border-gray-200 cursor-pointer" onClick={() => setIsModalOpen(true)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" disabled />
                  <span className="text-gray-500">Add Name</span>
                </div>
                <span className="text-gray-400">+</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">#Add Tags</p>
            </div>

            {renderNotes(false)}

            <h2 className="text-lg font-semibold mb-2 mt-6 text-blue-700">Completed :</h2>
            {renderNotes(true)}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-blue-700">Search Tags :</h2>
            <div className="bg-gray-100 rounded-lg shadow p-4 border border-gray-200">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search Tags"
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                />
                <span className="absolute right-3 top-2 text-gray-400">🔍</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-tl-xl w-[420px] h-[550px] p-8">
            <h3 className="text-xl font-bold mb-6 text-blue-900">Add a new Note :</h3>
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Add name"
                className="w-full p-2 border rounded-md pr-8"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <span className="absolute right-2 top-2 text-gray-400">✏️</span>
            </div>
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-2">
                {newNote.tags.map(tag => (
                  <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center">
                    #{tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                  </span>
                ))}
</div>
              <input
                type="text"
                placeholder="#Add tags"
                className="w-full p-2 border rounded-md"
                value={currentTag}
                onChange={handleTagInput}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold"
                onClick={addNote}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}