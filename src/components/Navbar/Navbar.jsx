import './Navbar.css'

import { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context';
import logo from "../../assests/images/logo.ico"


function NavBar() {

    const { user, logoutUser } = useContext(AuthContext)
    return (

        <Navbar className='navBar' sticky="top" expand="sm">
            <Container>
                <Link className='navLink' to="/">
                    <Navbar.Brand href="/" className='nav-link'>
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top mt-1 me-1 "
                            alt="React Bootstrap logo"
                        />
                        TimeShare
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                        <Link className='navLink' to="/servicios">
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
                        <Link to="/usuario/mi-perfil">
                            <Nav.Link as="div">Mi perfil</Nav.Link>
                        </Link>
                        <Nav.Link as="div" className='greeting'>Hola {!user ? 'invitad@' : user.username}</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default NavBar;