// ...existing code...
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Navbarra } from '../components/Navbarra';

export const ConfirmationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [productoSeleccionado, setProductoSeleccionado] = useState(location.state?.producto || null);
    const [misProductos, setMisProductos] = useState([]);
    const [productoOfrecido, setProductoOfrecido] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        const fetchProducto = async () => {
            if (productoSeleccionado) return; // ya lo tenemos por state
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`http://localhost:3000/api/publicaciones/publicacion/${id}`);
                if (!res.ok) throw new Error('No se pudo obtener el producto');
                const data = await res.json();
                if (!mounted) return;
                const imagen = data.fotos && data.fotos.length > 0
                    ? (data.fotos[0].startsWith('http') ? data.fotos[0] : `http://localhost:3000${data.fotos[0]}`)
                    : 'placeholder.jpg';
                setProductoSeleccionado({
                    id: data.id,
                    nombre: data.titulo || data.nombre,
                    descripcion: data.descripcion || '',
                    imagen,
                });
            } catch (err) {
                if (!mounted) return;
                setError(err.message);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        const fetchMisProductos = async () => {
            try {
                const usuario = JSON.parse(localStorage.getItem('usuario'));
                if (!usuario?.id) return;
                const res = await fetch(`http://localhost:3000/api/publicaciones/usuario/${usuario.id}`);
                if (!res.ok) throw new Error('No se pudieron cargar tus productos');
                const data = await res.json();
                if (!mounted) return;
                const mapped = data.map(p => ({
                    id: p.id,
                    nombre: p.titulo || p.nombre,
                    descripcion: p.descripcion || '',
                    imagen: p.fotos && p.fotos.length > 0 ? (p.fotos[0].startsWith('http') ? p.fotos[0] : `http://localhost:3000${p.fotos[0]}`) : 'placeholder.jpg'
                }));
                setMisProductos(mapped);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducto();
        fetchMisProductos();

        return () => { mounted = false; };
    }, [id, productoSeleccionado]);

    const handleConfirmar = () => {
        if (!productoOfrecido) return alert('Selecciona un producto para ofrecer');
        // aquí envía la solicitud de intercambio al backend o guarda localmente
        alert(`Intercambio iniciado:\nDeseado: ${productoSeleccionado.nombre}\nOfrecido: ${productoOfrecido.nombre}`);
        navigate('/');
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!productoSeleccionado) return <div>No se encontró el producto.</div>;

    return (
        <>
            <Navbarra />
            <Container className="mt-4">
                <h2 className="text-center mb-4">Confirmar intercambio</h2>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header>Producto que deseas</Card.Header>
                            <Card.Body>
                                <Card.Img variant="top" src={productoSeleccionado.imagen || 'placeholder.jpg'} style={{ height: 200, objectFit: 'cover' }} />
                                <Card.Title className="mt-3">{productoSeleccionado.nombre}</Card.Title>
                                <Card.Text>{productoSeleccionado.descripcion}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card>
                            <Card.Header>Tu producto para ofrecer</Card.Header>
                            <Card.Body>
                                {productoOfrecido ? (
                                    <>
                                        <Card.Img variant="top" src={productoOfrecido.imagen} style={{ height: 200, objectFit: 'cover' }} />
                                        <Card.Title className="mt-3">{productoOfrecido.nombre}</Card.Title>
                                        <Card.Text>{productoOfrecido.descripcion}</Card.Text>
                                        <Button variant="outline-primary" onClick={() => setProductoOfrecido(null)}>Cambiar producto</Button>
                                    </>
                                ) : (
                                    <>
                                        <p>Selecciona uno de tus productos:</p>
                                        <Row>
                                            {misProductos.length === 0 && <div className="px-3">No tienes productos registrados.</div>}
                                            {misProductos.map(prod => (
                                                <Col md={6} key={prod.id} className="mb-3">
                                                    <Card onClick={() => setProductoOfrecido(prod)} style={{ cursor: 'pointer' }}>
                                                        <Card.Img variant="top" src={prod.imagen} style={{ height: 100, objectFit: 'cover' }} />
                                                        <Card.Body>
                                                            <Card.Title>{prod.nombre}</Card.Title>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {productoOfrecido && (
                    <div className="text-center mt-4">
                        <Button variant="success" size="lg" onClick={handleConfirmar}>Confirmar intercambio</Button>
                    </div>
                )}
            </Container>
        </>
    );
};
// ...existing code...