import { useState } from "react";
import "./Hero.css";
import { FaSpinner, FaFacebook, FaYoutube, FaBell } from "react-icons/fa";

import logoSSU from "../assets/logo.png";
import escudo from "../assets/escudo.png";
import convocatoria from "../assets/convocatorias.jpg";

function Hero() {
  const [mostrarRedes, setMostrarRedes] = useState(false);

  return (
    <section className="hero">
      <div className="hero-left">
        <img src={logoSSU} alt="Logo SSU" className="hero-logo" />
      </div>

      <div className="hero-center">
        <h1>
          SEGURO SOCIAL
          <br />
          UNIVERSITARIO POTOSÍ
        </h1>
      </div>

      <div className="hero-right">
        <img src={escudo} className="hero-escudo" alt="Escudo de Bolivia" />

        {/* Convocatorias - Abre en pestaña nueva */}
        <a
          href="https://ssupotosi.com.bo/convocatorias"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-convocatoria"
        >
          <img src={convocatoria} alt="Icono Convocatorias" />
          <span>CONVOCATORIAS</span>
        </a>

        {/* Bloque Reservas Animado */}
        <div className="hero-animado-container">
          <FaSpinner className="spinner-icon" />
          <a href="#reservas" className="hero-reserva-link">
            Reservas
          </a>
        </div>

        {/* Bloque Síguenos Animado con Menú en Serie */}
        <div className="hero-animado-container redes-wrapper">
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