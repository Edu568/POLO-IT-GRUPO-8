import React from 'react'  
import { useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
const LoginPage = () => {

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
        setError('Por favor, completa todos los campos.');
        return;
    }

    // Criterio 2: Validación de credenciales
    if (email === 'test@example.com' && password === 'password123') {
        setError('');
        
        // Criterio 3: Mantener la sesión activa
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Criterio 4: Redirección
        window.location.href = '/home'; // Redirige a la página de inicio
    } else {
        // Criterio 5: Mensaje de error
        setError('Correo o contraseña incorrectos.');
    }
    };
return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
            <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Correo electrónico</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="passwordInput" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        
                    />
                </div>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                <hr /> 
                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
            </form>
        </div>
    </div>
);
}

export default LoginPage