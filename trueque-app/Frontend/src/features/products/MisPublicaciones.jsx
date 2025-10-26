import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MisPublicaciones = ({ idUsuario }) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/publicaciones/${idUsuario}`);
        if (!res.ok) throw new Error("Error al obtener las publicaciones");
        const data = await res.json();
        setPublicaciones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (idUsuario) fetchPublicaciones();
  }, [idUsuario]);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando tus publicaciones...</p>
      </div>
    );

  if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

  if (publicaciones.length === 0)
    return (
      <div className="text-center text-muted my-4">
        <p>No tienes publicaciones aún.</p>
        <Button as={Link} to="/cargar-producto" variant="success">
          + Crear nueva publicación
        </Button>
      </div>
    );

  return (
    <Row className="g-4 justify-content-center">
      {publicaciones.map((pub) => (
        <Col key={pub.id} xs={12} sm={6} md={4} lg={3}>
          <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden hover-card">
            <div style={{ height: "200px", overflow: "hidden" }}>
              <Card.Img
                src={
                  pub.fotos && pub.fotos.length > 0
                    ? `http://localhost:3000${pub.fotos[0]}`
                    : "/file-not-found.jpg"
                }
                alt={pub.titulo}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                className="card-img-top"
              />
            </div>
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title className="text-truncate fw-bold">{pub.titulo}</Card.Title>
                <Card.Text className="text-muted small text-truncate">
                  {pub.descripcion}
                </Card.Text>
                <span className="badge bg-info text-dark">
                  {pub.categoria || "Sin categoría"}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Button
                  as={Link}
                  to={`/detalle/${pub.id}`}
                  size="sm"
                  variant="outline-primary"
                >
                  Ver más
                </Button>
                <span
                  className={`badge ${
                    pub.disponible ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {pub.disponible ? "Disponible" : "No disponible"}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
