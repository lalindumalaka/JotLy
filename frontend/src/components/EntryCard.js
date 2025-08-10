import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Edit, Trash2, Calendar, Tag } from 'lucide-react';
import { useEntries } from '../context/EntryContext';

const EntryCard = ({ entry, showActions = true }) => {
  const { deleteEntry } = useEntries();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteEntry(entry._id);
      } catch (error) {
        console.error('Failed to delete entry:', error);
      }
    }
  };

  const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const formatTime = (date) => {
    return format(new Date(date), 'h:mm a');
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-3xl">{entry.mood}</span>
            <div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>{formatDate(entry.date)}</span>
                <span>•</span>
                <span>{formatTime(entry.date)}</span>
              </div>
            </div>
          </div>

          {/* Note */}
          <p className="text-gray-800 mb-4 leading-relaxed">{entry.note}</p>

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              <Tag size={16} className="text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="text-xs text-gray-500 space-y-1">
            <div>Created: {format(new Date(entry.createdAt), 'MMM dd, yyyy h:mm a')}</div>
            {entry.updatedAt !== entry.createdAt && (
              <div>Updated: {format(new Date(entry.updatedAt), 'MMM dd, yyyy h:mm a')}</div>
            )}
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center space-x-2 ml-4">
            <Link
              to={`/edit/${entry._id}`}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
              title="Edit entry"
            >
              <Edit size={18} />
            </Link>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Delete entry"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryCard;
