import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
import { useEffect, useState } from "react";

export const Navbarra = ({ onSearch = () => {} }) => {
  const [search, setSearch] = useState("");
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(search);
    }
  };

  const handleSearchClick = () => {
    onSearch(search);
  };

  const handleCuentaClick = () => {
    if (usuario) {
      navigate(`/perfil/${usuario.id}`); // 🔹 redirige al perfil del usuario logueado
    } else {
      navigate("/login"); // 🔹 si no hay usuario logueado, redirige al login
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUsuario(null);
    navigate("/login");
  };

  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark" className="navCompleto">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Trueque App
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/perfil">
              Cuenta
            </Nav.Link>
            <Nav.Link as={Link} to="/cargar-producto">
              Cargar Producto
            </Nav.Link>

          </Nav>

          <Form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Buscar"
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className="me-2"
              aria-label="Buscar"
            />
            <Button variant="outline-success" type="button" onClick={handleSearchClick}>
              Buscar
            </Button>
          </Form>

          {usuario && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Bienvenido, <strong>{usuario.nombre}</strong>{" "}
              </Navbar.Text>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </header>
  );
};
