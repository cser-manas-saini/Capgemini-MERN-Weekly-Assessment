import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Hash } from 'lucide-react';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/notes';

const FindNote = () => {
  const [noteId, setNoteId] = useState('');
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!noteId.trim()) {
      toast.error('Please enter a Note ID');
      return;
    }

    setLoading(true);
    setError(null);
    setNote(null);

    try {
      const response = await axios.get(`${API_URL}/${noteId}`);
      setNote(response.data);
      toast.success('Note found successfully!');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        setError('Note not found. Please check the ID and try again.');
        toast.error('Note not found');
      } else {
        setError('An error occurred while searching for the note. Invalid ID format?');
        toast.error('Invalid ID or server error');
      }
    } finally {
      setLoading(false);
    }
  };

  // We can also allow updating from this view
  const handleUpdateNote = async (id, updatedNote) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedNote);
      setNote(response.data.note);
      toast.success('Note updated successfully!');
    } catch (err) {
      console.error('Error updating note:', err);
      toast.error('Failed to update note');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }}>
        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Hash size={24} color="#818cf8" /> Find Note by ID
        </h2>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter MongoDB Object ID (e.g., 6612ab45...)"
            value={noteId}
            onChange={(e) => setNoteId(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ width: 'auto' }} disabled={loading}>
            <Search size={18} />
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p>{error}</p>
          </motion.div>
        )}

        {note && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <NoteCard note={note} onUpdate={handleUpdateNote} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FindNote;
