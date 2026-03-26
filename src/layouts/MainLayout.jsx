import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import styles from './MainLayout.module.css'

export default function MainLayout() {
  const { t } = useLanguage()
  const { pathname } = useLocation()

  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={styles.main}>
        {/* key={pathname} forces React to remount the page on route change,
            triggering the animation every time you navigate */}
        <div key={pathname} className={styles.pageTransition}>
          <Outlet />
        </div>
      </main>
      <footer className={styles.footer}>
        <div className="container">
          <span>{t('footer.copy')}</span>
          <span className={styles.footerTagline}>{t('footer.tagline')}</span>
        </div>
      </footer>
    </div>
  )
}