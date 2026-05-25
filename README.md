# College Management Portal

A full-stack college portal with a React frontend and Django backend.
It supports course browsing, course details, student registration, and transport route bus availability.

## Tech Stack
- Frontend: React + Vite
- Backend: Django

## Features
- Home dashboard
- Courses list and course detail view
- Student registration form
- Transport route bus lookup

## Project Structure
- `frontend/` React app
- `backend/` Django API and apps (`courses`, `registrations`, `transport`)

## Run Locally
### 1. Start Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r piprequirements.txt
python manage.py migrate
python manage.py runserver
```

### 2. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:8000`
