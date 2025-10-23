import {Button, Card } from "react-bootstrap"; 
import {Link} from "react-router-dom";

export const ProductoCard = ({ nombre, descripcion }) => {
  return (
    <>
      <Card style={{ width: "18rem" }} className="m-2">
        <Card.Img variant="top" src="file-not-found.jpg" />
        <Card.Body>
          <Card.Title>{nombre}</Card.Title>
          <Card.Text>{descripcion}</Card.Text>
          <Button variant="success"><Link to ="/detalle">Ver más </Link></Button>
        </Card.Body>
      </Card>
    </>
  );
};
