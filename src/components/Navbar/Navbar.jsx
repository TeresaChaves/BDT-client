import { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context';


function NavBar() {

    const { user, logoutUser } = useContext(AuthContext)

    return (

        <Navbar bg="success" variant="dark" sticky="top" expand="sm">
            <Container>
                <Link to="/">
                    <Navbar.Brand>Banco de Tiempo</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link as="div">¡Hola {!user ? 'invitad@' : user.username}!</Nav.Link>
                        <Link to="/servicios">
                            <Nav.Link as="div">Servicios</Nav.Link>
                        </Link>

                        {user ?
                            <>
                                <Link to="/usuario/mi-perfil">
                                    <Nav.Link as="div">Mi perfil</Nav.Link>
                                </Link>

                                <Link onClick={logoutUser}>
                                    <Nav.Link as="div">Cerrar sesión</Nav.Link>
                                </Link>

                            </>
                            :
                            <>
                                <Link to="/usuario/registro">
                                    <Nav.Link as="div">Nuevo Usuario</Nav.Link>
                                </Link>

                                <Link to="/usuario/iniciar-sesion">
                                    <Nav.Link as="div">Acceder</Nav.Link>
                                </Link>

                            </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


    );
}

export default NavBar;