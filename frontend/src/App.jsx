import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import FindNote from './pages/FindNote';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setNotes(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Failed to load notes. Please ensure the backend server is running.');
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (newNote) => {
    try {
      await axios.post(API_URL, newNote);
      fetchNotes(); // Refresh the list
      toast.success('Note added successfully!');
    } catch (err) {
      console.error('Error adding note:', err);
      toast.error('Failed to add note');
    }
  };

  const handleUpdateNote = async (id, updatedNote) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedNote);
      fetchNotes(); // Refresh the list
      toast.success('Note updated successfully!');
    } catch (err) {
      console.error('Error updating note:', err);
      toast.error('Failed to update note');
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes(); // Refresh the list
      toast.success('Note deleted!');
    } catch (err) {
      console.error('Error deleting note:', err);
      toast.error('Failed to delete note');
    }
  };

  return (
    <Router>
      {/* Gorgeous Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-purple-and-blue-abstract-painting-34358-large.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay"></div>

      <div className="app-container">
        {/* Floating Abstract 3D Assets for Extra Detail */}
        <motion.img 
          src="/sphere.png" 
          alt="Abstract Sphere"
          style={{
            position: 'fixed',
            top: '5%',
            right: '5%',
            width: '350px',
            height: '350px',
            objectFit: 'cover',
            borderRadius: '50%',
            opacity: 0.7,
            zIndex: 0,
            filter: 'blur(3px) drop-shadow(0 0 20px rgba(129, 140, 248, 0.4))',
            pointerEvents: 'none'
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            rotate: [0, 15, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.img 
          src="/torus.png" 
          alt="Abstract Torus"
          style={{
            position: 'fixed',
            bottom: '5%',
            left: '2%',
            width: '450px',
            height: '450px',
            objectFit: 'cover',
            borderRadius: '50%',
            opacity: 0.5,
            zIndex: 0,
            filter: 'blur(5px) drop-shadow(0 0 30px rgba(192, 132, 252, 0.3))',
            pointerEvents: 'none'
          }}
          animate={{
            y: [0, 50, 0],
            x: [0, -30, 0],
            rotate: [0, -20, 0]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(16px)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }
          }} 
        />

        <Navbar />

        <motion.header 
          className="header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ marginTop: '2rem' }}
        >
          <motion.h1 
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200% auto' }}
          >
            Employee Notes
          </motion.h1>
          <p>Dashboard for daily work notes</p>
        </motion.header>

        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Dashboard 
                    notes={notes} 
                    loading={loading} 
                    error={error}
                    handleAddNote={handleAddNote}
                    handleDeleteNote={handleDeleteNote}
                    handleUpdateNote={handleUpdateNote}
                  />
                } 
              />
              <Route path="/find" element={<FindNote />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
