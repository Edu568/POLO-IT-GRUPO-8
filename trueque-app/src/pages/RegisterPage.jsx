import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../API/userApi";



const RegisterPage = () => {

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try{
      await registerUser({ nombre, email, password });
      navigate("/login");

    } catch (err) {
      setError(err.message || "Error al registrar usuario");
    }
  };
  
  return (
     <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: 400 }}>
        <h3 className="mb-3">Registrarse</h3>
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" placeholder="Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} required />
          <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input className="form-control mb-3" type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          {error && <div className="alert alert-danger">{error}</div>}
          <button className="btn btn-primary w-100" type="submit">Registrar</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage