import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import * as authStore from '@/lib/auth'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    setUser(authStore.getCurrentUser())
    setInitializing(false)
  }, [])

  const login = useCallback(({ email, password, expectedRole }) => {
    const loggedIn = authStore.login({ email, password, expectedRole })
    setUser(loggedIn)
    return loggedIn
  }, [])

  const registerStudent = useCallback((payload) => {
    const created = authStore.registerStudent(payload)
    setUser(created)
    return created
  }, [])

  const logout = useCallback(() => {
    authStore.logout()
    setUser(null)
  }, [])

  const refreshUser = useCallback(() => {
    setUser(authStore.getCurrentUser())
  }, [])

  const value = {
    user,
    initializing,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    login,
    registerStudent,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
