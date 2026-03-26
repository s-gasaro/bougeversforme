import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useUser } from '../context/UserContext.jsx'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { pathname } = useLocation()
  const { t, language, toggleLanguage } = useLanguage()
  const { user, resetUser } = useUser()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const NAV_LINKS = [
    { label: t('nav.home'),      path: '/welcome' },
    { label: t('nav.goals'),     path: '/goals' },
    { label: t('nav.schedule'),  path: '/schedule' },
    { label: t('nav.dashboard'), path: '/dashboard' },
    { label: t('nav.feedback'),  path: '/feedback' },
  ]

  function handleLogout() {
    resetUser()
    setDropdownOpen(false)
    navigate('/login')
  }

  // Get initials from name
  function getInitials(name) {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>

        <Link to="/welcome" className={styles.brand}>
          <span className={styles.brandMark}>▲</span>
          <span className={styles.brandName}>
            Bouge<span className={styles.brandAccent}>Vers</span>Forme
          </span>
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`${styles.link} ${pathname === path ? styles.active : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button className={styles.langBtn} onClick={toggleLanguage}>
            {language === 'en' ? 'FR' : 'EN'}
          </button>

          {user.email && (
            <div className={styles.profileWrap}>
              <button
                className={styles.avatar}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {getInitials(user.name)}
              </button>

              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownHeader}>
                    <p className={styles.dropdownName}>{user.name}</p>
                    <p className={styles.dropdownEmail}>{user.email}</p>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <button
                    className={styles.dropdownLogout}
                    onClick={handleLogout}
                  >
                    🚪 {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </nav>
    </header>
  )
}