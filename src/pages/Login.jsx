import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import styles from './Login.module.css'

export default function Login() {
  const { register, login } = useUser()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError(t('login.errorEmail'))
      return
    }
    if (!password.trim()) {
      setError('Please enter your password.')
      return
    }
    if (!isLogin && !name.trim()) {
      setError(t('login.errorName'))
      return
    }

    if (isLogin) {
      const result = login(email, password)
      if (!result.success) {
        setError(result.error)
        return
      }
    } else {
      const result = register(name, email, password)
      if (!result.success) {
        setError(result.error)
        return
      }
    }

    navigate('/welcome')
  }

  return (
    <div className={styles.page}>
      <img
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop"
        alt=""
        className={styles.bgImage}
      />
      <div className={styles.overlay} />

      <div className={styles.formBox}>
        <div className={styles.brand}>▲ BougeVersForme</div>

        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>
            {isLogin ? t('login.welcomeBack') : t('login.createAccount')}
          </h2>
          <p className={styles.formSub}>
            {isLogin ? t('login.signinSub') : t('login.signupSub')}
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.field}>
              <label className={styles.label}>{t('login.fullName')}</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Sarah Gasaro"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>{t('login.email')}</label>
            <input
              type="email"
              className={styles.input}
              placeholder="sarah@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{t('login.password')}</label>
            <input
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? t('login.signin') : t('login.signup')}
          </button>
        </form>

        <p className={styles.toggle}>
          {isLogin ? t('login.noAccount') : t('login.hasAccount')}{' '}
          <button
            className={styles.toggleBtn}
            onClick={() => { setIsLogin(!isLogin); setError('') }}
          >
            {isLogin ? t('login.signupLink') : t('login.signinLink')}
          </button>
        </p>
      </div>
    </div>
  )
}