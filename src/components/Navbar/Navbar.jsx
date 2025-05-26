import "./Navbar.css";

import { useContext, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded((prev) => !prev);
  const closeMenu = () => setExpanded(false);
  return (
    <Navbar className="navBar" sticky="top" expand="sm" expanded={expanded}>
      <Container>
        <Link to="/">
          <Navbar.Brand className="nav-link" onClick={closeMenu}>
            <span className="nameNav">TIMESHARE</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={handleToggle}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="navLink" to="/servicios" onClick={closeMenu}>
              <Nav.Link as="div">Servicios</Nav.Link>
            </Link>

            {user ? (
              <>
                {" "}
                <Link to="/usuario/mi-perfil" onClick={closeMenu}>
                  <Nav.Link as="div">Mi perfil</Nav.Link>
                </Link>
                <Link onClick={logoutUser}>
                  <Nav.Link as="div" onClick={logoutUser}>
                    {" "}
                    Cerrar sesión
                  </Nav.Link>
                </Link>
              </>
            ) : (
              <>
                <Link to="/usuario/registro" onClick={closeMenu}>
                  <Nav.Link as="div">Registro</Nav.Link>
                </Link>

                <Link to="/usuario/iniciar-sesion" onClick={closeMenu}>
                  <Nav.Link as="div">Acceder</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
