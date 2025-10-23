import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBarrios, getUsers } from "../API/userApi";
import { Navbarra } from "../components/Navbarra";
import { Footer } from "../components/Footer";
import { Container, Form, Button, Alert } from "react-bootstrap";

export const PerfilUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [barrios, setBarrios] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Cargar datos del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/usuario/${id}`);
        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchBarrios = async () => {
      try {
        const barriosData = await getBarrios();
        setBarrios(barriosData);
      } catch (err) {
        console.error("Error cargando barrios:", err);
      }
    };

    fetchUsuario();
    fetchBarrios();
  }, [id]);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      const res = await fetch(`http://localhost:3000/api/usuario/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al actualizar usuario");

      setMensaje("✅ Usuario actualizado correctamente.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!usuario) return <div className="text-center mt-5">Cargando usuario...</div>;

  return (
    <>
      <Navbarra />
      <Container className="my-5" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Perfil de Usuario</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {mensaje && <Alert variant="success">{mensaje}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={usuario.nombre || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={usuario.apellido || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={usuario.email || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Barrio</Form.Label>
            <Form.Select
              name="id_barrio"
              value={usuario.id_barrio || ""}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un barrio</option>
              {barrios.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button type="submit" variant="primary">
              Guardar cambios
            </Button>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Container>
      <Footer />
    </>
  );
};
