// ...existing code...
import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./nav.css";
import { useEffect, useState } from "react";

export const Navbarra = ({ onSearch = () => {} }) => {
  const [search, setSearch] = useState("");
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      onSearch(search);
      console.log(search);
    }
  };

  const handleSearchClick = () => {
    onSearch(search);
    
  };

  

  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark" className="navCompleto" onSearch={handleSearchChange}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Trueque App
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Cuenta
            </Nav.Link>
          </Nav>

          <Form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Buscar"
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className="me-2"
              aria-label="Search"
              value={search}
            />
            <Button variant="outline-success" type="button" onClick={handleSearchClick}>
              Buscar
            </Button>
          </Form>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Bienvenido, <a> {usuario ? usuario.nombre : 'Cuenta'}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};