import { createContext, useContext, useReducer, useEffect } from "react";
import { todayStr } from "../utils/streak";

const HabitContext = createContext();

// Backend API base URL (Vite env var, falls back to local dev server)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/habits";

// MongoDB documents use `_id` — map it to `id` so existing components
// (HabitCard, HabitList, etc.) don't need to change.
function normalize(habit) {
  return { ...habit, id: habit._id ?? habit.id };
}



function habitReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return action.payload;

    case "ADD":
      return [...state, action.payload];

    case "DELETE":
      return state.filter((h) => h.id !== action.payload);

    case "EDIT":
      return state.map((h) =>
        h.id === action.payload.id ? { ...h, ...action.payload.data } : h
      );

    case "TOGGLE_TODAY": {
      const today = todayStr();
      return state.map((h) => {
        if (h.id !== action.payload) return h;
        const alreadyDone = h.history.includes(today);
        const history = alreadyDone
          ? h.history.filter((d) => d !== today)
          : [...h.history, today];
        return { ...h, history };
      });
    }

    default:
      return state;
  }
}

export function HabitProvider({ children }) {
  const [habits, dispatchLocal] = useReducer(habitReducer, []);

  // Load habits from the backend/MongoDB on start
  useEffect(() => {
    async function loadHabits() {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        if (json.success) {
          dispatchLocal({ type: "LOAD", payload: json.data.map(normalize) });
        }
      } catch (err) {
        console.error("Failed to load habits from server:", err);
      }
    }
    loadHabits();
  }, []);

  // Same {type, payload} interface as before, but now each action
  // talks to the backend API (which persists to MongoDB) and then
  // syncs local state from the server response.
  async function dispatch(action) {
    try {
      switch (action.type) {
        case "ADD": {
          const { name, category, frequency } = action.payload;
          const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, category, frequency }),
          });
          const json = await res.json();
          if (json.success) {
            dispatchLocal({ type: "ADD", payload: normalize(json.data) });
          }
          break;
        }

        case "DELETE": {
          const id = action.payload;
          const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
          const json = await res.json();
          if (json.success) {
            dispatchLocal({ type: "DELETE", payload: id });
          }
          break;
        }

        case "EDIT": {
          const { id, data } = action.payload;
          const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          const json = await res.json();
          if (json.success) {
            dispatchLocal({
              type: "EDIT",
              payload: { id, data: normalize(json.data) },
            });
          }
          break;
        }

        case "TOGGLE_TODAY": {
          const id = action.payload;
          const res = await fetch(`${API_URL}/${id}/toggle`, {
            method: "PATCH",
          });
          const json = await res.json();
          if (json.success) {
            dispatchLocal({
              type: "EDIT",
              payload: { id, data: normalize(json.data) },
            });
          }
          break;
        }

        default:
          dispatchLocal(action);
      }
    } catch (err) {
      console.error(`Failed to ${action.type} habit:`, err);
    }
  }

  return (
    <HabitContext.Provider value={{ habits, dispatch }}>
      {children}
    </HabitContext.Provider>
  );
}



// Custom hook
export function useHabits() {
  return useContext(HabitContext);
}