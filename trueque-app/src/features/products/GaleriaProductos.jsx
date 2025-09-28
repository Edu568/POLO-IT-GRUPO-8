import { ProductoCard } from "./ProductoCard";
import { Container, Row, Col } from "react-bootstrap";

export const GaleriaProductos = () => {
  return (
    <Container fluid className="justify-content-center">
      <Row className="justify-content-center">
        <Col xs={12} md={4}>
          <ProductoCard
            nombre="Producto 1"
            descripcion="Descripción del producto 1"
          />
        </Col>
        <Col xs={12} md={4}>
          <ProductoCard
            nombre="Producto 2"
            descripcion="Descripción del producto 2"
          />
        </Col>
        <Col xs={12} md={4}>
          <ProductoCard
            nombre="Producto 3"
            descripcion="Descripción del producto 3"
          />
        </Col>
      </Row>
    </Container>
  );
};
