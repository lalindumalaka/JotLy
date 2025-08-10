import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Tag, Smile, FileText, ArrowLeft, Loader } from 'lucide-react';
import { useEntries } from '../context/EntryContext';

const EditEntry = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getEntry, updateEntry, loading } = useEntries();
  
  const [formData, setFormData] = useState({
    date: '',
    mood: '',
    note: '',
    tags: []
  });
  
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});
  const [fetching, setFetching] = useState(true);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😎', label: 'Cool' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '🤔', label: 'Thoughtful' },
    { emoji: '😍', label: 'Loving' },
    { emoji: '😢', label: 'Crying' },
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '😇', label: 'Blessed' }
  ];

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const entry = await getEntry(id);
        setFormData({
          date: new Date(entry.date).toISOString().split('T')[0],
          mood: entry.mood,
          note: entry.note,
          tags: entry.tags || []
        });
      } catch (error) {
        console.error('Failed to fetch entry:', error);
        navigate('/entries');
      } finally {
        setFetching(false);
      }
    };

    fetchEntry();
  }, [id, getEntry, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.mood) {
      newErrors.mood = 'Please select a mood';
    }
    
    if (!formData.note.trim()) {
      newErrors.note = 'Please write a note';
    } else if (formData.note.trim().length < 10) {
      newErrors.note = 'Note must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await updateEntry(id, {
        ...formData,
        date: new Date(formData.date)
      });
      navigate('/entries');
    } catch (error) {
      console.error('Failed to update entry:', error);
    }
  };

  const handleMoodSelect = (mood) => {
    setFormData(prev => ({ ...prev, mood }));
    setErrors(prev => ({ ...prev, mood: '' }));
  };

  const handleTagAdd = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading entry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Edit Entry</h1>
          <p className="text-gray-600">Update your journal entry</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Date Selection */}
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Calendar size={16} className="inline mr-2" />
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="input-field"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Mood Selection */}
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Smile size={16} className="inline mr-2" />
            How are you feeling today?
          </label>
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.emoji}
                type="button"
                onClick={() => handleMoodSelect(mood.emoji)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  formData.mood === mood.emoji
                    ? 'border-primary-500 bg-primary-50 scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-xs text-gray-600">{mood.label}</div>
              </button>
            ))}
          </div>
          {errors.mood && (
            <p className="text-red-600 text-sm mt-2">{errors.mood}</p>
          )}
        </div>

        {/* Note Input */}
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <FileText size={16} className="inline mr-2" />
            What's on your mind?
          </label>
          <textarea
            value={formData.note}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, note: e.target.value }));
              setErrors(prev => ({ ...prev, note: '' }));
            }}
            placeholder="Write about your day, thoughts, feelings, or anything you'd like to remember..."
            rows={6}
            className="input-field resize-none"
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-2">
            {errors.note && (
              <p className="text-red-600 text-sm">{errors.note}</p>
            )}
            <span className="text-sm text-gray-500 ml-auto">
              {formData.note.length}/1000
            </span>
          </div>
        </div>

        {/* Tags Input */}
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Tag size={16} className="inline mr-2" />
            Tags (optional)
          </label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a tag and press Enter..."
              className="input-field flex-1"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="btn-secondary px-4"
            >
              Add
            </button>
          </div>
          
          {/* Tags Display */}
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="ml-1 hover:text-primary-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Entry'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEntry;
