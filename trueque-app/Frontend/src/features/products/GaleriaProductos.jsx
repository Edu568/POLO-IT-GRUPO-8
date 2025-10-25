import { ProductoCard } from "./ProductoCard";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./GaleriaProductos.css"; 

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

  if (loading)
    return (
      <div className="text-center mt-5 fade-in">
        <Spinner animation="border" variant="success" size="lg" />
        <p className="mt-3 text-muted">Cargando productos...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-danger mt-5 fade-in">
        <h5>⚠️ Error</h5>
        <p>{error}</p>
      </div>
    );

  return (
    <Container className="my-5 fade-in">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-uppercase">🎁 Publicaciones disponibles</h2>
        <p className="text-muted">
          Explora los productos disponibles para intercambio en tu comunidad.
        </p>
        <hr className="w-25 mx-auto border-success opacity-75" />
      </div>

      <Row className="g-4 justify-content-center">
        {productos.map((prod) => (
          <Col key={prod.id} xs={12} sm={6} md={4} lg={3}>
            <div className="producto-card-hover">
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
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
