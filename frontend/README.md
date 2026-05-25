# College Management Frontend

React + Vite frontend for a college management portal. It lets users browse courses, view course details, register students, and check transport seat availability.

## Stack
- React 19
- React Router 7
- Vite 8

## Features
- Dashboard with quick navigation
- Course list and course detail pages
- Student registration form with basic validation
- Transport lookup by route ID

## Routes
- `/` Home dashboard
- `/courses` Course list
- `/courses/:courseId` Course details (faculty + hostel)
- `/register` Student registration
- `/transport` Route bus availability

## Setup
```bash
npm install
npm run dev
```

Create a `.env` file (optional if backend is on localhost:8000):
```bash
VITE_API_BASE_URL=http://localhost:8000
```

## Scripts
```bash
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview build
npm run lint     # run eslint
```
