import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap';

export const Navbarra = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Trueque App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
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
            Bienvenido,  <a href="#login">Prueba</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    </>
  )
}
