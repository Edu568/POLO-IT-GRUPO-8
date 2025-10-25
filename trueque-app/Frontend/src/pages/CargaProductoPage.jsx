import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbarra } from "../components/Navbarra";
import { getCategorias } from "../API/userApi";

export default function CargaProductoPage() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]); // múltiples archivos
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [previews, setPreviews] = useState([]); //  inicializar como array
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Cargar categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (err) {
        setError("Error al cargar las categorías");
      }
    };
    fetchCategorias();
  }, []);

  // Manejador de archivos (múltiples)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes(files);
    const previewsTemp = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewsTemp);
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim() || !descripcion.trim() || !categoriaSeleccionada) {
      setError("Todos los campos son requeridos.");
      return;
    }
    if (imagenes.length === 0) {
      setError("Debes seleccionar al menos una imagen (máx. 4).");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("titulo", nombre);
      formData.append("descripcion", descripcion);
      formData.append("id_categoria", categoriaSeleccionada);

      const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
      if (usuario?.id) formData.append("id_dueno", usuario.id);

      // adjuntar todas las imágenes
      imagenes.forEach((file) => formData.append("fotos", file));

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

      alert("Producto cargado correctamente.");
      navigate("/");
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
            <Form.Group className="mb-3">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Juego de vasos artesanales"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Breve descripción del producto"
              />
            </Form.Group>

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
              <Form.Label>Imágenes del producto (máx. 4)</Form.Label>
              <Form.Control type="file" accept="image/*" multiple onChange={handleFileChange} />
              {previews.length > 0 && (
                <div className="mt-3 text-center d-flex flex-wrap justify-content-center gap-2">
                  {previews.map((p, idx) => (
                    <Image
                      key={idx}
                      src={p}
                      alt={`preview-${idx}`}
                      thumbnail
                      style={{ maxHeight: 180, width: "auto" }}
                    />
                  ))}
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
