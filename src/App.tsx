// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Matches from './pages/Matches';
import MatchDetails from './pages/MatchDetails';
import Teams from './pages/Teams';
import Leaderboard from './pages/Leaderboard';
import SubtitleFetcher from './components/SubtitleFetcher';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/matches/:id" element={<MatchDetails />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/subtitles" element={<SubtitleFetcher />} />
      </Routes>
    </Router>
  );
};

export default App;
