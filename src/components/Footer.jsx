import "./Footer.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInfoCircle, FaHospital } from "react-icons/fa";

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Columna Izquierda: Acerca de Nosotros */}
        <div className="footer-column">
          <h3>ACERCA DE NOSOTROS</h3>
          <ul className="footer-info-list">
            <li>
              <FaMapMarkerAlt className="footer-icon" />
              <span>Dirección: Calama Nº. 107</span>
            </li>
            <li>
              <FaPhoneAlt className="footer-icon" />
              <span>Teléfono: +591-2-6223227</span>
            </li>
            <li>
              <FaInfoCircle className="footer-icon" />
              <span>Informaciones - Fichaje: +591-2-6223597</span>
            </li>
            <li>
              <FaHospital className="footer-icon" />
              <span>Emergencias - Clínica: +591-2-6224161</span>
            </li>
            <li>
              <FaEnvelope className="footer-icon" />
              <span className="email-text">segurosocialuniversitario@ssupotosi.com.bo</span>
            </li>
          </ul>
        </div>

        {/* Columna Derecha: Servicios */}
        <div className="footer-column">
          <h3>SERVICIOS</h3>
          <div className="services-grid">
            <ul>
              <li>Consulta Externa</li>
              <li>Laboratorio Clínico</li>
              <li>Imagenología</li>
              <li>Enfermería</li>
              <li>Farmacia</li>
            </ul>
            <ul>
              <li>Fisioterapia</li>
              <li>Ecografía</li>
              <li className="highlighted-service">Internación Clínica y Quirúrgica</li>
              <li>Afiliaciones</li>
              <li className="bold-service">Fichaje En Línea</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Barra Inferior de Copyright */}
      <div className="footer-bottom">
        <p>Copyright ©{anioActual} Todos los derechos reservados - Seguro Social Universitario Potosí</p>
        <p className="sub-caption">🏛 S.S.U.P.</p>
        <p className="developer-credits">Desarrollado por Ing. Hernán Flores Ramírez.</p>
      </div>
    </footer>
  );
}

export default Footer;