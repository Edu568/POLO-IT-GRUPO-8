// ...existing code...
import { Navbarra } from '../components/Navbarra';
import { Footer } from '../components/Footer';
import { Container, Row, Col, Button, Carousel, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export const DetalleProducto = () => {
  const { id } = useParams();  // Obtiene el ID de la ruta
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [intencionTrueque, setIntencionTrueque] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [notificacion, setNotificacion] = useState("");
  const [enCarrito, setEnCarrito] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        // Producto por id
        const resProd = await fetch(`http://localhost:3000/api/publicaciones/publicacion/${id}`);
        if (!resProd.ok) throw new Error('Producto no encontrado');
        const data = await resProd.json();

        const imagenes = data.fotos && data.fotos.length > 0
          ? data.fotos.map(foto => (foto.startsWith('http') ? foto : `http://localhost:3000${foto}`))
          : ["./file-not-found.jpg"];

        if (mounted) {
          setProducto({
            id: data.id,
            nombre: data.titulo || data.nombre,
            descripcion: data.descripcion || '',
            imagenes,
            productoDeseado: data.productoDeseado || "Botella artesanal de vino tinto"
          });
        }

        // Productos relacionados
        const resRel = await fetch('http://localhost:3000/api/publicaciones');
        if (!resRel.ok) throw new Error('Error al cargar relacionados');
        const all = await resRel.json();
        const relacionados = all.filter(prod => prod.id !== Number(id)).slice(0, 6);
        if (mounted) {
          setProductosRelacionados(relacionados.map(prod => ({
            id: prod.id,
            nombre: prod.titulo,
            imagen: prod.fotos && prod.fotos.length > 0 ? (prod.fotos[0].startsWith('http') ? prod.fotos[0] : `http://localhost:3000${prod.fotos[0]}`) : "./file-not-found.jpg"
          })));
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();
    return () => { mounted = false; };
  }, [id]);

  // Verifica si el producto ya está en el carrito al cargar
  useEffect(() => {
    if (producto) {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      setEnCarrito(carrito.some(item => item.id === producto.id));
    }
  }, [producto]);

  // Lógica para agregar al carrito
  const handleAgregarCarrito = () => {
    if (!producto) return;
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (!carrito.some(item => item.id === producto.id)) {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        imagen: producto.imagenes[0]
      });
      localStorage.setItem('carrito', JSON.stringify(carrito));
      setEnCarrito(true);
      setNotificacion("Agregado al carrito");
      setTimeout(() => setNotificacion(""), 2000);
    }
  };

  // Lógica para eliminar del carrito
  const handleEliminarCarrito = () => {
    if (!producto) return;
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== producto.id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    setEnCarrito(false);
    setNotificacion("Eliminado del carrito");
    setTimeout(() => setNotificacion(""), 2000);
  };

  const handleTrueque = () => {
    setIntencionTrueque(true);
    // Navegar a la página de intercambio pasando el producto seleccionado en state
    navigate(`/confirmation/${producto.id}`, { state: { producto } });
  };

  const handleVolver = () => {
    window.history.back();
  };

  const cantidadProductos = 3;
  const slidesDesktop = [];
  for (let i = 0; i < productosRelacionados.length; i += cantidadProductos) {
    slidesDesktop.push(productosRelacionados.slice(i, i + cantidadProductos));
  }

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <>
      {/* Notificación flotante */}
      {notificacion && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
          background: '#193f87ff',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          fontWeight: 'bold'
        }}>
          {notificacion}
        </div>
      )}

      <Navbarra />
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Carousel>
              {producto.imagenes.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt={`Imagen ${idx + 1}`}
                    style={{
                      height: '400px',
                      objectFit: 'cover',
                      width: '100%'
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col xs={12} md={6} className="d-flex flex-column justify-content-center">
            <Card>
              <Card.Body>
                <Card.Title as="h2">{producto.nombre}</Card.Title>
                <Card.Text>
                  <strong>Descripción:</strong> {producto.descripcion}
                </Card.Text>
                <Card.Text>
                  <strong>Producto deseado en intercambio:</strong> {producto.productoDeseado}
                </Card.Text>
                <div className="d-flex flex-column flex-md-row gap-2 mt-3">
                  <Button variant="success" onClick={handleTrueque}>
                    Iniciar intercambio
                  </Button>
                  {!enCarrito ? (
                    <Button variant="primary" onClick={handleAgregarCarrito}>
                      Agregar al carrito
                    </Button>
                  ) : (
                    <Button variant="danger" onClick={handleEliminarCarrito}>
                      Eliminar del carrito
                    </Button>
                  )}
                  <Button variant="secondary" onClick={handleVolver}>
                    Volver
                  </Button>
                </div>
                {intencionTrueque && (
                  <div className="alert alert-info mt-3">
                    Trueque registrado. *Se enviará notificación al dueño*
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="mb-5 relacionadosMobile">
        <h4 className="mb-3">Productos relacionados</h4>
        <Carousel indicators={false} interval={null}>
          {productosRelacionados.map((prod, idx) => (
            <Carousel.Item key={idx}>
              <Row className="justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4}>
                  <Card className="text-center">
                    <Card.Img
                      variant="top"
                      src={prod.imagen}
                      alt={prod.nombre}
                      style={{
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{prod.nombre}</Card.Title>
                      <Link to={`/detalle/${prod.id}`}>
                        <Button variant="outline-primary" size="sm">Ver producto</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <Container className="mb-5 d-none d-md-block relacionadosDesktop">
        <h4 className="mb-3">Productos relacionados</h4>
        <Carousel
          activeIndex={carouselIdx}
          onSelect={setCarouselIdx}
          indicators={false}
          interval={null}
          nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
          prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
        >
          {slidesDesktop.map((slide, idx) => (
            <Carousel.Item key={idx}>
              <Row className="justify-content-center">
                {slide.map((prod, prodIdx) => (
                  <Col md={4} key={prodIdx}>
                    <Card className="text-center mb-3">
                      <Card.Img
                        variant="top"
                        src={prod.imagen}
                        alt={prod.nombre}
                        style={{
                          height: '200px',
                          objectFit: 'cover'
                        }}
                      />
                      <Card.Body>
                        <Card.Title>{prod.nombre}</Card.Title>
                        <Link to={`/detalle/${prod.id}`}>
                          <Button variant="outline-primary" size="sm">Ver producto</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      <Footer />
    </>
  );
};
// ...existing code...