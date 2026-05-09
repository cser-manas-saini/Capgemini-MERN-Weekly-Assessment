import React, { useState } from 'react';
import { Calendar, Trash2, Edit2, Save, X, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const NoteCard = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDesc, setEditDesc] = useState(note.description);

  const timeAgo = formatDistanceToNow(new Date(note.createdAt), { addSuffix: true });

  const handleSave = () => {
    if (!editTitle.trim() || !editDesc.trim()) return;
    onUpdate(note._id, { title: editTitle, description: editDesc });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditDesc(note.description);
    setIsEditing(false);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="glass-panel note-card"
    >
      {isEditing ? (
        <div className="note-edit-form">
          <input 
            type="text" 
            className="form-control" 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ marginBottom: '5px' }}
            autoFocus
          />
          <textarea 
            className="form-control" 
            value={editDesc} 
            onChange={(e) => setEditDesc(e.target.value)}
            style={{ marginBottom: '5px', minHeight: '100px' }}
          />
          <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
            <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1, padding: '0.6rem' }}>
              <Save size={16} /> Save
            </button>
            <button className="btn btn-primary" onClick={handleCancel} style={{ flex: 1, padding: '0.6rem', background: 'rgba(255,255,255,0.1)', boxShadow: 'none' }}>
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="note-header">
            <h3 className="note-title">{note.title}</h3>
            <div className="note-actions">
              {onUpdate && (
                <button 
                  className="btn-icon" 
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit note"
                  title="Edit Note"
                >
                  <Edit2 size={16} />
                </button>
              )}
              {onDelete && (
                <button 
                  className="btn-icon danger" 
                  onClick={() => onDelete(note._id)}
                  aria-label="Delete note"
                  title="Delete Note"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="note-description">
            {note.description}
          </div>
          <div className="note-footer">
            <Clock size={14} style={{ color: '#818cf8' }} />
            <span>Added {timeAgo}</span>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default NoteCard;
