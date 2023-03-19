import { useState } from 'react'
import { navigate } from 'gatsby'
import { getUser, handleLogin, handleLogout, handleRegister, isLoggedIn } from '../services/auth'

const useAuth = () => {
  const [response, setResponse] = useState({ isLoading: false, isError: false, error: null })

  const login = async (form, returnUrl = "/") => {
    try {
      setResponse({ isLoading: true, isError: false, error: null })
      await handleLogin(form)
      navigate(returnUrl)
    } catch (e) {
      console.log(e)
      setResponse({ isLoading: false, isError: true, error: e })
    }
  }

  const createUser = async (form, returnUrl = "/") => {
    try {
      setResponse({ isLoading: true, isError: false, error: null })
      await handleRegister(form)
      navigate(returnUrl)
    } catch (e) {
      console.log(e)
      setResponse({ isLoading: false, isError: true, error: e })
    }
  }

  const logout = () => {
    handleLogout()
    navigate('/login')
  }

  return {
    isLoading: response.isLoading,
    isError: response.isError,
    error: response.error,
    login,
    createUser,
    getUser,
    isLoggedIn,
    logout
  }
}

export default useAuth