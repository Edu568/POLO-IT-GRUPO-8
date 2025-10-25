import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser, getBarrios } from "../API/userApi";



const RegisterPage = () => {

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apellido, setApellido] = useState("");
  const [id_barrio, setIdBarrio] = useState("");
  const [barrios, setBarrio] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //primero cargo los barrios del componente
useEffect(() =>{
  const fetchBarrios = async () => {
    try {
      const data = await getBarrios();
      setBarrio(data);
    } catch (error) {
      setError('Error al cargar los barrios');
    }
  };
  fetchBarrios();
},[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try{
      await registerUser({ nombre, apellido, email, password, id_barrio: parseInt(id_barrio) });
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
          <input className="form-control mb-2" placeholder="Apellido" value={apellido} onChange={(e)=>setApellido(e.target.value)} required />
          <select className="form-control mb-2" value={id_barrio} onChange={(e)=>setIdBarrio(e.target.value)} required>
            <option value="">Selecciona un barrio</option>
            {barrios.map(b => <option key={b.id} value={b.id}>{b.nombre}</option>)}
          </select>
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