// Week 2 - Components & Props
// Week 5 - React Router Navigation
import { Link, useLocation } from "react-router-dom";
import { useHabits } from "../context/HabitContext";
import { todayStr } from "../utils/streak";

function Navbar() {
  const location = useLocation();
  const { habits } = useHabits();
  const today = todayStr();
  const doneToday = habits.filter((h) => h.history.includes(today)).length;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🔥</span>
        <span className="brand-name">HabitFlow</span>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            🏠 Home
          </Link>
        </li>
        <li>
          <Link to="/add" className={location.pathname === "/add" ? "active" : ""}>
            ➕ Add Habit
          </Link>
        </li>
        <li>
          <Link to="/stats" className={location.pathname === "/stats" ? "active" : ""}>
            📊 Stats
          </Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
            ℹ️ About
          </Link>
        </li>
      </ul>
      <div className="navbar-badge">
        <span className="badge">{doneToday}/{habits.length} done today</span>
      </div>
    </nav>
  );
}

export default Navbar;
