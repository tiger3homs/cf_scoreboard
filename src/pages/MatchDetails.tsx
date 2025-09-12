// src/pages/MatchDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import MatchCard from '../components/MatchCard';

const matches = [
  { id: 1, teamA: 'Team Alpha', teamB: 'Team Beta', scoreA: 16, scoreB: 12, date: '2025-09-15' },
  { id: 2, teamA: 'Team Gamma', teamB: 'Team Delta', scoreA: 14, scoreB: 16, date: '2025-09-16' },
  { id: 3, teamA: 'Team Omega', teamB: 'Team Sigma', scoreA: 16, scoreB: 8, date: '2025-09-17' },
];

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const match = matches.find(m => m.id === Number(id));

  if (!match) return <p>Match not found</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Match Details</h1>
      <MatchCard match={match} />
      <p>Additional stats and info can be displayed here.</p>
    </div>
  );
};

export default MatchDetails;
