// Week 6 - Helper utils used inside useMemo calculations
// Calculates current streak and longest streak from a habit's history array
// history = array of date strings "YYYY-MM-DD" on which the habit was completed

export function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function daysBetween(a, b) {
  const d1 = new Date(a);
  const d2 = new Date(b);
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

export function calculateStreaks(history = []) {
  if (!history.length) return { currentStreak: 0, longestStreak: 0 };

  const sorted = [...history].sort();
  let longest = 1;
  let run = 1;

  for (let i = 1; i < sorted.length; i++) {
    if (daysBetween(sorted[i - 1], sorted[i]) === 1) {
      run += 1;
    } else if (daysBetween(sorted[i - 1], sorted[i]) === 0) {
      // duplicate date, ignore
    } else {
      run = 1;
    }
    if (run > longest) longest = run;
  }

  // current streak: count backwards from today (or yesterday) while consecutive
  const today = todayStr();
  const set = new Set(sorted);
  let current = 0;
  let cursor = today;

  // if today isn't done yet, streak still counts up to yesterday
  if (!set.has(today)) {
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    cursor = yest.toISOString().split("T")[0];
  }

  while (set.has(cursor)) {
    current += 1;
    const d = new Date(cursor);
    d.setDate(d.getDate() - 1);
    cursor = d.toISOString().split("T")[0];
  }

  return { currentStreak: current, longestStreak: longest };
}

// Returns an array of the last N days as { date, done } for the mini calendar grid
export function lastNDays(history = [], n = 7) {
  const set = new Set(history);
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    days.push({ date: key, done: set.has(key) });
  }
  return days;
}
