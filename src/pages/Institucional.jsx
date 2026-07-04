import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import DatosGenerales from '../components/institucional/datosGenerales';
import SituacionGeografica from '../components/institucional/situacionGeografica';
import './Institucional.css'; // Archivo de estilos que crearemos abajo

export default function Institucional() {
  // Obtenemos el sub-módulo actual desde la URL (Ej: /institucional/datos-generales)
  const { tab } = useParams();

  // Si entran a la raíz "/institucional", redirigimos por defecto a datos generales
  if (!tab) {
    return <Navigate to="/institucional/datos-generales" replace />;
  }

  return (
    <div className="institucional-page-container">
      <div className="institucional-card-wrapper">
        {/* Renderizado condicional basado en la URL dinámica */}
        {tab === 'datos-generales' && <DatosGenerales />}
        {tab === 'situacion-geografica' && <SituacionGeografica />}
        
        {/* Marcadores de posición temporales para las demás opciones de tu Navbar */}
        {tab === 'plantel-ejecutivo' && <div className="tab-placeholder"><h2>Plantel Ejecutivo</h2></div>}
        {tab === 'estructura-organica' && <div className="tab-placeholder"><h2>Estructura Orgánica</h2></div>}
        {tab === 'directorio' && <div className="tab-placeholder"><h2>Directorio Informativo</h2></div>}
      </div>
    </div>
  );
}