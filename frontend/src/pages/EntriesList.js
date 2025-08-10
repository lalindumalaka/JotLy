import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Calendar, Tag, Smile } from 'lucide-react';
import { useEntries } from '../context/EntryContext';
import EntryCard from '../components/EntryCard';
import MoodChart from '../components/MoodChart';

const EntriesList = () => {
  const { entries, loading, searchEntries, moodStats } = useEntries();
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [chartType, setChartType] = useState('bar');

  const moods = ['😊', '😔', '😎', '😡', '😴', '🤔', '😍', '😢', '😤', '😇'];

  useEffect(() => {
    setFilteredEntries(entries);
  }, [entries]);

  const handleSearch = async () => {
    const filters = {};
    if (selectedMood) filters.mood = selectedMood;
    if (selectedTag) filters.tag = selectedTag;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    if (Object.keys(filters).length > 0) {
      await searchEntries(filters);
    } else {
      // If no filters, search by text in notes and tags
      const filtered = entries.filter(entry => {
        const matchesSearch = entry.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return searchTerm === '' || matchesSearch;
      });
      setFilteredEntries(filtered);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMood('');
    setSelectedTag('');
    setStartDate('');
    setEndDate('');
    setFilteredEntries(entries);
  };

  const getUniqueTags = () => {
    const tags = entries.flatMap(entry => entry.tags || []);
    return [...new Set(tags)];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Journal Entries</h1>
          <p className="text-gray-600">Browse and manage your daily journal entries</p>
        </div>
        <Link
          to="/add"
          className="btn-primary inline-flex items-center space-x-2 mt-4 md:mt-0"
        >
          <Plus size={20} />
          <span>Add Entry</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Mood Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Smile size={16} className="inline mr-1" />
                  Mood
                </label>
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Moods</option>
                  {moods.map((mood) => (
                    <option key={mood} value={mood}>
                      {mood}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag size={16} className="inline mr-1" />
                  Tag
                </label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Tags</option>
                  {getUniqueTags().map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-1" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="input-field"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-1" />
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center space-x-3 mt-4">
              <button onClick={handleSearch} className="btn-primary">
                Apply Filters
              </button>
              <button onClick={clearFilters} className="btn-secondary">
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Entries Count */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Entries Overview</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {filteredEntries.length}
            </div>
            <p className="text-gray-600">
              {filteredEntries.length === 1 ? 'entry' : 'entries'} found
            </p>
          </div>
        </div>

        {/* Chart Type Toggle */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Mood Distribution</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  chartType === 'bar'
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Bar
              </button>
              <button
                onClick={() => setChartType('doughnut')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  chartType === 'doughnut'
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Doughnut
              </button>
            </div>
          </div>
          <MoodChart data={moodStats} type={chartType} />
        </div>
      </div>

      {/* Entries List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">All Entries</h3>
        
        {filteredEntries.length > 0 ? (
          <div className="space-y-6">
            {filteredEntries.map((entry) => (
              <EntryCard key={entry._id} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No entries found</p>
            <p className="text-sm mb-4">
              {searchTerm || selectedMood || selectedTag || startDate || endDate
                ? 'Try adjusting your search criteria'
                : 'Start journaling to create your first entry!'}
            </p>
            {!searchTerm && !selectedMood && !selectedTag && !startDate && !endDate && (
              <Link to="/add" className="btn-primary">
                Create First Entry
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EntriesList;
