import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCourseFaculty, getCourseHostel } from '../api/collegeApi'
import { EmptyState, ErrorState, LoadingState } from '../components/StateViews'

function CourseDetailPage() {
  const { courseId } = useParams()
  const [faculty, setFaculty] = useState([])
  const [hostel, setHostel] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchDetails() {
      try {
        setLoading(true)
        setError('')
        setNotFound(false)

        const [facultyData, hostelData] = await Promise.all([
          getCourseFaculty(courseId, { signal: controller.signal }),
          getCourseHostel(courseId, { signal: controller.signal }),
        ])

        setFaculty(Array.isArray(facultyData) ? facultyData : [])
        setHostel(Array.isArray(hostelData) ? hostelData : [])
      } catch (err) {
        if (err.name === 'AbortError') {
          return
        }

        if (err.status === 404) {
          setNotFound(true)
        } else {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()

    return () => {
      controller.abort()
    }
  }, [courseId])

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Course Detail</h2>
        <p>Course ID: {courseId}</p>
      </div>

      {loading && <LoadingState text="Loading course details..." />}

      {!loading && notFound && (
        <div className="state-box">
          <ErrorState text="Course not found" />
          <Link className="text-link" to="/courses">
            Back to courses
          </Link>
        </div>
      )}

      {!loading && !notFound && error && <ErrorState text={error} />}

      {!loading && !notFound && !error && (
        <div className="detail-grid">
          <article className="sub-panel">
            <h3>Faculty</h3>
            {faculty.length === 0 && <EmptyState text="No faculty records found." />}
            {faculty.length > 0 && (
              <ul className="clean-list">
                {faculty.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            )}
          </article>

          <article className="sub-panel">
            <h3>Hostel Facilities</h3>
            {hostel.length === 0 && <EmptyState text="No hostel facilities found." />}
            {hostel.length > 0 && (
              <ul className="clean-list">
                {hostel.map((item) => (
                  <li key={`${item.room_type}-${item.total_rooms}`}>
                    <strong>{item.room_type}</strong> · Available {item.available_rooms} / {item.total_rooms}
                  </li>
                ))}
              </ul>
            )}
          </article>
        </div>
      )}
    </section>
  )
}

export default CourseDetailPage
