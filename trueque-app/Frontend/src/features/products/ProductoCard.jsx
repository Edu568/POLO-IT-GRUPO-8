import { Button, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProductoCard = ({ id, nombre, descripcion, imagen, categoria, disponible }) => {
  return (
    <Card className="h-100 shadow-sm card-custom border-0 rounded-4 overflow-hidden hover-card">
      <div className="image-container">
        <Card.Img
          variant="top"
          src={imagen || "/file-not-found.jpg"}
          alt={nombre}
          className="card-img-top"
          style={{ height: "220px", objectFit: "cover" }}
        />
      </div>

      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="text-capitalize text-truncate fw-semibold">{nombre}</Card.Title>
          <Card.Text className="text-muted small text-truncate mb-2">{descripcion}</Card.Text>

          {/* Categoría y disponibilidad */}
          <div className="d-flex justify-content-between align-items-center">
            <Badge bg="info" text="dark">
              {categoria || "Sin categoría"}
            </Badge>
            <Badge bg={disponible ? "success" : "secondary"}>
              {disponible ? "Disponible" : "No disponible"}
            </Badge>
          </div>
        </div>

        <Button as={Link} to={`/detalle/${id}`} variant="success" size="sm" className="mt-3">
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};
