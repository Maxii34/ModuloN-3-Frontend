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
import AdminNavbar from "./components/shared/AdminNavbar";
import { ModalLogin } from "./components/ui/ModalLogin";
import { ModalRegister } from "./components/ui/ModalRegister";
import { useState } from "react";
import Error404 from "./components/pages/Error404";
import AdminUsuarios from "./components/pages/AdminUsuarios";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppContent() {
  const [showLogin, setShowLogin] = useState(false);
  const loginClose = () => setShowLogin(false);
  const loginShow = () => setShowLogin(true);

  const [showRegister, setShowRegister] = useState(false);
  const registerClose = () => setShowRegister(false);
  const registerShow = () => setShowRegister(true);

  const { isAdmin, logoutAdmin } = useAuth();

  return (
    <>
      <BrowserRouter>
        {isAdmin ? (
          <>
            <AdminNavbar onLogout={logoutAdmin} />
            <div className="admin-layout">
              <main>
                <Routes>
                  <Route path="/admin-dashboard" element={<AdminHabitaciones />} />
                  <Route path="/admin-habitaciones" element={<AdminHabitaciones />} />
                  <Route path="/admin-usuarios" element={<AdminUsuarios />} />
                  <Route path="/admin-reservas" element={<AdminHabitaciones />} />
                  <Route path="/*" element={<AdminHabitaciones />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <>
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
                <Route path="/admin-usuarios" element={<AdminUsuarios />} />
                <Route path="/*" element={<Error404 />} />
              </Routes>
            </main>
            <Footer />
          </>
        )}
        <ModalLogin 
        showLogin={showLogin}
        loginClose={loginClose}
        registerShow={registerShow}
        />
        <ModalRegister 
        showRegister={showRegister}
        registerClose={registerClose}
        loginShow={loginShow}
        />
      </BrowserRouter>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
