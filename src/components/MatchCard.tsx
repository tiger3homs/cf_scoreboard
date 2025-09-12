type Match = {
  id: number;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  date: string;
};

type MatchCardProps = {
  match: Match;
};

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <div className="match-card">
      <h3>{match.teamA} vs {match.teamB}</h3>
      <p>Score: {match.scoreA} - {match.scoreB}</p>
      <p>Date: {match.date}</p>
    </div>
  );
};

export default MatchCard;
