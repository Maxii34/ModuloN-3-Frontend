
import "./index.css";
import AdminHabitaciones from './components/pages/AdminHabitaciones'
import Footer from "./components/shared/Footer";
import DetalleHabitacion from "./components/pages/DetalleHabitacion";
import { BrowserRouter, Routes, Route } from "react-router";
import { Inicio } from "./Components/pages/inicio";
import { QuienesSomos } from "./Components/pages/QuienesSomos";
import { Galeria } from "./Components/pages/Galeria";
import { Habitaciones } from "./Components/pages/Habitaciones";
import { Contacto } from "./Components/pages/Contacto";
import Menu from "./components/shared/Menu";


function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
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
