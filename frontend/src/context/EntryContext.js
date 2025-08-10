import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const EntryContext = createContext();

const initialState = {
  entries: [],
  loading: false,
  error: null,
  moodStats: [],
  recentEntries: []
};

const entryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_ENTRIES':
      return { ...state, entries: action.payload, loading: false, error: null };
    case 'ADD_ENTRY':
      return { ...state, entries: [action.payload, ...state.entries], loading: false, error: null };
    case 'UPDATE_ENTRY':
      return {
        ...state,
        entries: state.entries.map(entry =>
          entry._id === action.payload._id ? action.payload : entry
        ),
        loading: false,
        error: null
      };
    case 'DELETE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter(entry => entry._id !== action.payload),
        loading: false,
        error: null
      };
    case 'SET_MOOD_STATS':
      return { ...state, moodStats: action.payload };
    case 'SET_RECENT_ENTRIES':
      return { ...state, recentEntries: action.payload };
    default:
      return state;
  }
};

export const EntryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(entryReducer, initialState);

  // Fetch all entries
  const fetchEntries = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get(`${API_BASE_URL}/entries`);
      dispatch({ type: 'SET_ENTRIES', payload: response.data.data });
      
      // Set recent entries (last 5)
      const recent = response.data.data.slice(0, 5);
      dispatch({ type: 'SET_RECENT_ENTRIES', payload: recent });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.error || 'Failed to fetch entries' });
    }
  };

  // Fetch mood statistics
  const fetchMoodStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/entries/stats/mood`);
      dispatch({ type: 'SET_MOOD_STATS', payload: response.data.data });
    } catch (error) {
      console.error('Failed to fetch mood stats:', error);
    }
  };

  // Create new entry
  const createEntry = async (entryData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.post(`${API_BASE_URL}/entries`, entryData);
      dispatch({ type: 'ADD_ENTRY', payload: response.data.data });
      await fetchMoodStats();
      return response.data.data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.error || 'Failed to create entry' });
      throw error;
    }
  };

  // Update entry
  const updateEntry = async (id, entryData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.put(`${API_BASE_URL}/entries/${id}`, entryData);
      dispatch({ type: 'UPDATE_ENTRY', payload: response.data.data });
      await fetchMoodStats();
      return response.data.data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.error || 'Failed to update entry' });
      throw error;
    }
  };

  // Delete entry
  const deleteEntry = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await axios.delete(`${API_BASE_URL}/entries/${id}`);
      dispatch({ type: 'DELETE_ENTRY', payload: id });
      await fetchMoodStats();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.error || 'Failed to delete entry' });
      throw error;
    }
  };

  // Get single entry
  const getEntry = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/entries/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  // Search entries
  const searchEntries = async (filters) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const params = new URLSearchParams();
      if (filters.mood) params.append('mood', filters.mood);
      if (filters.tag) params.append('tag', filters.tag);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      
      const response = await axios.get(`${API_BASE_URL}/entries?${params.toString()}`);
      dispatch({ type: 'SET_ENTRIES', payload: response.data.data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.error || 'Failed to search entries' });
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  useEffect(() => {
    fetchEntries();
    fetchMoodStats();
  }, []);

  const value = {
    ...state,
    fetchEntries,
    fetchMoodStats,
    createEntry,
    updateEntry,
    deleteEntry,
    getEntry,
    searchEntries,
    clearError
  };

  return (
    <EntryContext.Provider value={value}>
      {children}
    </EntryContext.Provider>
  );
};

export const useEntries = () => {
  const context = useContext(EntryContext);
  if (!context) {
    throw new Error('useEntries must be used within an EntryProvider');
  }
  return context;
};
