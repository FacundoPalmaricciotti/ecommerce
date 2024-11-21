import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    if (!isValidEmail) {
      setError('Por favor, ingresa un correo electrónico válido.')
      return
    }

    const auth = getAuth()

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('Usuario autenticado:', user)
        navigate('/home')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        if (errorCode === 'auth/user-not-found') {
          setError('El correo electrónico no está registrado. Verifica el correo.')
        } else if (errorCode === 'auth/wrong-password') {
          setError('Contraseña incorrecta. Verifica tu contraseña.')
        } else if (errorCode === 'auth/too-many-requests') {
          setError('Demasiados intentos fallidos. Espera un momento e intenta nuevamente.')
        } else if (errorCode === 'auth/invalid-email') {
          setError('El correo electrónico ingresado no es válido.')
        } else {
          setError('Ocurrió un error al iniciar sesión. Intenta nuevamente.')
        }
      })
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar sesión</h1>
      <form className="login-form" onSubmit={handleLogin}>
        {error && <p className="error-message">{error}</p>}

        <label className="login-label">Correo:</label>
        <input
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo"
          required
        />

        <label className="login-label">Contraseña:</label>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          required
        />

        <button className="login-button" type="submit">
          Iniciar sesión
        </button>

        <p className="footer-text">
          ¿No tienes una cuenta?{' '}
          <span className="register-link" onClick={() => navigate('/register')}>
            Regístrate ahora
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
