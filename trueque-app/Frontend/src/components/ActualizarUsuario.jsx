import { useState, useEffect } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { getBarrios } from "../API/userApi";

export const ActualizarUsuario = ({ usuario, onUsuarioActualizado, onLogout }) => {
  const [formData, setFormData] = useState(usuario || {});
  const [barrios, setBarrios] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    setFormData(usuario || {});
  }, [usuario]);

  useEffect(() => {
    const fetchBarrios = async () => {
      try {
        const barriosData = await getBarrios();
        setBarrios(barriosData);
      } catch (err) {
        console.error("Error cargando barrios:", err);
      }
    };
    fetchBarrios();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
      if (!usuarioLocal) throw new Error("Usuario no autenticado");

      const camposActualizados = {};
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== "")
          camposActualizados[key] = formData[key];
      }

      const res = await fetch(`http://localhost:3000/api/usuario/${usuarioLocal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(camposActualizados),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al actualizar usuario");

      setMensaje(" Datos actualizados correctamente.");
      localStorage.setItem("usuario", JSON.stringify({ ...usuarioLocal, ...camposActualizados }));

      // Notificar al componente padre
      if (onUsuarioActualizado) onUsuarioActualizado({ ...usuario, ...camposActualizados });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card
      className="shadow-lg p-4 mx-auto"
      style={{
        maxWidth: "550px",
        borderRadius: "15px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="text-center mb-4">
        <div
          className="rounded-circle bg-primary text-white mx-auto d-flex align-items-center justify-content-center"
          style={{ width: "90px", height: "90px", fontSize: "2rem" }}
        >
          {formData.nombre?.[0]?.toUpperCase() || "U"}
        </div>
        <h3 className="mt-3 fw-bold">{formData.nombre || "Usuario"}</h3>
        <p className="text-muted mb-0">{formData.email}</p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {mensaje && <Alert variant="success">{mensaje}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre || ""}
            onChange={handleChange}
            placeholder="Tu nombre"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Apellido</Form.Label>
          <Form.Control
            type="text"
            name="apellido"
            value={formData.apellido || ""}
            onChange={handleChange}
            placeholder="Tu apellido"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Tu email"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Barrio</Form.Label>
          <Form.Select
            name="id_barrio"
            value={formData.id_barrio || ""}
            onChange={handleChange}
          >
            <option value="">Seleccione un barrio</option>
            {barrios.map((b) => (
              <option key={b.id} value={b.id}>
                {b.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-between gap-2">
          <Button type="submit" variant="success" className="w-50">
            💾 Guardar cambios
          </Button>
          <Button variant="outline-danger" className="w-50" onClick={onLogout}>
            🚪 Cerrar sesión
          </Button>
        </div>
      </Form>
    </Card>
  );
};
