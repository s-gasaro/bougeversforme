import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { generatePlan } from '../utils/generatePlan.js'
import styles from './Schedule.module.css'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default function Schedule() {
  const { user, updateUser } = useUser()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [schedule, setSchedule] = useState({
    Lundi: '', Mardi: '', Mercredi: '', Jeudi: '',
    Vendredi: '', Samedi: '', Dimanche: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  function handleChange(day, value) {
    setSchedule(prev => ({ ...prev, [day]: value }))
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    try {
      const plan = await generatePlan({
        goal:     user.goal,
        level:    user.level,
        schedule,
      })
      updateUser({ schedule, plan })
      navigate('/dashboard')
    } catch (err) {
      setError('An error occurred. Please check your connection and try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filledDays = Object.values(schedule).filter(v => v.trim() !== '').length
  const canSubmit  = filledDays >= 3 && !loading

  return (
    <div className={styles.page}>
      <div className="container">

        <header className={`${styles.pageHeader} reveal`}>
          <h1 className={styles.pageTitle}>{t('schedule.title')}</h1>
          <p className={styles.pageSub}>{t('schedule.sub')}</p>
        </header>

        <div className={styles.form}>
          {DAYS.map((day, i) => (
            <div
              key={day}
              className={`${styles.dayRow} reveal reveal-${Math.min(i + 1, 5)}`}
            >
              <label className={styles.dayLabel}>{t(`day.${day}`)}</label>
              <textarea
                className={styles.dayInput}
                placeholder={t('schedule.placeholder')}
                value={schedule[day]}
                onChange={(e) => handleChange(day, e.target.value)}
                rows={2}
              />
            </div>
          ))}
        </div>

        {error && <p className={`${styles.error} reveal`}>{error}</p>}

        <div className={`${styles.footer} reveal reveal-5`}>
          <p className={styles.footerHint}>
            {loading
              ? t('schedule.generating')
              : canSubmit
                ? t('schedule.ready')
                : `${t('schedule.fill')} (${filledDays}/3)`
            }
          </p>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {loading ? t('schedule.loading') : t('schedule.btn')}
          </button>
        </div>

      </div>
    </div>
  )
}