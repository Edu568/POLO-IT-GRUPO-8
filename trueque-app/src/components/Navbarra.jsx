import { Container, Nav, Navbar, Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import "./nav.css";

export const Navbarra = () => {
  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="navPequeño">
        <Container className="d-flex fle-row justify-content-between m-2 p-1 containerNavPequeño">
          <Navbar.Brand href="#home">Trueque App</Navbar.Brand>
        <Navbar.Toggle />
        </Container>
        <Navbar.Collapse>
          <Container>
            <Nav className="d-flex flex-row justify-content-around mt-3">
              <Nav.Link><Link className="links" to='/'>Inicio</Link></Nav.Link>
              <Nav.Link href="#features">Productos</Nav.Link>
              <Nav.Link href="#pricing">Cuenta</Nav.Link>
            </Nav>
            <Container className="mt-3 p-0">
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
            <Container className="mt-3 mb-1 p-0">
              <Navbar.Text>
                Bienvenido, <a href="#login">Prueba</a>
              </Navbar.Text>
            </Container>
          </Container>
        </Navbar.Collapse>
      </Navbar>
      <Navbar bg="dark" data-bs-theme="dark" className="navCompleto">
        <Container>
          <Navbar.Brand>Trueque App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link><Link className="links" to='/'>Inicio</Link></Nav.Link>
            <Nav.Link href="#features">Productos</Nav.Link>
            <Nav.Link href="#pricing">Cuenta</Nav.Link>
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
