import { Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import AppLayout from './components/AppLayout'
import CourseDetailPage from './pages/CourseDetailPage'
import CoursesPage from './pages/CoursesPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import TransportPage from './pages/TransportPage'
import './styles/app.css'

function App() {
  const [isRegistered, setIsRegistered] = useState(false)

  function handleRegistrationSuccess() {
    setIsRegistered(true)
  }

  return (
    <Routes>
      <Route element={<AppLayout isRegistered={isRegistered} />}>
        <Route index element={<HomePage isRegistered={isRegistered} />} />
        <Route path="courses" element={<CoursesPage isRegistered={isRegistered} />} />
        <Route path="courses/:courseId" element={<CourseDetailPage />} />
        <Route
          path="register"
          element={
            isRegistered ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterPage onRegistrationSuccess={handleRegistrationSuccess} />
            )
          }
        />
        <Route path="transport" element={<TransportPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
