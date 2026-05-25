# CollegeManagement API - Quick Reference

## 🚀 Quick Start

```bash
# Create virtual environment
python3 -m venv .venv

# Activate virtual environment (Linux/macOS)
source .venv/bin/activate
# Activate virtual environment (Windows PowerShell)
# .venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirement.txt

# Apply migrations
python manage.py makemigrations
python manage.py migrate

# Start server
python manage.py runserver
```

---

## 📡 API Endpoints

### 1. List All Courses
```bash
GET /courses/
```
**Response:** Array of courses with departments

---

### 2. Get Faculty for Course
```bash
GET /courses/{course_id}/faculty/
```
**Example:** `GET /courses/1/faculty/`  
**Response:** Array of faculty members teaching the course

---

### 3. Get Hostel Facilities
```bash
GET /courses/{course_id}/hostel/
```
**Example:** `GET /courses/1/hostel/`  
**Response:** Array of hostel facilities with room availability

---

### 4. Register Student
```bash
POST /registrations/
Content-Type: application/json

{
  "student_name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "consent": true,
  "course": 1
}
```
**Response:** Registration confirmation with ID

---

### 5. Get Buses on Route
```bash
GET /routes/{route_id}/buses/
```
**Example:** `GET /routes/1/buses/`  
**Response:** Array of buses with seat availability

---

## 🗄️ Database Models

### courses app
- **Department** - Academic departments
- **Faculty** - Teachers/professors
- **Courses** - Available courses
- **HostelFacility** - Hostel room availability

### registrations app
- **Registration** - Student course registrations

### transport app
- **Route** - Bus routes
- **Bus** - Buses with seat tracking

---

## 🔗 Relationships

```
Department (1) → (N) Courses
Faculty (N) ↔ (N) Courses [Many-to-Many]
Courses (1) → (N) HostelFacility
Courses (1) → (N) Registration
Route (1) → (N) Bus
```

---

## 🧪 Testing with curl

```bash
# Get courses
curl http://localhost:8000/courses/

# Get faculty
curl http://localhost:8000/courses/1/faculty/

# Get hostel facilities
curl http://localhost:8000/courses/1/hostel/

# Get buses
curl http://localhost:8000/routes/1/buses/

# Register student
curl -X POST http://localhost:8000/registrations/ \
  -H "Content-Type: application/json" \
  -d '{
    "student_name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "consent": true,
    "course": 1
  }'
```

---
