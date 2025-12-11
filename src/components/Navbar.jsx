import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo y nombre del hotel */}
        <a 
          href="#" 
          className="navbar-brand"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            closeMenu();
          }}
        >
          <img 
            src="/foto/logo3.png" 
            alt="Sintax Hotel Logo" 
            className="hotel-logo"
          />
        </a>

        {/* Botón hamburguesa para móviles */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Enlaces de navegación */}
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#quienes-somos" className="nav-link" onClick={closeMenu}>Quiénes somos</a>
          <a href="#galeria" className="nav-link" onClick={closeMenu}>Galería</a>
          <a href="#habitaciones" className="nav-link" onClick={closeMenu}>Habitaciones</a>
          <a href="#contacto" className="nav-link" onClick={closeMenu}>Contacto</a>
          
          {/* Botón de reserva en móvil */}
          <button className="reserve-button blob-btn mobile" onClick={closeMenu}>
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

        {/* Botón de reserva en desktop */}
        <button className="reserve-button blob-btn desktop" onClick={closeMenu}>
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

