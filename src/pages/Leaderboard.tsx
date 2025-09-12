// src/pages/Leaderboard.tsx
import React from 'react';

type TeamStanding = {
  id: number;
  name: string;
  wins: number;
  losses: number;
  points: number;
};

const leaderboard: TeamStanding[] = [
  { id: 1, name: 'Team Alpha', wins: 3, losses: 1, points: 9 },
  { id: 2, name: 'Team Beta', wins: 2, losses: 2, points: 6 },
  { id: 3, name: 'Team Gamma', wins: 1, losses: 3, points: 3 },
];

const Leaderboard: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Leaderboard</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Team</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map(team => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
