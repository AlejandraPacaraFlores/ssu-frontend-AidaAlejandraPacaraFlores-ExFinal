import "./Header.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

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

      </div>

    </header>
  );
}

export default Header;