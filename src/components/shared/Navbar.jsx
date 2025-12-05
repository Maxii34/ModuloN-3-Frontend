import { Link, useNavigate } from 'react-router';
import '../../index.css'


function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo y nombre del hotel */}
        <Link 
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img 
            src="/foto/logo3.png" 
            alt="Sintax Hotel Logo" 
            className="hotel-logo"
          />
        </Link>

        {/* Enlaces de navegación */}
        <div className="navbar-links">
          <Link to="/nosotros" className="nav-link">Quiénes somos</Link>
          <Link to="/galeria" className="nav-link">Galería</Link>
          <Link to="/habitaciones" className="nav-link">Habitaciones</Link>
          <Link to="/contacto" className="nav-link">Contacto</Link>
        </div>

        {/* Botón de reserva */}
        <button className="reserve-button blob-btn">
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
      
      {/* SVG Filter para el efecto gooey */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </nav>
  )
}

export default Navbar

