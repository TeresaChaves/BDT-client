import { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import './Navbar.css'


function NavBar() {

    const { user, logoutUser } = useContext(AuthContext)
    return (
        <>
            <Navbar className='color-nav' variant="dark">
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

                            {user ?
                                <>
                                    <Nav.Link as="div" onClick={logoutUser}>Cerrar sesión</Nav.Link>

                                </>
                                :
                                <>
                                    <Link to="/usuario/registro">
                                        <Nav.Link as="div">Registro</Nav.Link>
                                    </Link>

                                    <Link to="/usuario/iniciar-sesion">
                                        <Nav.Link as="div">Acceder</Nav.Link>
                                    </Link>

                                </>
                            }
                            <Nav.Link as="div">¡Hola, {!user ? 'invitad@' : user.username}!</Nav.Link>

                            <Link to="/usuario/mi-perfil">
                                <Nav.Link as="div">MI perfil</Nav.Link>
                            </Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}

export default NavBar;