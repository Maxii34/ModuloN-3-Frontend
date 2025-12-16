import "./index.css";
import AdminHabitaciones from "./components/pages/AdminHabitaciones";
import Footer from "./components/shared/Footer";
import DetalleHabitacion from "./components/pages/DetalleHabitacion";
import ReservaHabitacion from "./components/pages/ReservaHabitacion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import ProtectedAdminRoute from "./components/auth/ProtectedAdminRoute";
import ProtectedUserRoute from "./components/auth/ProtectedUserRoute";

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
        <AppRouter
          isAdmin={isAdmin}
          logoutAdmin={logoutAdmin}
          loginShow={loginShow}
          registerShow={registerShow}
          showLogin={showLogin}
          loginClose={loginClose}
          registerClose={registerClose}
          showRegister={showRegister}
        />
      </BrowserRouter>
    </>
  );
}

function AppRouter({
  isAdmin,
  logoutAdmin,
  loginShow,
  registerShow,
  showLogin,
  loginClose,
  registerClose,
  showRegister,
}) {
  const location = useLocation();

  // Mostrar navbar admin solo si está autenticado como admin
  const isAdminRoute = location.pathname.startsWith("/admin-");
  const shouldShowAdminNavbar = isAdmin && isAdminRoute;

  return (
    <>
      {shouldShowAdminNavbar ? (
        <>
          <AdminNavbar onLogout={logoutAdmin} />
          <div className="admin-layout">
            <main>
              <Routes>
                <Route
                  path="/admin-dashboard"
                  element={
                    <ProtectedAdminRoute>
                      <AdminHabitaciones />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin-habitaciones"
                  element={
                    <ProtectedAdminRoute>
                      <AdminHabitaciones />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin-usuarios"
                  element={
                    <ProtectedAdminRoute>
                      <AdminUsuarios />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin-reservas"
                  element={
                    <ProtectedAdminRoute>
                      <AdminHabitaciones />
                    </ProtectedAdminRoute>
                  }
                />
                <Route path="/*" element={<Error404 />} />
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

              <Route
                path="/detalle/:id"
                element={
                  <ProtectedUserRoute>
                    <DetalleHabitacion />
                  </ProtectedUserRoute>
                }
              />
              <Route
                path="/reserva/:id"
                element={
                  <ProtectedUserRoute>
                    <ReservaHabitacion />
                  </ProtectedUserRoute>
                }
              />

              <Route path="/nosotros" element={<QuienesSomos />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/habitaciones" element={<Habitaciones />} />
              <Route path="/contacto" element={<Contacto />} />
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
