import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const baseNavItems = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/transport', label: 'Transport' },
]

function AppLayout({ isRegistered }) {
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(true)
  const navigate = useNavigate()
  const navItems = isRegistered
    ? baseNavItems
    : [...baseNavItems.slice(0, 2), { to: '/register', label: 'Register' }, baseNavItems[2]]

  function handleGoToRegister() {
    setShowWelcomePrompt(false)
    navigate('/register')
  }

  function handleDismissPrompt() {
    setShowWelcomePrompt(false)
  }

  return (
    <div className="app-root">
      <header className="top-nav">
        <div className="brand-block">
          <p className="eyebrow">College Management Portal</p>
          <h1>Student Services</h1>
        </div>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="page-shell">
        <Outlet />
      </main>

      {!isRegistered && showWelcomePrompt && (
        <div className="welcome-overlay" role="presentation">
          <section className="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
            <h2 id="welcome-title">New here?</h2>
            <p>
              Welcome to Student Services. You are new here, so why not register first and unlock a better portal
              experience?
            </p>
            <div className="welcome-actions">
              <button type="button" onClick={handleGoToRegister}>
                Register Now
              </button>
              <button type="button" className="chip" onClick={handleDismissPrompt}>
                Maybe Later
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default AppLayout
