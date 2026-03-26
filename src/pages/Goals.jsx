import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import styles from './Goals.module.css'

const GOALS = [
  {
    id: 'weight-loss',
    emoji: '🔥',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&auto=format&fit=crop',
  },
  {
    id: 'muscle',
    emoji: '💪',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop',
  },
  {
    id: 'wellness',
    emoji: '🧘',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop',
  },
  {
    id: 'endurance',
    emoji: '🏃',
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&auto=format&fit=crop',
  },
]

const LEVELS = [
  { id: 'beginner',     emoji: '🌱' },
  { id: 'intermediate', emoji: '⚡' },
  { id: 'advanced',     emoji: '🏆' },
]

export default function Goals() {
  const { user, updateUser } = useUser()
  const { t } = useLanguage()
  const navigate = useNavigate()

  function handleContinue() {
    if (user.goal && user.level) {
      navigate('/schedule')
    }
  }

  return (
    <div className={styles.page}>
      <div className="container">

        <header className={styles.header}>
          <h1 className={styles.title}>{t('goals.title')}</h1>
          <p className={styles.sub}>{t('goals.sub')}</p>
        </header>

        <section className={styles.section}>
          <div className={styles.goalGrid}>
            {GOALS.map((g) => (
              <button
                key={g.id}
                className={`${styles.goalCard} ${user.goal === g.id ? styles.goalCardActive : ''}`}
                onClick={() => updateUser({ goal: g.id })}
              >
                <div className={styles.goalImageWrap}>
                  <img
                    src={g.image}
                    alt={t(`goal.${g.id}`)}
                    className={styles.goalImage}
                  />
                  <div className={styles.goalImageOverlay} />
                </div>
                <div className={styles.goalInfo}>
                  <span className={styles.goalEmoji}>{g.emoji}</span>
                  <span className={styles.goalLabel}>{t(`goal.${g.id}`)}</span>
                </div>
                {user.goal === g.id && (
                  <div className={styles.goalCheck}>✓</div>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('goals.level')}</h2>
          <div className={styles.levelGrid}>
            {LEVELS.map((l) => (
              <button
                key={l.id}
                className={`${styles.levelBtn} ${user.level === l.id ? styles.levelBtnActive : ''}`}
                onClick={() => updateUser({ level: l.id })}
              >
                <span className={styles.levelEmoji}>{l.emoji}</span>
                <span className={styles.levelLabel}>{t(`level.${l.id}`)}</span>
              </button>
            ))}
          </div>
        </section>

        <div className={styles.footer}>
          <button
            className={styles.continueBtn}
            onClick={handleContinue}
            disabled={!user.goal || !user.level}
          >
            {t('goals.continue')}
          </button>
        </div>

      </div>
    </div>
  )
}