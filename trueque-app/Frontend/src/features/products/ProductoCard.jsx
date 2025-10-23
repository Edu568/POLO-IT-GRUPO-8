import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProductoCard = ({ id, nombre, descripcion, imagen }) => {
  return (
    <Card className="h-100 shadow-sm card-custom">
      <div className="image-container">
        <Card.Img
          variant="top"
          src={imagen || "file-not-found.jpg"}
          alt={nombre}
          className="card-img-top"
        />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="text-capitalize text-truncate">{nombre}</Card.Title>
          <Card.Text className="text-muted small text-truncate">{descripcion}</Card.Text>
        </div>
        <Button as={Link} to={`/detalle/${id}`} variant="success" size="sm">
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};
