import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import AddNote from '../components/AddNote';
import NoteList from '../components/NoteList';

const Dashboard = ({ notes, loading, error, handleAddNote, handleDeleteNote, handleUpdateNote }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter notes by search query
  let filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort notes
  filteredNotes.sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="controls-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="add-note-container">
          <AddNote onAdd={handleAddNote} />
        </div>
        
        <div className="search-container">
          <div className="glass-panel" style={{ padding: '1.5rem', height: '100%' }}>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Search size={18} /> Search Notes
              </label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search by title or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter size={18} /> Sort By
              </label>
              <select 
                className="form-control" 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ cursor: 'pointer' }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p>{error}</p>
        </motion.div>
      )}

      {loading ? (
        <div className="loading">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            style={{ display: 'inline-block', marginBottom: '1rem' }}
          >
            <div style={{ width: 40, height: 40, border: '4px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', borderRadius: '50%' }} />
          </motion.div>
          <p>Loading your notes...</p>
        </div>
      ) : (
        !error && <NoteList notes={filteredNotes} onDelete={handleDeleteNote} onUpdate={handleUpdateNote} />
      )}
    </motion.div>
  );
};

export default Dashboard;
