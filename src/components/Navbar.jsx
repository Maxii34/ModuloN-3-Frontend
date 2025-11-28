import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo y nombre del hotel */}
        <div className="navbar-brand">
          <svg 
            className="hotel-icon" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 2L2 7V10H4V20H8V14H16V20H20V10H22V7L12 2Z" 
              fill="#1a365d"
            />
          </svg>
          <span className="brand-name">Syntax Hotel</span>
        </div>

        {/* Enlaces de navegación */}
        <div className="navbar-links">
          <a href="#quienes-somos" className="nav-link">Quiénes somos</a>
          <a href="#galeria" className="nav-link">Galería</a>
          <a href="#habitaciones" className="nav-link">Habitaciones</a>
          <a href="#contacto" className="nav-link">Contacto</a>
        </div>

        {/* Botón de reserva */}
        <button className="reserve-button">Reservar Ahora</button>
      </div>
    </nav>
  )
}

export default Navbar

