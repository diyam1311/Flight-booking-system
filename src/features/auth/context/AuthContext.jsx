import { createContext, useCallback, useMemo, useState } from 'react'
import { loginUser, loginWithGoogle as authenticateWithGoogle, registerUser } from '../services/authService'
import { clearSession, loadSession, saveSession } from '../services/sessionService'

export const AuthContext = createContext(null)

// Keeps "who is logged in" for the whole app. Read it with the useAuth() hook.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession)

  const login = useCallback(async (credentials, remember = false) => {
    const loggedInUser = await loginUser({ ...credentials, remember }, remember)
    saveSession(loggedInUser, remember)
    setUser(loggedInUser)
    return loggedInUser
  }, [])

  const loginWithGoogle = useCallback(async (idToken, remember = false) => {
    const loggedInUser = await authenticateWithGoogle(idToken, remember)
    saveSession(loggedInUser, remember)
    setUser(loggedInUser)
    return loggedInUser
  }, [])

  const signup = useCallback(async (details) => {
    const newUser = await registerUser(details)
    saveSession(newUser, true)
    setUser(newUser)
    return newUser
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isLoggedIn: Boolean(user), login, loginWithGoogle, signup, logout }),
    [user, login, loginWithGoogle, signup, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
