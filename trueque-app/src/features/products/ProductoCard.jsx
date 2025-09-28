import {Button, Card } from "react-bootstrap"; 

export const ProductoCard = ({ nombre, descripcion }) => {
  return (
    <>
      <Card style={{ width: "18rem" }} className="m-2">
        <Card.Img variant="top" src="file-not-found.jpg" />
        <Card.Body>
          <Card.Title>{nombre}</Card.Title>
          <Card.Text>{descripcion}</Card.Text>
          <Button variant="primary">Ver más</Button>
        </Card.Body>
      </Card>
    </>
  );
};
