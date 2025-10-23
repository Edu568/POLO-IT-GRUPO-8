import {Container, Row } from "react-bootstrap"; 

export const Footer = () => {
  return (
    <footer>
        <Container fluid>
        <Row className="bg-dark text-white justify-content-center">
            © 2025 TruequeApp. Todos los derechos reservados.
        </Row>
        </Container>
    </footer>
  )
}
