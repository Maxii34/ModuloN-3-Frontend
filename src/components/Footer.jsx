import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Columna 1: Logo y descripción */}
          <div className="footer-column footer-logo">
            <div className="footer-logo-container">
              <img 
                src="/foto/logo3.png" 
                alt="Sintax Hotel Logo" 
                className="footer-logo-img"
              />
              <h3 className="footer-logo-text">Sintax Hotel</h3>
            </div>
            <p className="footer-tagline">
              Su refugio de lujo y confort en el corazón de la ciudad.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div className="footer-column">
            <h4 className="footer-title">Navegación</h4>
            <nav className="footer-nav">
              <a href="#quienes-somos" className="footer-link">Quiénes somos</a>
              <a href="#galeria" className="footer-link">Galería</a>
              <a href="#habitaciones" className="footer-link">Habitaciones</a>
              <a href="#contacto" className="footer-link">Contacto</a>
            </nav>
          </div>

          {/* Columna 3: Contacto */}
          <div className="footer-column">
            <h4 className="footer-title">Contacto</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <span className="footer-icon">📍</span>
                <span>Av. Principal 123, Ciudad Capital</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">📞</span>
                <span>+1 (234) 567-890</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">✉️</span>
                <span>reservas@sintaxhotel.com</span>
              </div>
            </div>
          </div>

          {/* Columna 4: Síguenos */}
          <div className="footer-column">
            <h4 className="footer-title">Síguenos</h4>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <span className="footer-social-icon">f</span>
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <span className="footer-social-icon">📷</span>
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <span className="footer-social-icon">🐦</span>
              </a>
            </div>
          </div>
        </div>

        {/* Separador y Copyright */}
        <div className="footer-separator"></div>
        <div className="footer-copyright">
          <p>&copy; 2024 Sintax Hotel. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

