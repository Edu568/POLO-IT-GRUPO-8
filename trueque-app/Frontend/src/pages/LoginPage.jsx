
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../API/userApi'; // <-- consumir la API desde el helper

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const body = await loginUser({ email, password }); 

      
      if (body.token) localStorage.setItem('token', body.token);
      if (body.usuario) localStorage.setItem('usuario', JSON.stringify(body.usuario));

      setIsLoggedIn(true);
      navigate('/');
    } catch (err) {
      setError('Datos incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          <hr />

          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={() => navigate('/register')}
            disabled={loading}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
