import React from 'react'  
import { useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { userData } from '../userData';



const LoginPage = ({setIsLoggedIn}) => {

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        
        const user = userData.find(user => user.email === email && user.password === password);

        if (user) {
          setIsLoggedIn(true);
          navigate('/');
        } else {
          // Usuario no encontrado, mostrar mensaje de error
          setError('Correo o contraseña incorrectos.');
        }

        
    }

    
    
return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
            <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label"></label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required
                        
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label"></label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="passwordInput" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Contraseña'
                        required    
                        
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