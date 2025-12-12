import { Link, useNavigate } from "react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../index.css";

const Menu = ({ loginShow, registerShow }) => {
  const navigate = useNavigate();

  const abrirLogin = () => {
    loginShow();
  };
  
  const abrirRegister = () => {
    registerShow();
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="navbar shadow-sm">
        <Container fluid className="navbar-container">
          {/* Logo y nombre del hotel */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="navbar-brand"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src="/foto/logo3.png"
              alt="Sintax Hotel Logo"
              className="hotel-logo"
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            {/* Enlaces de navegación */}
            <Nav className="navbar-links me-auto">
              <Nav.Link as={Link} to="/" className="nav-link">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/galeria" className="nav-link">
                Galería
              </Nav.Link>
              <Nav.Link as={Link} to="/habitaciones" className="nav-link">
                Habitaciones
              </Nav.Link>
              <Nav.Link as={Link} to="/contacto" className="nav-link">
                Contacto
              </Nav.Link>
            </Nav>

            <div className=" d-flex justify-content-center align-content-center ">
              {/* Botón Iniciar Sesión */}
              <button className="reserve-button blob-btn" onClick={abrirLogin}>
                Iniciar Sesión
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
              </button>
              
              {/* Botón Registrarse */}
              <button className="mx-1 reserve-button blob-btn" onClick={abrirRegister}>
                Registrarse
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
              </button>
              
              {/* Botón de reserva */}
              <button 
                className="reserve-button blob-btn"
                onClick={() => navigate('/habitaciones')}
              >
                Reservar Ahora
                <span className="blob-btn__inner">
                  <span className="blob-btn__blobs">
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                    <span className="blob-btn__blob"></span>
                  </span>
                </span>
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* SVG Filter para el efecto gooey */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            ></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default Menu;