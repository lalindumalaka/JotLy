import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import EntriesList from './pages/EntriesList';
import AddEntry from './pages/AddEntry';
import EditEntry from './pages/EditEntry';
import { EntryProvider } from './context/EntryContext';

function App() {
  return (
    <EntryProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/entries" element={<EntriesList />} />
              <Route path="/add" element={<AddEntry />} />
              <Route path="/edit/:id" element={<EditEntry />} />
            </Routes>
          </main>
        </div>
      </Router>
    </EntryProvider>
  );
}

export default App;
