// ...existing code...
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Image } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbarra } from "../components/Navbarra";
import { getCategorias } from "../API/userApi";

export default function CargaProductoPage() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenFile, setImagenFile] = useState(null);
  const [categorias, setCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() =>{
    const fetchCategorias = async () =>{
      try {
        const data = await getCategorias();
        setCategoria(data);
      } catch (error) {
        setError('Error al cargar las categorias');
      }
    };
    fetchCategorias();
  },[]);


  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImagenFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!nombre.trim() || !descripcion.trim() || !categoriaSeleccionada) {
      setError("Campos requeridos.");
      return;
    }
    if (!imagenFile) {
      setError("Debes seleccionar una imagen del producto.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("titulo", nombre);
      formData.append("descripcion", descripcion);
      formData.append("id_categoria", categoriaSeleccionada);
      formData.append("foto", imagenFile); // backend debe esperar 'foto' o ajustar nombre
      // si tu API necesita el id de usuario, obténlo del localStorage
      const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
      if (usuario?.id) formData.append("id_dueno", usuario.id);

      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/publicaciones/", {
        method: "POST",
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const text = await res.text().catch(() => "");
      const body = text ? JSON.parse(text) : {};

      if (!res.ok) {
        throw new Error(body.message || body.error || res.statusText || "Error al crear producto");
      }

      // si el backend devuelve el id del nuevo producto, navegar a su detalle
      const nuevoProducto = body.producto || body || {
        id: body.id || body.insertId,
        titulo: nombre,
        descripcion,
        fotos: body.fotos || [preview] // fallback
      };
      alert("Producto cargado correctamente.");
      
      navigate("/", {state: {nuevoProducto}}); // fallback
    } catch (err) {
      setError(err.message || "Error de red al conectar con la API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbarra />
      <Container className="my-4">
        <Card className="p-3 mx-auto" style={{ maxWidth: 800 }}>
          <Card.Title className="mb-3">Cargar nuevo producto</Card.Title>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Juego de vasos artesanales"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="descripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Breve descripción del producto"
                required
              />
            </Form.Group>
            
            {/* Categoría */}
            <Form.Group className="mb-3" controlId="categoria">
              <Form.Label><strong>Categoría</strong></Form.Label>
              <Form.Select
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="imagen">
              <Form.Label>Imagen del producto</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
              {preview && (
                <div className="mt-3 text-center">
                  <Image src={preview} alt="preview" thumbnail style={{ maxHeight: 240 }} />
                </div>
              )}
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Subiendo..." : "Cargar producto"}
              </Button>
              <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
                Cancelar
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </>
  );
}
// ...existing code...