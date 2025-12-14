import { Link, useLocation, useNavigate } from "react-router";
import "./AdminNavbar.css";
import { 
  FaTh, 
  FaBed, 
  FaUsers, 
  FaCalendarAlt,
  FaSignOutAlt,
  FaShoppingBag
} from "react-icons/fa";

const AdminNavbar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/admin-dashboard", label: "Dashboard", icon: FaTh },
    { path: "/admin-habitaciones", label: "Habitaciones", icon: FaBed },
    { path: "/admin-usuarios", label: "Usuarios", icon: FaUsers },
    { path: "/admin-reservas", label: "Reservas", icon: FaCalendarAlt },
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-header">
        <div className="admin-navbar-logo">
          <FaShoppingBag className="logo-icon" />
        </div>
        <h1 className="admin-navbar-title">Sintax Hotel</h1>
        <p className="admin-navbar-subtitle">Admin Panel</p>
      </div>

      <div className="admin-navbar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-navbar-item ${isActive ? "active" : ""}`}
            >
              <Icon className="admin-navbar-icon" />
              <span className="admin-navbar-label">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="admin-navbar-footer">
        <button 
          className="admin-navbar-item admin-navbar-logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="admin-navbar-icon" />
          <span className="admin-navbar-label">Cerrar Sesión</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
