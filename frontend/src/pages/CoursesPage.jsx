import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listCourses } from '../api/collegeApi'
import { EmptyState, ErrorState, LoadingState } from '../components/StateViews'

function CoursesPage({ isRegistered }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCourses() {
      try {
        setLoading(true)
        setError('')
        const data = await listCourses({ signal: controller.signal })
        setCourses(Array.isArray(data) ? data : [])
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Courses</h2>
        <p>Browse all course options and open details for faculty and hostel information.</p>
      </div>

      {loading && <LoadingState text="Loading courses..." />}
      {!loading && error && <ErrorState text={error} />}
      {!loading && !error && courses.length === 0 && <EmptyState text="No courses available." />}

      {!loading && !error && courses.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Name</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.course_name}</td>
                  <td>{course.department}</td>
                  <td className="action-cell">
                    <Link className="text-link" to={`/courses/${course.id}`}>
                      View details
                    </Link>
                    {!isRegistered && (
                      <Link className="text-link" to={`/register?course=${course.id}`}>
                        Register
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CoursesPage
