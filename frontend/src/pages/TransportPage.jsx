import { useState } from 'react'
import { getRouteBuses } from '../api/collegeApi'
import { EmptyState, ErrorState, LoadingState } from '../components/StateViews'

const routePresets = [1, 2, 3]

function TransportPage() {
  const [routeId, setRouteId] = useState('1')
  const [buses, setBuses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchBusesByRoute(targetRouteId, signal) {
    if (!targetRouteId) {
      setError('Enter a valid route ID.')
      setBuses([])
      return
    }

    try {
      setLoading(true)
      setError('')
      const data = await getRouteBuses(targetRouteId, { signal })
      setBuses(Array.isArray(data) ? data : [])
    } catch (err) {
      if (err.name === 'AbortError') {
        return
      }

      setError(err.message)
      setBuses([])
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    fetchBusesByRoute(routeId)
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Transport Lookup</h2>
        <p>Search buses by route ID and view live seat availability.</p>
      </div>

      <form className="transport-form" onSubmit={handleSubmit}>
        <label>
          Route ID
          <input
            type="number"
            min="1"
            value={routeId}
            onChange={(event) => setRouteId(event.target.value)}
          />
        </label>
        <button type="submit" className="button-link" disabled={loading}>
          {loading ? 'Searching...' : 'Get Buses'}
        </button>
      </form>

      <div className="preset-row" role="group" aria-label="Preset route IDs">
        {routePresets.map((preset) => (
          <button
            key={preset}
            type="button"
            className="chip"
            onClick={() => {
              const selected = String(preset)
              setRouteId(selected)
              fetchBusesByRoute(selected)
            }}
          >
            Route {preset}
          </button>
        ))}
      </div>

      {loading && <LoadingState text="Loading buses..." />}
      {!loading && error && <ErrorState text={error} />}
      {!loading && !error && buses.length === 0 && <EmptyState text="No buses found for this route." />}

      {!loading && !error && buses.length > 0 && (
        <div className="card-grid">
          {buses.map((bus) => {
            const hasSeats = bus.available_seats > 0
            return (
              <article className="action-card" key={bus.bus_id}>
                <h3>{bus.bus_number}</h3>
                <p>
                  Available {bus.available_seats} / {bus.total_seats}
                </p>
                <span className={hasSeats ? 'badge available' : 'badge full'}>
                  {hasSeats ? 'Seats available' : 'Full'}
                </span>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default TransportPage
