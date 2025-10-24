import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductoCard.css";

export const ProductoCard = ({ id, nombre, descripcion, imagen }) => {
  return (
    <Card className="producto-card shadow-sm h-100 border-0">
      {/* Imagen */}
      <div className="producto-imagen-container">
        <Card.Img
          variant="top"
          src={imagen || "/file-not-found.jpg"}
          alt={nombre}
          className="producto-imagen"
        />
      </div>

      {/* Contenido */}
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="producto-titulo text-capitalize">{nombre}</Card.Title>
          <Card.Text className="producto-descripcion text-muted">
            {descripcion?.length > 70
              ? descripcion.slice(0, 70) + "..."
              : descripcion || "Sin descripción disponible"}
          </Card.Text>
        </div>

        <Button
          as={Link}
          to={`/detalle/${id}`}
          variant="success"
          size="sm"
          className="mt-2 w-100 fw-semibold"
        >
          Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
};
