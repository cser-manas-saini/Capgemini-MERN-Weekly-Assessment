import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NoteCard from './NoteCard';
import { FileQuestion } from 'lucide-react';

const NoteList = ({ notes, onDelete, onUpdate }) => {
  if (!notes || notes.length === 0) {
    return (
      <motion.div 
        className="empty-state"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
      >
        <FileQuestion size={48} color="rgba(255,255,255,0.2)" />
        <p>No notes available. Add one to get started!</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="notes-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <AnimatePresence>
        {notes.map((note) => (
          <NoteCard 
            key={note._id} 
            note={note} 
            onDelete={onDelete} 
            onUpdate={onUpdate}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default NoteList;
