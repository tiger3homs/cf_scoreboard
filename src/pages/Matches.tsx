import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

type MatchPlayer = {
  player_id: string;
  team: number | null;
  frags: number;
  deaths: number;
};

type Match = {
  id: string;
  date: string;
  description: string | null;
  match_players: MatchPlayer[]; // added this line
};

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          match_players (*)
        `)
        .order('date', { ascending: false });

      if (error) console.error(error);
      else setMatches(data as Match[]);
    };

    fetchMatches();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Matches</h1>
      {matches.map((match) => (
        <div key={match.id} style={{ marginBottom: '20px' }}>
          <h2>{new Date(match.date).toLocaleString()}</h2>
          <p>{match.description}</p>
          <ul>
            {match.match_players.map((mp: MatchPlayer) => ( // type mp here
              <li key={mp.player_id}>
                Player ID: {mp.player_id} | Team: {mp.team} | Frags: {mp.frags} | Deaths: {mp.deaths}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Matches;
