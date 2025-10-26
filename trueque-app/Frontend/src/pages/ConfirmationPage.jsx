import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Modal, Toast } from 'react-bootstrap';
import { Navbarra } from '../components/Navbarra';

export const ConfirmationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const normalizeProductoFromState = (p) => {
        if (!p) return null;
        
        const imagenFromArray = p.imagenes && p.imagenes.length > 0 ? p.imagenes[0] : (p.fotos && p.fotos.length > 0 ? p.fotos[0] : null);
        const imagen = p.imagen || (imagenFromArray ? (imagenFromArray.startsWith('http') ? imagenFromArray : `http://localhost:3000${imagenFromArray}`) : 'placeholder.jpg');
        return {
            id: p.id,
            nombre: p.nombre || p.titulo || p.tituloPublicacion || '',
            descripcion: p.descripcion || '',
            imagen,
            productoDeseado: p.productoDeseado || p.productoDeseado || null,
        };
    };

    const [productoSeleccionado, setProductoSeleccionado] = useState(normalizeProductoFromState(location.state?.producto) || null);
    const [misProductos, setMisProductos] = useState([]);
    const [misLoading, setMisLoading] = useState(false);
    const [misError, setMisError] = useState(null);
    const [productoOfrecido, setProductoOfrecido] = useState(normalizeProductoFromState(location.state?.productoOfrecido) || null);

    
    useEffect(() => {
        const newProd = location.state?.productoOfrecido;
        if (newProd) {
            setProductoOfrecido(normalizeProductoFromState(newProd));
        }
    }, [location.state?.productoOfrecido]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const fetchProducto = async () => {
            
            if (productoSeleccionado) return;
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
                    productoDeseado: data.productoDeseado || null,
                });
            } catch (err) {
                if (!mounted) return;
                setError(err.message);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        const fetchMisProductos = async () => {
            setMisLoading(true);
            setMisError(null);
            try {
                const usuario = JSON.parse(localStorage.getItem('usuario'));
                if (!usuario?.id) {
                    setMisProductos([]);
                    setMisError('Debes iniciar sesión para ver tus productos.');
                    return;
                }
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
                if (!mounted) return;
                setMisError(err.message);
            } finally {
                if (mounted) setMisLoading(false);
            }
        };

    fetchProducto();
    fetchMisProductos();

        return () => { mounted = false; };
    }, [id, productoSeleccionado]);

    
    const handleRecargarMisProductos = () => {
        
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (!usuario?.id) {
            setMisError('Debes iniciar sesión para ver tus productos.');
            setMisProductos([]);
            return;
        }
        
        (async () => {
            setMisLoading(true);
            setMisError(null);
            try {
                const res = await fetch(`http://localhost:3000/api/publicaciones/usuario/${usuario.id}`);
                if (!res.ok) throw new Error('No se pudieron cargar tus productos');
                const data = await res.json();
                const mapped = data.map(p => ({
                    id: p.id,
                    nombre: p.titulo || p.nombre,
                    descripcion: p.descripcion || '',
                    imagen: p.fotos && p.fotos.length > 0 ? (p.fotos[0].startsWith('http') ? p.fotos[0] : `http://localhost:3000${p.fotos[0]}`) : 'placeholder.jpg'
                }));
                setMisProductos(mapped);
            } catch (err) {
                console.error(err);
                setMisError(err.message);
            } finally {
                setMisLoading(false);
            }
        })();
    };

    const handleConfirmar = () => {
        if (!productoOfrecido) return setError('Selecciona un producto para ofrecer');
       
        setShowConfirmModal(true);
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const redirectTimeoutRef = useRef(null);

    const handleModalConfirm = async () => {
        // Intentar marcar la publicación deseada como no disponible en el backend
        try {
            const idDeseado = productoSeleccionado?.id;
            if (idDeseado) {
                // Obtener datos actuales de la publicación
                const resGet = await fetch(`http://localhost:3000/api/publicaciones/publicacion/${idDeseado}`);
                if (!resGet.ok) throw new Error('No se pudo obtener la publicación para actualizar');
                const data = await resGet.json();

                const payload = {
                    titulo: data.titulo || data.nombre || productoSeleccionado.nombre,
                    descripcion: data.descripcion || productoSeleccionado.descripcion || '',
                    estado: data.estado || null,
                    disponible: 0
                };

                const resPut = await fetch(`http://localhost:3000/api/publicaciones/${idDeseado}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!resPut.ok) {
                    const txt = await resPut.text().catch(() => '');
                    console.error('Error actualizando publicación:', resPut.status, txt);
                }
            }
        } catch (err) {
            console.error('Error marcando publicación no disponible:', err);
        } finally {
            setShowConfirmModal(false);
            // Mostrar toast de éxito y redirigir después de un breve delay
            setShowSuccessToast(true);
            redirectTimeoutRef.current = setTimeout(() => {
                navigate('/');
            }, 1500);
        }
    };

    const handleModalCancel = () => {
        setShowConfirmModal(false);
    };

    
    useEffect(() => {
        return () => {
            if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
        };
    }, []);

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
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <p className="mb-0">Selecciona uno de tus productos:</p>
                                            <div className="d-flex gap-2 align-items-center">
                                                <Button variant="outline-secondary" size="sm" onClick={handleRecargarMisProductos}>Recargar</Button>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() => navigate('/cargar-producto', { state: { returnTo: `/confirmation/${id}`, returnState: { producto: productoSeleccionado } } })}
                                                >
                                                    Cargar producto
                                                </Button>
                                            </div>
                                        </div>

                                        {misLoading ? (
                                            <div className="d-flex align-items-center gap-2 px-2">
                                                <Spinner animation="border" size="sm" />
                                                <small>Cargando tus productos...</small>
                                            </div>
                                        ) : misError ? (
                                            <div className="px-3">
                                                <div className="text-danger mb-2">{misError}</div>
                                                {misError.toLowerCase().includes('iniciar sesión') ? (
                                                    <Link to="/login"><Button>Iniciar sesión</Button></Link>
                                                ) : (
                                                    <Button onClick={handleRecargarMisProductos}>Reintentar</Button>
                                                )}
                                            </div>
                                        ) : (
                                            <Row>
                                                {misProductos.length === 0 && (
                                                    <div className="px-3">No tienes productos registrados. <Link to="/cargar-producto" state={{ returnTo: `/confirmation/${id}`, returnState: { producto: productoSeleccionado } }}>Cargar uno</Link></div>
                                                )}
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
                                        )}
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

            {/* Modal de confirmación */}
            <Modal show={showConfirmModal && !!productoOfrecido} onHide={handleModalCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar intercambio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Vas a iniciar un intercambio con los siguientes productos:</p>
                    <Row>
                        <Col md={6} className="text-center">
                            <strong>Deseado</strong>
                            <div className="my-2">
                                <img src={productoSeleccionado.imagen || 'placeholder.jpg'} alt="deseado" style={{ width: '100%', maxHeight: 150, objectFit: 'cover' }} />
                            </div>
                            <div>{productoSeleccionado.nombre}</div>
                        </Col>
                        <Col md={6} className="text-center">
                            <strong>Ofrecido</strong>
                            <div className="my-2">
                                <img src={productoOfrecido?.imagen || 'placeholder.jpg'} alt="ofrecido" style={{ width: '100%', maxHeight: 150, objectFit: 'cover' }} />
                            </div>
                            <div>{productoOfrecido?.nombre || ''}</div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalCancel}>Cancelar</Button>
                    <Button variant="primary" onClick={handleModalConfirm}>Confirmar</Button>
                </Modal.Footer>
            </Modal>
            {/* Toast de éxito */}
            <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1060 }}>
                <Toast show={showSuccessToast} onClose={() => setShowSuccessToast(false)} bg="success" autohide delay={1400}>
                    <Toast.Body style={{ color: '#fff', fontWeight: '600' }}>Trueque confirmado</Toast.Body>
                </Toast>
            </div>
        </>
    );
};
