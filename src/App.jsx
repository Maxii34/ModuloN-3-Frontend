
import './index.css'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import AdminHabitaciones from './components/pages/AdminHabitaciones'
import DetalleHabitacion from "./components/pages/detalleHabitacion";
import { BrowserRouter, Routes, Route } from "react-router";
import { Inicio } from "./components/pages/inicio";
import { QuienesSomos } from "./components/pages/QuienesSomos";
import { Galeria } from "./components/pages/Galeria";
import { Habitaciones } from "./Components/pages/Habitaciones";
import { Contacto } from "./components/pages/Contacto";



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/detalle" element={<DetalleHabitacion />} />
            <Route path="/nosotros" element={<QuienesSomos />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/habitaciones" element={<Habitaciones />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin-habitaciones" element={<AdminHabitaciones />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
