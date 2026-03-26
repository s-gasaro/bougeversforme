import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import styles from './Home.module.css'

const FEATURES = [
  {
    icon: '⚡',
    title: 'Personnalisé',
    desc: 'Recommandations adaptées à votre niveau, vos objectifs et votre agenda.',
  },
  {
    icon: '📅',
    title: 'Flexible',
    desc: "Des programmes qui s'ajustent à votre semaine, pas l'inverse.",
  },
  {
    icon: '📈',
    title: 'Progressif',
    desc: 'Votre charge évolue automatiquement avec vos performances.',
  },
]

const GOALS = [
  { id: 'weight-loss', emoji: '🔥' },
  { id: 'muscle',      emoji: '💪' },
  { id: 'wellness',    emoji: '🧘' },
  { id: 'endurance',   emoji: '🏃' },
]

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBadge}>{t('hero.badge')}</div>
          <h1 className={styles.heroTitle}>
            {t('hero.title')}<br />
            <span className={styles.heroAccent}>{t('hero.titleAccent')}</span>
          </h1>
          <p className={styles.heroSub}>{t('hero.sub')}</p>
          <div className={styles.heroCtas}>
            <Link to="/dashboard" className={styles.ctaPrimary}>
              {t('hero.cta')}
            </Link>
            <Link to="/dashboard" className={styles.ctaSecondary}>
              {t('hero.demo')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t('features.title')}</h2>
          <div className={styles.featureGrid}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={styles.featureCard}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className={styles.featureIcon}>{f.icon}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className={styles.goals}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t('goals.title')}</h2>
          <p className={styles.sectionSub}>{t('goals.sub')}</p>
          <div className={styles.goalGrid}>
            {GOALS.map((g) => (
              <Link to="/dashboard" key={g.id} className={styles.goalCard}>
                <span className={styles.goalEmoji}>{g.emoji}</span>
                <span className={styles.goalLabel}>{t(`goal.${g.id}`)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}