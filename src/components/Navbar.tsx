import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/matches">Matches</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
