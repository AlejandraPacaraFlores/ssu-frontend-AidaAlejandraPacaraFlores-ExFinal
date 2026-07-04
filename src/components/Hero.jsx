import { useState } from "react";
import { Link } from "react-router-dom"; 
import "./Hero.css";
import { FaSpinner, FaFacebook, FaYoutube, FaBell } from "react-icons/fa";

import logoSSU from "../assets/logo.png";
import escudo from "../assets/escudo.png";
import convocatoria from "../assets/convocatorias.jpg";

function Hero() {
  const [mostrarRedes, setMostrarRedes] = useState(false);

  return (
    <section className="hero">
      {/* Lado izquierdo: Logo principal */}
      <div className="hero-left">
        <img src={logoSSU} alt="Logo SSU" className="hero-logo" />
      </div>

      {/* Centro: Título Institucional */}
      <div className="hero-center">
        <h1>
          SEGURO SOCIAL
          <br />
          UNIVERSITARIO POTOSÍ
        </h1>
      </div>

      {/* Lado derecho: Escudo y enlaces */}
      <div className="hero-right">
        <img src={escudo} className="hero-escudo" alt="Escudo de Bolivia" />

        {/* Bloque Convocatorias - ¡MODIFICADO CON target="_blank"! */}
        <Link 
          to="/convocatorias" 
          className="hero-convocatoria"
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img src={convocatoria} alt="Icono Convocatorias" />
          <span>CONVOCATORIAS</span>
        </Link>

        {/* Bloque Reservas Animado - ¡MODIFICADO CON target="_blank"! */}
        <div className="hero-animado-container">
          <FaSpinner className="spinner-icon" />
          <Link 
            to="/servicios/fichaje" 
            className="hero-reserva-link"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Reservas
          </Link>
        </div>

        {/* Bloque Síguenos */}
        <div className="redes-wrapper">
          <button 
            className="btn-siguenos" 
            onClick={() => setMostrarRedes(!mostrarRedes)}
          >
            <FaBell /> Síguenos
          </button>

          {mostrarRedes && (
            <div className="redes-en-serie">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="red-link fb"
              >
                <FaFacebook /> Facebook
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="red-link yt"
              >
                <FaYoutube /> YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;