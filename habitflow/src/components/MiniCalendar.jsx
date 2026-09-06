// Week 2 - Components & Props
// Displays a small grid of the last N days, showing done/not-done as colored dots
function MiniCalendar({ days }) {
  return (
    <div className="mini-calendar">
      {days.map((d) => (
        <span
          key={d.date}
          title={d.date}
          className={`day-dot ${d.done ? "day-done" : "day-missed"}`}
        />
      ))}
    </div>
  );
}

export default MiniCalendar;
