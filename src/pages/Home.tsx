// src/pages/Home.tsx
import React from 'react';
import MatchCard from '../components/MatchCard';

const featuredMatch = {
  id: 1,
  teamA: 'Team Alpha',
  teamB: 'Team Beta',
  scoreA: 16,
  scoreB: 12,
  date: '2025-09-15',
};

const Home: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Crossfire League - Counter-Strike 1.6 Tournament</h1>
      <p>Check out the latest match results below!</p>
      <h2>Featured Match</h2>
      <MatchCard match={featuredMatch} />
    </div>
  );
};

export default Home;
