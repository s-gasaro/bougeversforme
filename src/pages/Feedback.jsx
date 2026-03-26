import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import styles from './Feedback.module.css'

const EMOJIS = ['😞', '😕', '😐', '😊', '🤩']
const EMOJI_LABELS = ['Terrible', 'Not great', 'Okay', 'Good', 'Amazing!']

export default function Feedback() {
  const { updateUser } = useUser()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({
    overall:    0,
    program:    0,
    difficulty: '',
    comment:    '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleAnswer(id, value) {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }

  function handleSubmit() {
    updateUser({ feedback: answers })
    setSubmitted(true)
  }

  const totalSteps = 4
  const progress = ((step + 1) / totalSteps) * 100

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successPage}>
          <div className={styles.successEmoji}>
            {answers.overall >= 4 ? '🏆' : answers.overall >= 3 ? '💪' : '🙏'}
          </div>
          <h2 className={styles.successTitle}>{t('feedback.successTitle')}</h2>
          <p className={styles.successSub}>{t('feedback.successSub')}</p>
          <div className={styles.successStats}>
            <div className={styles.stat}>
              <span className={styles.statEmoji}>{EMOJIS[answers.overall - 1]}</span>
              <span className={styles.statLabel}>Overall</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statEmoji}>{EMOJIS[answers.program - 1]}</span>
              <span className={styles.statLabel}>Program</span>
            </div>
          </div>
          <button
            className={styles.backBtn}
            onClick={() => navigate('/welcome')}
          >
            {t('feedback.backBtn')} 🏠
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* Hero banner */}
      <div className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&auto=format&fit=crop"
          alt=""
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t('feedback.title')}</h1>
          <p className={styles.heroSub}>{t('feedback.sub')}</p>
        </div>
      </div>

      <div className="container">

        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressLabel}>
            {step + 1} / {totalSteps}
          </span>
        </div>

        {/* Step 1 — Overall rating */}
        {step === 0 && (
          <div className={styles.stepCard}>
            <p className={styles.stepNum}>01</p>
            <h2 className={styles.question}>{t('feedback.q1')}</h2>
            <div className={styles.emojiRating}>
              {EMOJIS.map((emoji, i) => (
                <button
                  key={i}
                  className={`${styles.emojiBtn} ${answers.overall === i + 1 ? styles.emojiBtnActive : ''}`}
                  onClick={() => handleAnswer('overall', i + 1)}
                >
                  <span className={styles.emojiIcon}>{emoji}</span>
                  <span className={styles.emojiLabel}>{EMOJI_LABELS[i]}</span>
                </button>
              ))}
            </div>
            <button
              className={styles.nextBtn}
              onClick={() => setStep(1)}
              disabled={!answers.overall}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2 — Program rating */}
        {step === 1 && (
          <div className={styles.stepCard}>
            <p className={styles.stepNum}>02</p>
            <h2 className={styles.question}>{t('feedback.q2')}</h2>
            <div className={styles.emojiRating}>
              {EMOJIS.map((emoji, i) => (
                <button
                  key={i}
                  className={`${styles.emojiBtn} ${answers.program === i + 1 ? styles.emojiBtnActive : ''}`}
                  onClick={() => handleAnswer('program', i + 1)}
                >
                  <span className={styles.emojiIcon}>{emoji}</span>
                  <span className={styles.emojiLabel}>{EMOJI_LABELS[i]}</span>
                </button>
              ))}
            </div>
            <div className={styles.stepNav}>
              <button className={styles.backStepBtn} onClick={() => setStep(0)}>← Back</button>
              <button
                className={styles.nextBtn}
                onClick={() => setStep(2)}
                disabled={!answers.program}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Difficulty */}
        {step === 2 && (
          <div className={styles.stepCard}>
            <p className={styles.stepNum}>03</p>
            <h2 className={styles.question}>{t('feedback.q3')}</h2>
            <div className={styles.difficultyOptions}>
              <button
                className={`${styles.diffBtn} ${answers.difficulty === 'tooEasy' ? styles.diffBtnActive : ''}`}
                onClick={() => handleAnswer('difficulty', 'tooEasy')}
              >
                😴 {t('feedback.tooEasy')}
              </button>
              <button
                className={`${styles.diffBtn} ${styles.diffBtnGreen} ${answers.difficulty === 'justRight' ? styles.diffBtnActive : ''}`}
                onClick={() => handleAnswer('difficulty', 'justRight')}
              >
                💪 {t('feedback.justRight')}
              </button>
              <button
                className={`${styles.diffBtn} ${styles.diffBtnRed} ${answers.difficulty === 'tooHard' ? styles.diffBtnActive : ''}`}
                onClick={() => handleAnswer('difficulty', 'tooHard')}
              >
                🥵 {t('feedback.tooHard')}
              </button>
            </div>
            <div className={styles.stepNav}>
              <button className={styles.backStepBtn} onClick={() => setStep(1)}>← Back</button>
              <button
                className={styles.nextBtn}
                onClick={() => setStep(3)}
                disabled={!answers.difficulty}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — Comment */}
        {step === 3 && (
          <div className={styles.stepCard}>
            <p className={styles.stepNum}>04</p>
            <h2 className={styles.question}>{t('feedback.q4')}</h2>
            <textarea
              className={styles.textarea}
              placeholder={t('feedback.placeholder')}
              value={answers.comment}
              onChange={e => handleAnswer('comment', e.target.value)}
              rows={5}
            />
            <div className={styles.stepNav}>
              <button className={styles.backStepBtn} onClick={() => setStep(2)}>← Back</button>
              <button
                className={styles.nextBtn}
                onClick={handleSubmit}
              >
                {t('feedback.submit')} 🎉
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}