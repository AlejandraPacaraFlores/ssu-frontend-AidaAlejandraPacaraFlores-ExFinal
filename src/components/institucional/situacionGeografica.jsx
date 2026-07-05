import React from 'react';

export default function SituacionGeografica() {
  return (
    <div className="institucional-sub-content">
      <h2 className="institucional-main-title">UBICACIÓN GEOGRÁFICA</h2>
      <p className="institucional-text-center">
        El <strong style={{color: '#071f88'}}>Seguro Social Universitario de Potosí</strong>, se encuentra ubicada en la capital del departamento de <strong>Potosí</strong>; la clínica está ubicada en la calle Calama Nº 107 en la zona central de la ciudad.
      </p>

      {/* Mapa de Google Maps Incrustado de forma segura */}
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.1118126786273!2d-65.75548172400329!3d-19.590400527357416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f94e77b4ba7bf3%3A0x7d6a5c1630ca1701!2sSeguro%20Social%20Universitario!5e0!3m2!1ses!2sbo!4v1710000000000!5m2!1ses!2sbo"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: '4px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación SSU Potosí"
        ></iframe>
      </div>
    </div>
  );
}