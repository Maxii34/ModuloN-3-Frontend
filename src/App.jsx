import "./index.css";
import AdminHabitaciones from "./components/pages/AdminHabitaciones";
import Footer from "./components/shared/Footer";
import DetalleHabitacion from "./components/pages/DetalleHabitacion";
import { BrowserRouter, Routes, Route } from "react-router";
import { Inicio } from "./components/pages/Inicio";
import { QuienesSomos } from "./components/pages/QuienesSomos";
import { Galeria } from "./components/pages/Galeria";
import Habitaciones from "./components/pages/Habitaciones";
import { Contacto } from "./components/pages/Contacto";
import Menu from "./components/shared/Menu";
import { ModalLogin } from "./components/ui/ModalLogin";
import { ModalRegister } from "./components/ui/ModalRegister";
import { useState } from "react";
import Error404 from "./components/pages/Error404";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const loginClose = () => setShowLogin(false);
  const loginShow = () => setShowLogin(true);

  const [showRegister, setShowRegister] = useState(false);
  const registerClose = () => setShowRegister(false);
  const registerShow = () => setShowRegister(true);

  return (
    <>
      <BrowserRouter>
        <Menu loginShow={loginShow} registerShow={registerShow} />
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/detalle" element={<DetalleHabitacion />} />
            <Route path="/nosotros" element={<QuienesSomos />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/habitaciones" element={<Habitaciones />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin-habitaciones" element={<AdminHabitaciones />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
        <ModalLogin showLogin={showLogin} loginClose={loginClose} />
        <ModalRegister
          showRegister={showRegister}
          registerClose={registerClose}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
