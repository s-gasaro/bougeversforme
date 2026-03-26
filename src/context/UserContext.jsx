import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bougeversforme_session')
      return saved ? JSON.parse(saved) : {
        name: null,
        email: null,
        goal: null,
        level: null,
        availableDays: [],
        schedule: {},
        plan: null,
        feedback: null,
      }
    } catch {
      return {
        name: null,
        email: null,
        goal: null,
        level: null,
        availableDays: [],
        schedule: {},
        plan: null,
        feedback: null,
      }
    }
  })

  useEffect(() => {
    if (user.email) {
      localStorage.setItem('bougeversforme_session', JSON.stringify(user))
    }
  }, [user])

  function updateUser(newData) {
    setUser(prev => ({ ...prev, ...newData }))
  }

  function resetUser() {
    localStorage.removeItem('bougeversforme_session')
    setUser({
      name: null,
      email: null,
      goal: null,
      level: null,
      availableDays: [],
      schedule: {},
      plan: null,
      feedback: null,
    })
  }

  // Register a new user
  function register(name, email, password) {
    const users = JSON.parse(localStorage.getItem('bougeversforme_users') || '[]')

    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists.' }
    }

    // Save new user
    users.push({ name, email, password })
    localStorage.setItem('bougeversforme_users', JSON.stringify(users))

    // Log them in
    updateUser({ name, email })
    localStorage.setItem('bougeversforme_session', JSON.stringify({ ...user, name, email }))

    return { success: true }
  }

  // Login existing user
  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('bougeversforme_users') || '[]')
    const found = users.find(u => u.email === email)

    if (!found) {
      return { success: false, error: 'No account found with this email.' }
    }

    if (found.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' }
    }

    // Restore their previous data if any
    const savedData = localStorage.getItem(`bougeversforme_data_${email}`)
    const userData = savedData ? JSON.parse(savedData) : {}

    updateUser({ ...userData, name: found.name, email: found.email })
    return { success: true }
  }

  return (
    <UserContext.Provider value={{ user, updateUser, resetUser, register, login }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used inside a UserProvider')
  }
  return context
}