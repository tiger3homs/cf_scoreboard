// src/pages/Teams.tsx
import React from 'react';

type Player = {
  id: number;
  name: string;
  role: string;
};

type Team = {
  id: number;
  name: string;
  players: Player[];
};

const teams: Team[] = [
  {
    id: 1,
    name: 'Team Alpha',
    players: [
      { id: 1, name: 'PlayerA1', role: 'Captain' },
      { id: 2, name: 'PlayerA2', role: 'Sniper' },
    ],
  },
  {
    id: 2,
    name: 'Team Beta',
    players: [
      { id: 1, name: 'PlayerB1', role: 'Leader' },
      { id: 2, name: 'PlayerB2', role: 'Rifle' },
    ],
  },
];

const Teams: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Teams</h1>
      {teams.map(team => (
        <div key={team.id} style={{ marginBottom: '20px' }}>
          <h2>{team.name}</h2>
          <ul>
            {team.players.map(player => (
              <li key={player.id}>
                {player.name} - {player.role}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Teams;
