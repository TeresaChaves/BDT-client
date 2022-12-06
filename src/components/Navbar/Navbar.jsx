import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Navbar.Brand href="#home">Banco de Tiempo</Navbar.Brand>
                        <Nav className="me-auto">
                            <Link to="/">
                                <Navbar.Brand as="div">Home</Navbar.Brand>
                            </Link>
                            <Link to="/servicios">
                                <Nav.Link as="div">Servicios</Nav.Link>
                            </Link>
                            <Link to="/servicios/nuevo-servicio">
                                <Nav.Link as="div">Crear Servicio</Nav.Link>
                            </Link>
                            <NavDropdown title="Mi perfil" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/usuario/mi-perfil">Mi perfil</NavDropdown.Item>
                                <NavDropdown.Item href="/usuario/cerrar-sesion">Cerrar Sesión</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/usuario/iniciar-sesion">
                                    Iniciar Sesión
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/usuario/registro">
                                    Registrarse
                                </NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default NavBar;