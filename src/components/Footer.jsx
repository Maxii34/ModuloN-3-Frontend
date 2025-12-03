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
        </div>
      </div>
    </footer>
  )
}

export default Footer

