import { Navbarra } from "../components/Navbarra";
import { Footer } from "../components/Footer";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBarrios } from "../API/userApi";

export const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [barrios, setBarrios] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Obtener usuario logueado desde localStorage
  const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!usuarioLocal) {
      navigate("/login");
      return;
    }

    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/usuario/${usuarioLocal.id}`);
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
  }, [navigate]);

  // Manejador de cambios
  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  // Guardar cambios parciales
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      // Solo envío los campos con cambios (manteniendo los valores anteriores)
      const camposActualizados = {};
      for (const key in usuario) {
        if (usuario[key] !== null && usuario[key] !== undefined && usuario[key] !== "")
          camposActualizados[key] = usuario[key];
      }

      const res = await fetch(`http://localhost:3000/api/usuario/${usuarioLocal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(camposActualizados),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al actualizar usuario");

      setMensaje("✅ Datos actualizados correctamente.");
      // Actualizar usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify({ ...usuarioLocal, ...camposActualizados }));
    } catch (err) {
      setError(err.message);
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  if (!usuario) return <div className="text-center mt-5">Cargando usuario...</div>;

  return (
    <>
      <Navbarra />

      <Container
        className="d-flex justify-content-center align-items-center my-5"
        style={{ minHeight: "70vh" }}
      >
        <Card
          className="shadow-lg p-4"
          style={{
            width: "100%",
            maxWidth: "500px",
            borderRadius: "15px",
            backgroundColor: "#f8f9fa",
          }}
        >
          {/* Avatar y título */}
          <div className="text-center mb-4">
            <div
              className="rounded-circle bg-primary text-white mx-auto d-flex align-items-center justify-content-center"
              style={{ width: "90px", height: "90px", fontSize: "2rem" }}
            >
              {usuario.nombre?.[0]?.toUpperCase() || "U"}
            </div>
            <h3 className="mt-3 fw-bold">Perfil de Usuario</h3>
            <p className="text-muted mb-0">{usuario.email}</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}
          {mensaje && <Alert variant="success">{mensaje}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={usuario.nombre || ""}
                onChange={handleChange}
                placeholder="Tu nombre"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={usuario.apellido || ""}
                onChange={handleChange}
                placeholder="Tu apellido"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={usuario.email || ""}
                onChange={handleChange}
                placeholder="Tu email"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Barrio</Form.Label>
              <Form.Select
                name="id_barrio"
                value={usuario.id_barrio || ""}
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
              <Button variant="outline-danger" className="w-50" onClick={handleLogout}>
                🚪 Cerrar sesión
              </Button>
            </div>
          </Form>
        </Card>
      </Container>

      <Footer />
    </>
  );
};
