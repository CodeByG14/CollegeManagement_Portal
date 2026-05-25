import { Link } from 'react-router-dom'

const quickActions = [
  {
    title: 'Browse Courses',
    description: 'View all available courses and departments.',
    to: '/courses',
    cta: 'View Courses',
  },
  {
    title: 'Student Registration',
    description: 'Submit a new student registration request.',
    to: '/register',
    cta: 'Register Now',
  },
  {
    title: 'Transport Lookup',
    description: 'Find buses and seat availability for a route.',
    to: '/transport',
    cta: 'Check Transport',
  },
]

function HomePage({ isRegistered }) {
  const visibleActions = isRegistered ? quickActions.filter((action) => action.to !== '/register') : quickActions

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Dashboard</h2>
        <p>Use the portal to explore courses, register students, and check transport availability.</p>
      </div>
      <div className="card-grid">
        {visibleActions.map((action) => (
          <article className="action-card" key={action.to}>
            <h3>{action.title}</h3>
            <p>{action.description}</p>
            <Link className="button-link" to={action.to}>
              {action.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HomePage
