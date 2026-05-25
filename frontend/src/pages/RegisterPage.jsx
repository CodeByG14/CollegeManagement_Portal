import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { createRegistration, listCourses } from '../api/collegeApi'
import { ErrorState, LoadingState } from '../components/StateViews'

function RegisterPage({ onRegistrationSuccess }) {
  const [searchParams] = useSearchParams()
  const queryCourseId = searchParams.get('course') || ''

  const [courses, setCourses] = useState([])
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [courseError, setCourseError] = useState('')

  const [form, setForm] = useState({
    student_name: '',
    email: '',
    phone: '',
    consent: false,
    course: queryCourseId,
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCourses() {
      try {
        setLoadingCourses(true)
        setCourseError('')
        const data = await listCourses({ signal: controller.signal })
        setCourses(Array.isArray(data) ? data : [])
      } catch (err) {
        if (err.name !== 'AbortError') {
          setCourseError(err.message)
        }
      } finally {
        setLoadingCourses(false)
      }
    }

    fetchCourses()

    return () => {
      controller.abort()
    }
  }, [])

  const hasEmailDuplicateError = useMemo(
    () => submitError.toLowerCase().includes('email already registered'),
    [submitError],
  )

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function validate() {
    const nextErrors = {}

    if (!form.student_name.trim()) {
      nextErrors.student_name = 'Student name is required.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'Phone is required.'
    }

    if (!form.course) {
      nextErrors.course = 'Course is required.'
    }

    if (!form.consent) {
      nextErrors.consent = 'Consent is required to submit this form.'
    }

    return nextErrors
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)
    setSubmitError('')
    setSubmitSuccess(null)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    try {
      setIsSubmitting(true)

      const payload = {
        student_name: form.student_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        consent: form.consent,
        course: Number(form.course),
      }

      const data = await createRegistration(payload)
      setSubmitSuccess(data)
      setForm((prev) => ({
        student_name: '',
        email: '',
        phone: '',
        consent: false,
        course: prev.course,
      }))
      setErrors({})
      onRegistrationSuccess?.(data)
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Register Student</h2>
        <p>Fill all required details and submit registration to the backend.</p>
      </div>

      {loadingCourses && <LoadingState text="Loading course options..." />}
      {!loadingCourses && courseError && <ErrorState text={courseError} />}

      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Student name
          <input
            name="student_name"
            type="text"
            value={form.student_name}
            onChange={handleChange}
            className={errors.student_name ? 'invalid' : ''}
          />
          {errors.student_name && <span className="field-error">{errors.student_name}</span>}
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email || hasEmailDuplicateError ? 'invalid' : ''}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>

        <label>
          Phone
          <input
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
            className={errors.phone ? 'invalid' : ''}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </label>

        <label>
          Course
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            disabled={loadingCourses || courses.length === 0}
            className={errors.course ? 'invalid' : ''}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course_name} ({course.department})
              </option>
            ))}
          </select>
          {errors.course && <span className="field-error">{errors.course}</span>}
        </label>

        <label className="checkbox-row">
          <input name="consent" type="checkbox" checked={form.consent} onChange={handleChange} />
          I confirm this registration consent.
        </label>
        {errors.consent && <span className="field-error">{errors.consent}</span>}

        <button type="submit" className="button-link" disabled={isSubmitting || loadingCourses}>
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </form>

      {submitError && <ErrorState text={submitError} />}

      {submitSuccess && (
        <p className="status success">
          {submitSuccess.message} (Registration ID: {submitSuccess.id})
        </p>
      )}
    </section>
  )
}

export default RegisterPage
