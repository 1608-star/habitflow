// Week 5 - React Router page
function About() {
  const techStack = [
    { name: "React", icon: "⚛️", desc: "Frontend UI Library", week: "Week 1-6" },
    { name: "React Router", icon: "🛣️", desc: "Client-side Routing", week: "Week 5" },
    { name: "Context API", icon: "🌐", desc: "Global State Management", week: "Week 6" },
    { name: "Node.js", icon: "🟢", desc: "Backend Runtime", week: "Week 7" },
    { name: "Express.js", icon: "🚂", desc: "Backend Framework", week: "Week 8" },
    { name: "MongoDB", icon: "🍃", desc: "NoSQL Database", week: "Week 9" },
    { name: "Mongoose", icon: "📦", desc: "MongoDB ODM", week: "Week 9" },
    { name: "REST API", icon: "🔗", desc: "API Development", week: "Week 10" },
  ];

  const weekPlan = [
    { week: "Week 1", topic: "React Setup & GitHub", status: "✅" },
    { week: "Week 2", topic: "Components & Props", status: "✅" },
    { week: "Week 3", topic: "State Management - useState", status: "✅" },
    { week: "Week 4", topic: "useEffect & Lifecycle", status: "✅" },
    { week: "Week 5", topic: "React Router & Navigation", status: "✅" },
    { week: "Week 6", topic: "Advanced Hooks", status: "✅" },
    { week: "Week 7", topic: "API Integration & Node.js", status: "🔄" },
    { week: "Week 8", topic: "Express.js & Routing", status: "🔄" },
    { week: "Week 9", topic: "MongoDB & Mongoose", status: "🔄" },
    { week: "Week 10", topic: "REST API Development", status: "🔄" },
    { week: "Week 11", topic: "Frontend-Backend Integration", status: "🔄" },
    { week: "Week 12", topic: "Final Project Submission", status: "🔄" },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">ℹ️ About HabitFlow</h1>
        <p className="page-subtitle">Full Stack Development - I Project | Silver Oak University</p>
      </div>

      {/* Project Info */}
      <div className="about-card">
        <h2>📌 Project Overview</h2>
        <p>
          <strong>HabitFlow</strong> is a Full Stack Habit & Streak Tracker built as part of the
          Experiential Learning Workbook for the subject <strong>Full Stack Development - I (3040233448)</strong> at
          Silver Oak College of Computer Applications.
        </p>
        <br />
        <p>
          Unlike a simple to-do list, HabitFlow focuses on daily consistency — tracking streaks,
          completion history, and category-wise progress for personal habits like health, study, and work routines.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="about-section">
        <h2>🛠️ Technologies Used</h2>
        <div className="tech-grid">
          {techStack.map((tech, i) => (
            <div key={i} className="tech-card">
              <span className="tech-icon">{tech.icon}</span>
              <h4>{tech.name}</h4>
              <p>{tech.desc}</p>
              <span className="tech-week">{tech.week}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Week Plan */}
      <div className="about-section">
        <h2>📅 Week-by-Week Progress</h2>
        <div className="week-table">
          {weekPlan.map((item, i) => (
            <div key={i} className="week-row">
              <span className="week-label">{item.week}</span>
              <span className="week-topic">{item.topic}</span>
              <span className="week-status">{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Student Info */}
      <div className="about-card">
        <h2>🎓 Student Details</h2>
        <p><strong>Course:</strong> Bachelor of Computer Applications (Honours)</p>
        <p><strong>Subject:</strong> Full Stack Development - I (3040233448)</p>
        <p><strong>Institution:</strong> Silver Oak College of Computer Applications, Silver Oak University</p>
        <p><strong>Project:</strong> HabitFlow — Daily Habit & Streak Tracker (MERN Stack)</p>
      </div>
    </div>
  );
}

export default About;
