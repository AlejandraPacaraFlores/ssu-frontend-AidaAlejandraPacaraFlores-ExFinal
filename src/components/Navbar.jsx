import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // Función auxiliar para mantener limpio el código de las clases activas
  const obtenerClaseNav = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" end className={obtenerClaseNav}>
          Inicio
        </NavLink>

        <NavLink to="/institucional" className={obtenerClaseNav}>
          Institucional
        </NavLink>

        <NavLink to="/servicios" className={obtenerClaseNav}>
          Servicios
        </NavLink>

        <NavLink to="/personal-salud" className={obtenerClaseNav}>
          Personal de Salud
        </NavLink>

        <NavLink to="/contrataciones" className={obtenerClaseNav}>
          Contrataciones
        </NavLink>

        <NavLink to="/transparencia" className={obtenerClaseNav}>
          Transparencia
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;