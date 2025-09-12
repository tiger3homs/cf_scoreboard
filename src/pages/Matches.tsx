import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

type MatchPlayer = {
  player_id: string;
  player: {
    name: string;
  };
  team: number | null;
  frags: number;
  deaths: number;
};

type Match = {
  id: string;
  date: string;
  description: string | null;
  match_players: MatchPlayer[];
};

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          match_players (
            *,
            player:players!match_players_player_id_fkey ( name )
          )
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
      {matches.map((match) => {
        const team1 = match.match_players.filter(mp => mp.team === 1);
        const team2 = match.match_players.filter(mp => mp.team === 2);

        return (
          <div key={match.id} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{new Date(match.date).toLocaleString()}</h2>
            <p>{match.description}</p>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h3>Team 1</h3>
                <ul>
                  {team1.map(mp => (
                    <li key={mp.player_id}>
                      {mp.player.name} | Frags: {mp.frags} | Deaths: {mp.deaths}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>Team 2</h3>
                <ul>
                  {team2.map(mp => (
                    <li key={mp.player_id}>
                      {mp.player.name} | Frags: {mp.frags} | Deaths: {mp.deaths}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Matches;
