import { createContext, useContext, useReducer, useEffect } from "react";
import { todayStr } from "../utils/streak";

const HabitContext = createContext();

// Reducer function - Week 6 Advanced Hooks
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
  const [habits, dispatch] = useReducer(habitReducer, []);

  // Week 4 - useEffect: Load from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem("habitflow-habits");
    if (saved) {
      dispatch({ type: "LOAD", payload: JSON.parse(saved) });
    } else {
      const defaults = [
        {
          id: 1,
          name: "Drink 2L Water",
          category: "Health",
          frequency: "Daily",
          history: [todayStr()],
        },
        {
          id: 2,
          name: "Read 20 Pages",
          category: "Study",
          frequency: "Daily",
          history: [],
        },
        {
          id: 3,
          name: "Workout",
          category: "Health",
          frequency: "Daily",
          history: [],
        },
      ];
      dispatch({ type: "LOAD", payload: defaults });
    }
  }, []);

  // Week 4 - useEffect: Save to localStorage whenever habits change
  useEffect(() => {
    localStorage.setItem("habitflow-habits", JSON.stringify(habits));
  }, [habits]);

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
