# 🔥 HabitFlow — Full Stack Habit & Streak Tracker

**Subject:** Full Stack Development - I (3040233448)
**Institution:** Silver Oak College of Computer Applications, Silver Oak University
**Course:** Bachelor of Computer Applications (Honours)

---

## 📌 Project Overview

HabitFlow is a complete MERN Stack Habit Tracker application built as part of the Experiential Learning Workbook for Full Stack Development - I. Unlike a plain to-do app, it focuses on daily consistency — tracking streaks, completion history, and category-wise progress.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router DOM v6 |
| State | Context API + useReducer |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Styling | Pure CSS |

---

## 📁 Project Structure

```
habitflow/               ← Frontend (React)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── HabitCard.jsx
│   │   ├── HabitList.jsx
│   │   └── MiniCalendar.jsx
│   ├── context/
│   │   └── HabitContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AddHabit.jsx
│   │   ├── Stats.jsx
│   │   └── About.jsx
│   ├── utils/
│   │   └── streak.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json

habitflow-backend/       ← Backend (Node + Express)
├── models/
│   └── Habit.js
├── routes/
│   └── habitRoutes.js
├── server.js
├── .env
└── package.json
```

---

## 🚀 How to Run

### Frontend (React)
```bash
cd habitflow
npm install
npm run dev
```
Open: http://localhost:3000

### Backend (Express + MongoDB)
```bash
cd habitflow-backend
npm install
# Update .env with your MongoDB URI
npm run dev
```
API runs at: http://localhost:5000

---

## 🌟 Features

1. **Add Habits** — Create habits with name, category, and frequency
2. **Mark Today Done** — Toggle today's completion per habit
3. **Streak Tracking** — Auto-calculated current streak + longest streak
4. **Mini Calendar** — Last 7 days completion grid per habit
5. **Dashboard Stats** — Total habits, done today, not done, completion %
6. **Stats Page** — Best streak habit + category breakdown
7. **Search & Filter** — Search by name, filter by category
8. **Persist Data** — localStorage saves habits across refreshes
9. **Multi-page Navigation** — React Router with 4 pages
10. **REST API** — Full CRUD backend + toggle-today endpoint with MongoDB

---

## 📅 Week-by-Week Features

| Week | Feature Added |
|------|--------------|
| 1 | React Setup, GitHub Init |
| 2 | Navbar, HabitCard, HabitList, MiniCalendar components |
| 3 | Add/Delete/Toggle with useState |
| 4 | localStorage + Live Clock with useEffect |
| 5 | React Router — 4 pages |
| 6 | Context API + useReducer + useMemo (streak calculations) |
| 7 | Node.js server basics |
| 8 | Express.js routes |
| 9 | MongoDB + Mongoose schema |
| 10 | Full REST API CRUD + toggle-today endpoint |
| 11 | Frontend-Backend integration |
| 12 | Final submission |
