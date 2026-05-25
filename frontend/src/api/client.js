const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '')

function buildUrl(path) {
  if (path.startsWith('http')) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${normalizedPath}`
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    headers: {
      Accept: 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  let payload
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    payload = await response.json().catch(() => ({}))
  } else {
    payload = await response.text().catch(() => '')
  }

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload && payload.error
        ? payload.error
        : `Request failed with status ${response.status}`

    const error = new Error(message)
    error.status = response.status
    error.payload = payload
    throw error
  }

  return payload
}
