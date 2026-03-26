// NotFound.jsx — 404 Page
//
// This renders when someone visits a URL that doesn't exist.
// In App.jsx we have <Route path="*"> which means
// "match anything that didn't match above" — it renders this page.

import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className="container">
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page introuvable</h1>
        <p className={styles.desc}>
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className={styles.back}>
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}