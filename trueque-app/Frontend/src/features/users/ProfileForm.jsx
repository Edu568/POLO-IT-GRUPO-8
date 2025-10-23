import { useEffect, useState } from "react";
import { getBarrios } from "../../API/userApi";

export const ProfileForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState(user);
  const [barrios, setBarrios] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBarrios = async () => {
      try {
        const data = await getBarrios();
        setBarrios(data);
      } catch {
        setError("Error al cargar barrios");
      }
    };
    fetchBarrios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          name="nombre"
          className="form-control"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
      </div>
      <div className="mb-3">
        <input
          name="apellido"
          className="form-control"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />
      </div>
      <div className="mb-3">
        <input
          name="email"
          type="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-3">
        <select
          name="id_barrio"
          className="form-control"
          value={formData.id_barrio}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar barrio</option>
          {barrios.map((b) => (
            <option key={b.id} value={b.id}>{b.nombre}</option>
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-primary w-100" type="submit">
        Guardar cambios
      </button>
    </form>
  );
};
