import "./Header.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom"; // Importamos Link para la navegación

function Header() {
  return (
    <header className="header">

      {/* Barra Superior */}
      <div className="top-bar">

        <div className="top-item">
          <FaPhoneAlt />
          <span>Emergencias +591-2-6224161</span>
        </div>

        <div className="top-item">
          <FaEnvelope />
          <span>segurosocialuniversitario@ssupotosi.com.bo</span>
        </div>

        <div className="top-item">
          <FaMapMarkerAlt />
          <span>Calle Calama Nº 107</span>
        </div>

        {/* BOTÓN DE RESERVAS / FICHAJE */}
        <div className="top-item header-reservas">
          <Link to="/servicios/fichaje" className="btn-fichaje">
            <FaCalendarCheck style={{ marginRight: '5px' }} />
            <span>Reservas / Fichaje</span>
          </Link>
        </div>

      </div>

    </header>
  );
}

export default Header;