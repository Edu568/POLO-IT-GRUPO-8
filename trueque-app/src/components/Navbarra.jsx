import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import "./nav.css";

export const Navbarra = () => {
  return (
    <header>
      
      <Navbar bg="dark" data-bs-theme="dark" className="navCompleto">
        <Container>
          <Navbar.Brand>Trueque App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Link className="links" to='/'>Inicio</Link></Nav.Link>
            <Nav.Link href="#features">Productos</Nav.Link>
            <Nav.Link><Link to="/login">Cuenta</Link></Nav.Link>
          </Nav>
        </Container>
        <Container>
          <Form className="d-flex" role="search">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Buscar</Button>
          </Form>
        </Container>
        <Container>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Bienvenido, <a href="#login">Prueba</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
