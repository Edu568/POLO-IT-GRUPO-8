import { ProductoCard } from "./ProductoCard";
import { Container, Row, Col } from "react-bootstrap";

export const GaleriaProductos = () => {

  /* lista de productos */

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <ProductoCard
            nombre="Producto 1"
            descripcion="Descripción del producto 1"
          />
        </Col>
        <Col className="d-flex justify-content-center">
          <ProductoCard
            nombre="Producto 2"
            descripcion="Descripción del producto 2"
          />
        </Col>
        <Col className="d-flex justify-content-center">
          <ProductoCard
            nombre="Producto 3"
            descripcion="Descripción del producto 3"
          />
        </Col>
      </Row>
    </Container>
  );
};
