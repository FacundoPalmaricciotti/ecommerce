import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'; // Agregar `updateProfile`
import { auth } from '../firebase-config';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nombre, setNombre] = useState(''); // Nuevo estado
    const [apellido, setApellido] = useState(''); // Nuevo estado
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setPasswordError('');

        if (!nombre || !apellido) {
            setError('Por favor ingresa tu nombre y apellido');
            return;
        }

        if (password.length < 6) {
            setPasswordError('La contraseña debe tener al menos 6 caracteres y una mayúscula');
            return;
        }

        const hasUppercase = /[A-Z]/.test(password);
        if (!hasUppercase) {
            setPasswordError('La contraseña debe incluir al menos una letra mayúscula');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Actualizar perfil con nombre y apellido
            await updateProfile(user, {
                displayName: `${nombre} ${apellido}`,
            });

            // Cerrar sesión automáticamente después del registro
            await signOut(auth);

            navigate('/login', { replace: true });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('El correo ya está registrado');
            } else {
                setError('Ocurrió un error al registrar el usuario');
            }
        }
    };

    return (
        <div className="register-container">
            <h1 className="register-title">Registrarse</h1>
            <form className="register-form" onSubmit={handleRegister}>
                <label className="register-label">Nombre:</label>
                <input
                    className="register-input"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingresa tu nombre"
                    required
                />

                <label className="register-label">Apellido:</label>
                <input
                    className="register-input"
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Ingresa tu apellido"
                    required
                />

                <label className="register-label">Correo:</label>
                <input
                    className="register-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo"
                    required
                />

                <label className="register-label">Contraseña:</label>
                <div className="password-input-container">
                    <input
                        className="register-input"
                        type={passwordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                    <span
                        className="eye-icon"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {passwordError && <p className="error">{passwordError}</p>}

                <label className="register-label">Confirmar Contraseña:</label>
                <div className="password-input-container">
                    <input
                        className="register-input"
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repite tu contraseña"
                        required
                    />

                    <span
                        className="eye-icon"
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    >
                        {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {error && <p className="error">{error}</p>}
                </div>

                <button className="register-button" type="submit">
                    Registrarse
                </button>
                <p className="footer-text">
                    ¿Ya tienes una cuenta?{' '}
                    <span className="register-link" onClick={() => navigate('/login')}>Inicia sesión</span>
                </p>
            </form>
        </div>
    );
};

export default Register