// Week 5 - React Router page
// Week 6 - useMemo
import { useMemo } from "react";
import { useHabits } from "../context/HabitContext";
import { calculateStreaks } from "../utils/streak";

function Stats() {
  const { habits } = useHabits();

  // Week 6 - useMemo: derive per-habit streaks + category breakdown once per habits change
  const habitStreaks = useMemo(
    () =>
      habits.map((h) => ({
        ...h,
        ...calculateStreaks(h.history),
      })),
    [habits]
  );

  const bestStreakHabit = useMemo(() => {
    if (!habitStreaks.length) return null;
    return habitStreaks.reduce((best, h) =>
      h.longestStreak > (best?.longestStreak || 0) ? h : best,
      null
    );
  }, [habitStreaks]);

  const categoryBreakdown = useMemo(() => {
    const counts = {};
    habits.forEach((h) => {
      counts[h.category] = (counts[h.category] || 0) + 1;
    });
    return counts;
  }, [habits]);

  const totalCompletions = useMemo(
    () => habits.reduce((sum, h) => sum + h.history.length, 0),
    [habits]
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">📊 Your Stats</h1>
        <p className="page-subtitle">A summary of your habit-tracking journey</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-total">
          <h3>{habits.length}</h3>
          <p>Habits Tracked</p>
        </div>
        <div className="stat-card stat-progress">
          <h3>{totalCompletions}</h3>
          <p>Total Completions</p>
        </div>
        <div className="stat-card stat-done">
          <h3>{bestStreakHabit ? bestStreakHabit.longestStreak : 0}</h3>
          <p>Longest Streak</p>
        </div>
      </div>

      {bestStreakHabit && (
        <div className="about-card">
          <h2>🏆 Best Performing Habit</h2>
          <p>
            <strong>{bestStreakHabit.name}</strong> — longest streak of{" "}
            {bestStreakHabit.longestStreak} day(s), current streak of{" "}
            {bestStreakHabit.currentStreak} day(s).
          </p>
        </div>
      )}

      <div className="about-section">
        <h2>📂 Category Breakdown</h2>
        <div className="week-table">
          {Object.entries(categoryBreakdown).map(([cat, count]) => (
            <div key={cat} className="week-row">
              <span className="week-label">{cat}</span>
              <span className="week-topic">{count} habit(s)</span>
            </div>
          ))}
          {Object.keys(categoryBreakdown).length === 0 && (
            <p>No habits yet — add one to see your breakdown.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stats;
