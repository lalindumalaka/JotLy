import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { useEntries } from '../context/EntryContext';
import MoodChart from '../components/MoodChart';
import EntryCard from '../components/EntryCard';

const Dashboard = () => {
  const { entries, moodStats, recentEntries, loading } = useEntries();

  const totalEntries = entries.length;
  const thisMonthEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    const now = new Date();
    return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
  }).length;

  const averageMood = moodStats.length > 0 
    ? moodStats.reduce((acc, stat) => acc + stat.count, 0) / moodStats.length 
    : 0;

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
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Jotly</h1>
        <p className="text-gray-600">Track your daily mood and journal your thoughts</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-100 rounded-lg">
              <BarChart3 className="text-primary-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Entries</p>
              <p className="text-2xl font-bold text-gray-800">{totalEntries}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-secondary-100 rounded-lg">
              <Calendar className="text-secondary-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-800">{thisMonthEntries}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Entries</p>
              <p className="text-2xl font-bold text-gray-800">{averageMood.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mood Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Mood Overview</h2>
          <Link to="/entries" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All →
          </Link>
        </div>
        {moodStats.length > 0 ? (
          <MoodChart data={moodStats} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No mood data available yet.</p>
            <p className="text-sm">Start journaling to see your mood trends!</p>
          </div>
        )}
      </div>

      {/* Recent Entries */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Entries</h2>
          <Link to="/entries" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All →
          </Link>
        </div>
        
        {recentEntries.length > 0 ? (
          <div className="space-y-4">
            {recentEntries.map((entry) => (
              <EntryCard key={entry._id} entry={entry} showActions={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No entries yet.</p>
            <p className="text-sm">Start your journaling journey today!</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="text-center">
        <Link
          to="/add"
          className="inline-flex items-center space-x-2 btn-primary text-lg px-8 py-3"
        >
          <Plus size={20} />
          <span>Add New Entry</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
