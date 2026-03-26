import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import styles from './Welcome.module.css'

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&auto=format&fit=crop',
    tag: 'Strength Training',
  },
  {
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&auto=format&fit=crop',
    tag: 'Cardio & Endurance',
  },
  {
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1400&auto=format&fit=crop',
    tag: 'Yoga & Wellness',
  },
  {
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1400&auto=format&fit=crop',
    tag: 'Weight Loss',
  },
]

export default function Welcome() {
  const { user } = useUser()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!user.email) navigate('/login')
  }, [user, navigate])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  function prev() {
    setCurrent(prev => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  function next() {
    setCurrent(prev => (prev + 1) % SLIDES.length)
  }

  const CARDS = [
    { icon: '🎯', label: t('welcome.setGoal'),  path: '/goals' },
    { icon: '📊', label: t('welcome.dashboard'), path: '/dashboard' },
    { icon: '📅', label: t('welcome.schedule'),  path: '/schedule' },
    { icon: '💬', label: t('welcome.feedback'),  path: '/feedback' },
  ]

  return (
    <div className={styles.page}>

      {/* Carousel */}
      <div className={styles.carousel}>
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
          >
            <img src={slide.image} alt={slide.tag} className={styles.slideImg} />
            <div className={styles.slideOverlay} />
          </div>
        ))}

        <div className={styles.carouselContent}>
          <p className={styles.greeting}>{t('welcome.greeting')}</p>
          <h1 className={styles.name}>{user.name || 'Athlete'}</h1>
          <p className={styles.sub}>{t('welcome.sub')}</p>
          <span className={styles.slideTag}>{SLIDES[current].tag}</span>
        </div>

        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev}>‹</button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next}>›</button>

        <div className={styles.dots}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      {/* Action cards */}
      <div className={styles.cardsSection}>
        <div className={styles.cards}>
          {CARDS.map((card) => (
            <button
              key={card.path}
              className={styles.card}
              onClick={() => navigate(card.path)}
            >
              <span className={styles.cardIcon}>{card.icon}</span>
              <span className={styles.cardLabel}>{card.label}</span>
              <span className={styles.cardArrow}>→</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}