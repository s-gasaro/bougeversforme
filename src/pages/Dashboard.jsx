import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import styles from './Dashboard.module.css'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default function Dashboard() {
  const { user } = useUser()
  const { t } = useLanguage()

  return (
    <div className={styles.page}>
      <div className="container">

        <header className={`${styles.pageHeader} reveal`}>
          <div>
            <h1 className={styles.pageTitle}>{t('dashboard.title')}</h1>
            <p className={styles.pageSub}>{t('dashboard.sub')}</p>
          </div>
          <div className={styles.headerActions}>
            <Link to="/goals" className={styles.editBtn}>
              {t('dashboard.editGoals')}
            </Link>
            <Link to="/schedule" className={styles.scheduleBtn}>
              {t('dashboard.schedule')}
            </Link>
          </div>
        </header>

        {user.goal && user.level && (
          <div className={`${styles.summaryBar} reveal reveal-1`}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>{t('dashboard.goal')}</span>
              <span className={styles.summaryValue}>
                {user.goal === 'weight-loss' && `🔥 ${t('goal.weight-loss')}`}
                {user.goal === 'muscle'      && `💪 ${t('goal.muscle')}`}
                {user.goal === 'wellness'    && `🧘 ${t('goal.wellness')}`}
                {user.goal === 'endurance'   && `🏃 ${t('goal.endurance')}`}
              </span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>{t('dashboard.level')}</span>
              <span className={styles.summaryValue}>
                {user.level === 'beginner'     && `🌱 ${t('level.beginner')}`}
                {user.level === 'intermediate' && `⚡ ${t('level.intermediate')}`}
                {user.level === 'advanced'     && `🏆 ${t('level.advanced')}`}
              </span>
            </div>
          </div>
        )}

        <section className={`${styles.section} reveal reveal-2`}>
          <h2 className={styles.sectionLabel}>
            <span className={styles.stepNum}>01</span>
            {t('dashboard.program')}
          </h2>

          {user.plan ? (
            <div className={styles.plan}>
              <p className={`${styles.planSummary} reveal reveal-3`}>
                {user.plan.summary}
              </p>
              <div className={styles.planGrid}>
                {DAYS.map((day, i) => {
                  const d = user.plan.days[day]
                  if (!d) return null
                  return (
                    <div
                      key={day}
                      className={`${styles.dayCard} ${d.type === 'rest' ? styles.dayCardRest : ''} reveal reveal-${Math.min(i + 1, 5)}`}
                    >
                      <div className={styles.dayCardHeader}>
                        <span className={styles.dayCardName}>{t(`day.${day}`)}</span>
                        <span className={styles.dayCardDuration}>{d.duration}</span>
                      </div>
                      <p className={styles.dayCardTitle}>{d.title}</p>
                      {d.exercises && d.exercises.length > 0 && (
                        <ul className={styles.exerciseList}>
                          {d.exercises.map((ex, i) => (
                            <li key={i} className={styles.exerciseItem}>{ex}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className={`${styles.placeholder} reveal reveal-3`}>
              <p>{t('dashboard.noProgram')}</p>
              <Link to="/schedule" className={styles.placeholderBtn}>
                {t('dashboard.generateBtn')}
              </Link>
            </div>
          )}
        </section>

        <div className={`${styles.feedbackBanner} reveal reveal-4`}>
          <p>{t('dashboard.feedback')}</p>
          <Link to="/feedback" className={styles.feedbackBtn}>
            {t('dashboard.feedbackBtn')}
          </Link>
        </div>

      </div>
    </div>
  )
}