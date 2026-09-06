// Week 2 - Components & Props
// Week 6 - useMemo for streak calculation
import { useMemo } from "react";
import { useHabits } from "../context/HabitContext";
import { calculateStreaks, lastNDays, todayStr } from "../utils/streak";
import MiniCalendar from "./MiniCalendar";

const categoryColor = {
  Health: "#2ecc71",
  Study: "#3498db",
  Work: "#9b59b6",
  Other: "#f39c12",
};



function HabitCard({ habit }) {
  const { dispatch } = useHabits();
  const today = todayStr();
  const doneToday = habit.history.includes(today);

  // Week 6 - useMemo: avoid recalculating streaks on every unrelated render
  const { currentStreak, longestStreak } = useMemo(
    () => calculateStreaks(habit.history),
    [habit.history]
  );

  const last7 = useMemo(() => lastNDays(habit.history, 7), [habit.history]);

  return (
    <div className="habit-card">
      <div className="habit-card-header">
        <h3 className="habit-title">{habit.name}</h3>
        <span
          className="category-badge"
          style={{ backgroundColor: categoryColor[habit.category] || "#999" }}
        >
          {habit.category}
        </span>
      </div>

      <p className="habit-frequency">🔁 {habit.frequency}</p>

      <div className="streak-row">
        <span className="streak-badge">🔥 {currentStreak} day streak</span>
        <span className="streak-badge streak-best">🏆 Best: {longestStreak}</span>
      </div>

      <MiniCalendar days={last7} />

      <div className="habit-actions">
        <button
          className={`btn ${doneToday ? "btn-done" : "btn-complete"}`}
          onClick={() => dispatch({ type: "TOGGLE_TODAY", payload: habit.id })}
        >
          {doneToday ? "✅ Done Today" : "⬜ Mark Today Done"}
        </button>
        <button
          className="btn btn-delete"
          onClick={() => dispatch({ type: "DELETE", payload: habit.id })}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default HabitCard;
