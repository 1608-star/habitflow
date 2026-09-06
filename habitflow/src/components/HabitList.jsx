// Week 2 - Components & Props
import HabitCard from "./HabitCard";

function HabitList({ habits, emptyMessage }) {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <p>😕 {emptyMessage || "No habits found."}</p>
      </div>
    );
  }

  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
}

export default HabitList;
