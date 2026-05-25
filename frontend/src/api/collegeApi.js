import { apiRequest } from './client'

export function listCourses(options = {}) {
  return apiRequest('/courses/', {
    method: 'GET',
    signal: options.signal,
  })
}

export function getCourseFaculty(courseId, options = {}) {
  return apiRequest(`/courses/${courseId}/faculty/`, {
    method: 'GET',
    signal: options.signal,
  })
}

export function getCourseHostel(courseId, options = {}) {
  return apiRequest(`/courses/${courseId}/hostel/`, {
    method: 'GET',
    signal: options.signal,
  })
}

export function createRegistration(payload, options = {}) {
  return apiRequest('/registrations/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: options.signal,
  })
}

export function getRouteBuses(routeId, options = {}) {
  return apiRequest(`/routes/${routeId}/buses/`, {
    method: 'GET',
    signal: options.signal,
  })
}
