// Week 3 - useState
// Week 4 - useEffect
// Week 6 - useMemo for filtering
import { useState, useEffect, useMemo } from "react";
import { useHabits } from "../context/HabitContext";
import HabitList from "../components/HabitList";
import { todayStr } from "../utils/streak";

function Home() {
  const { habits } = useHabits();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Week 4 - useEffect: Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const today = todayStr();

  // Week 6 - useMemo: Filter habits efficiently
  const filteredHabits = useMemo(() => {
    return habits.filter((habit) => {
      const matchesCategory = category === "All" || habit.category === category;
      const matchesSearch = habit.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [habits, category, search]);

  // Stats
  const totalHabits = habits.length;
  const doneToday = habits.filter((h) => h.history.includes(today)).length;
  const pendingToday = totalHabits - doneToday;
  const completionRate = totalHabits === 0 ? 0 : Math.round((doneToday / totalHabits) * 100);

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">🔥 My Habits</h1>
          <p className="page-subtitle">🕐 {time}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <h3>{totalHabits}</h3>
          <p>Total Habits</p>
        </div>
        <div className="stat-card stat-progress">
          <h3>{doneToday}</h3>
          <p>Done Today</p>
        </div>
        <div className="stat-card stat-pending">
          <h3>{pendingToday}</h3>
          <p>Not Done Today</p>
        </div>
        <div className="stat-card stat-done">
          <h3>{completionRate}%</h3>
          <p>Today's Completion</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="🔍 Search habits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
          {["All", "Health", "Study", "Work", "Other"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`filter-btn ${category === c ? "filter-active" : ""}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Habit List */}
      <HabitList
        habits={filteredHabits}
        emptyMessage="No habits match your filter. Add a new habit!"
      />
    </div>
  );
}

export default Home;
