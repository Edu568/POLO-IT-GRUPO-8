import { ProductoCard } from "./ProductoCard";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

export const GaleriaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/publicaciones");
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  if (loading) return <div className="text-center mt-5">Cargando productos...</div>;
  if (error) return <div className="text-center text-danger mt-5">Error: {error}</div>;

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Publicaciones disponibles</h2>
      <Row className="g-4">
        {productos.map((prod) => (
          <Col key={prod.id} xs={12} sm={6} md={4} lg={3}>
            <ProductoCard
              id={prod.id}
              nombre={prod.titulo}
              descripcion={prod.descripcion}
              imagen={
                prod.fotos && prod.fotos.length > 0
                  ? `http://localhost:3000${prod.fotos[0]}`
                  : "/file-not-found.jpg"
              }
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
