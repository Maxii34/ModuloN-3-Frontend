import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminData, setAdminData] = useState(null);

  // Verificar si hay un admin guardado en localStorage al cargar
  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminAuth");
    if (savedAdmin) {
      try {
        const admin = JSON.parse(savedAdmin);
        setIsAdmin(true);
        setAdminData(admin);
      } catch (error) {
        console.error("Error al cargar datos del admin:", error);
        localStorage.removeItem("adminAuth");
      }
    }
  }, []);

  const loginAdmin = (adminInfo) => {
    setIsAdmin(true);
    setAdminData(adminInfo);
    localStorage.setItem("adminAuth", JSON.stringify(adminInfo));
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminData(null);
    localStorage.removeItem("adminAuth");
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        adminData,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
