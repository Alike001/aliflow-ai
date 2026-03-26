# ALiflow AI — Smart Learning Platform

A functional smart-learning platform built with React.
Students can browse courses, enroll, watch lessons, track their
progress.


## Features

- **Authentication** — Login/logout with session persistence
- **Protected Routes** — Dashboard and courses require login
- **Course Catalog** — Browse, search and filter courses
- **Course Detail** — Full curriculum with lesson list
- **Lesson Player** — Inline HTML5 video, no redirects
- **Progress Tracking** — Mark lessons complete, see % progress
- **Persistent State** — Progress saved across page refreshes

## Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| UI Framework  | React 18 (functional components)  |
| Routing       | React Router v6 (nested routes)   |
| State         | Context API + custom hooks        |
| Persistence   | localStorage                      |
| Styling       | CSS (CSS variables)   |
| Build Tool    | Vite                              |
| Version Control | Git + GitHub (branch workflow)  |

## Folder Structure
```
src/
├── index.css # Global styles, design tokens, animations
├── main.jsx   # App entry point
├── App.jsx   # Providers + React Router v6 route tree
│
├── data/
│   └── courses.js # Course data, mock users
│
├── store/
│   ├── AuthContext.jsx # Login/logout + localStorage persistence
│   └── ProgressContext.jsx # Enrollment + lesson completion tracking
│
├── hooks/
│   ├── useAuth.js # Clean interface for auth context
│   └── useProgress.js # Clean interface for progress context
│
├── components/
│   ├── Navbar.jsx # Sticky nav, auth-aware
│   ├── ProtectedRoute.jsx # Route guard — redirects if not logged in
│   ├── ProgressBar.jsx # Reusable animated progress bar
│   ├── CourseCard.jsx # Catalog grid card
│
└── pages/
    ├── LoginPage.jsx # Login form with redirect logic
    ├── CatalogPage.jsx # Course grid with search + filter
    ├── DashboardPage.jsx # Personal stats + enrolled courses
    ├── CourseDetailPage.jsx # Course info + curriculum + enrollment
    └── LessonPlayerPage.jsx # Video player + prev/next nav
```

## Setup Instructions

### 1. Clone the repository
```
git clone https://github.com/Alike001/aliflow-ai.git
cd aliflow-ai
```

### 2. Install dependencies
```
npm install
```

### 3. Start the development server
```
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

## Demo Flow

Follow these steps to see the full feature set:

1. LOGIN      → aish@learn.io / aish123
2. BROWSE     → Search and filter the course catalog
3. ENROLL     → Click a course → "Enroll Free →"
4. WATCH      → Click "Start Learning →" → video plays inline
5. COMPLETE   → Click "Mark Complete" or finish the video
6. PROGRESS   → Visit Dashboard → see your % progress
7. LOGOUT     → Click "Sign out" → session clears
8. REFRESH    → Log back in → all progress is restored
```

## Branch Workflow
```
main
├── feature/structure   # Folder setup + course data + global CSS
├── feature/auth        # AuthContext + ProgressContext + custom hooks
├── feature/courses     # All UI components + pages (Navbar through Login)
└── feature/progress    # CourseDetail + LessonPlayer + App.jsx
```

Each branch was merged into `main` after completing its feature set.

Built by Ali as part of a React engineering project.  
AI-assisted development using Claude (Anthropic).

## License
MIT