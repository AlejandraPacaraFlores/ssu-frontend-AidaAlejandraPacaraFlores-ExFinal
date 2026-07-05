import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [dropdownActivo, setDropdownActivo] = useState(null);

  const abrirDropdown = (indice) => setDropdownActivo(indice);
  const cerrarDropdown = () => setDropdownActivo(null);

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        {/* INICIO */}
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={cerrarDropdown}>
            Inicio
          </NavLink>
        </li>

        {/* INSTITUCIONAL - Corregidos los onClick para cerrar el menú */}
        <li className="dropdown" onMouseEnter={() => abrirDropdown(1)} onMouseLeave={cerrarDropdown}>
          <span className="dropdown-title">Institucional</span>
          <ul className="dropdown-menu">
            <li><NavLink to="/institucional/datos-generales" onClick={cerrarDropdown}>Datos Generales</NavLink></li>
            <li><NavLink to="/institucional/situacion-geografica" onClick={cerrarDropdown}>Situación Geográfica</NavLink></li>
            <li><NavLink to="/institucional/plantel-ejecutivo" onClick={cerrarDropdown}>Plantel Ejecutivo</NavLink></li>
            <li><NavLink to="/institucional/estructura-organica" onClick={cerrarDropdown}>Estructura Orgánica</NavLink></li>
            <li><NavLink to="/institucional/directorio" onClick={cerrarDropdown}>Directorio</NavLink></li>
          </ul>
        </li>

        {/* SERVICIOS */}
        <li className="dropdown" onMouseEnter={() => abrirDropdown(2)} onMouseLeave={cerrarDropdown}>
          <span className="dropdown-title">Servicios</span>
          <ul className="dropdown-menu">
            <li><NavLink to="/servicios/consulta-externa" onClick={cerrarDropdown}>Consulta Externa</NavLink></li>
            <li><NavLink to="/servicios/laboratorio-clinico" onClick={cerrarDropdown}>Laboratorio Clínico</NavLink></li>
            <li><NavLink to="/servicios/imagenologia" onClick={cerrarDropdown}>Imagenología</NavLink></li>
            <li><NavLink to="/servicios/enfermeria" onClick={cerrarDropdown}>Enfermería</NavLink></li>
            <li><NavLink to="/servicios/farmacia" onClick={cerrarDropdown}>Farmacia</NavLink></li>
            <li><NavLink to="/servicios/fisioterapia" onClick={cerrarDropdown}>Fisioterapia</NavLink></li>
            <li><NavLink to="/servicios/ecografia" onClick={cerrarDropdown}>Ecografía</NavLink></li>
            <li><NavLink to="/servicios/internacion" onClick={cerrarDropdown}>Internación Clínica y Quirúrgica</NavLink></li>
            <li><NavLink to="/servicios/afiliaciones" onClick={cerrarDropdown}>Afiliaciones</NavLink></li>
            
            <li onClick={cerrarDropdown}>
              <NavLink to="/servicios/fichaje" style={{ display: "block", width: "100%" }}>
                Fichaje
              </NavLink>
            </li>
          </ul>
        </li>

        {/* PERSONAL DE SALUD */}
        <li className="dropdown" onMouseEnter={() => abrirDropdown(3)} onMouseLeave={cerrarDropdown}>
          <span className="dropdown-title">Personal de Salud</span>
          <ul className="dropdown-menu">
            <li><NavLink to="/personal-salud/administrativo" onClick={cerrarDropdown}>Administrativo</NavLink></li>
            <li><NavLink to="/personal-salud/medico" onClick={cerrarDropdown}>Médico</NavLink></li>
          </ul>
        </li>

        {/* CONTRATACIONES */}
        <li className="dropdown" onMouseEnter={() => abrirDropdown(4)} onMouseLeave={cerrarDropdown}>
          <span className="dropdown-title">Contrataciones</span>
          <ul className="dropdown-menu">
            <li><NavLink to="/contrataciones/menor" onClick={cerrarDropdown}>Menor</NavLink></li>
            <li><NavLink to="/contrataciones/anpe" onClick={cerrarDropdown}>ANPE</NavLink></li>
            <li><NavLink to="/contrataciones/licitacion-publica" onClick={cerrarDropdown}>Licitación Pública</NavLink></li>
            <li><NavLink to="/contrataciones/por-excepcion" onClick={cerrarDropdown}>Por Excepción</NavLink></li>
            <li><NavLink to="/contrataciones/desastres-emergencias" onClick={cerrarDropdown}>Por Desastres y/o Emergencias</NavLink></li>
            <li><NavLink to="/contrataciones/directiva" onClick={cerrarDropdown}>Directa</NavLink></li>
          </ul>
        </li>

        {/* TRANSPARENCIA */}
        <li className="dropdown" onMouseEnter={() => abrirDropdown(5)} onMouseLeave={cerrarDropdown}>
          <span className="dropdown-title">Transparencia</span>
          <ul className="dropdown-menu">
            <li><NavLink to="/transparencia/asesoria-legal" onClick={cerrarDropdown}>Asesoría Legal</NavLink></li>
            <li><NavLink to="/transparencia/historial-avisos" onClick={cerrarDropdown}>Historial de Avisos</NavLink></li>
            <li><NavLink to="/transparencia/recursos-humanos" onClick={cerrarDropdown}>Recursos Humanos</NavLink></li>
            <li><NavLink to="/transparencia/auditoria" onClick={cerrarDropdown}>Auditoría</NavLink></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;