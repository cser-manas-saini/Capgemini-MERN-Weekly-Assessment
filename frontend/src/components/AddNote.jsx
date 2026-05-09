import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const AddNote = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    await onAdd({ title, description });
    setTitle('');
    setDescription('');
    setIsSubmitting(false);
  };

  return (
    <div className="add-note-container">
      <div className="glass-panel">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="e.g., Completed React Practice"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-control"
              placeholder="e.g., Learned useEffect and API integration..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            <Plus size={20} />
            {isSubmitting ? 'Adding...' : 'Add Note'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
