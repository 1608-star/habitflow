// Week 3 - useState for form
// Week 5 - useNavigate from React Router
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHabits } from "../context/HabitContext";

function AddHabit() {
  const { dispatch } = useHabits();
  const navigate = useNavigate();

  // Week 3 - useState for form fields
  const [formData, setFormData] = useState({
    name: "",
    category: "Health",
    frequency: "Daily",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (formData.name.trim() === "") {
      setError("⚠️ Habit name is required!");
      return;
    }

    const newHabit = {
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category,
      frequency: formData.frequency,
      history: [],
    };

    dispatch({ type: "ADD", payload: newHabit });
    setSuccess(true);
    setError("");

    // Reset form
    setFormData({ name: "", category: "Health", frequency: "Daily" });

    // Redirect to home after 1.5 seconds
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">➕ Add New Habit</h1>
        <p className="page-subtitle">Fill in the details below to start tracking a new habit</p>
      </div>

      <div className="form-container">
        {success && (
          <div className="alert alert-success">
            ✅ Habit added successfully! Redirecting...
          </div>
        )}
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="name">Habit Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Drink 2L Water"
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Health">💪 Health</option>
                <option value="Study">📚 Study</option>
                <option value="Work">💼 Work</option>
                <option value="Other">🌀 Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="frequency">Frequency</label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Daily">📅 Daily</option>
                <option value="Weekly">🗓️ Weekly</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              ➕ Add Habit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHabit;
