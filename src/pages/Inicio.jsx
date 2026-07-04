import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Inicio.css";

export default function Inicio() {
  const navigate = useNavigate();
  
  // Estados para la API del backend
  const [servicios, setServicios] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [loadingServicios, setLoadingServicios] = useState(true);
  const [loadingNoticias, setLoadingNoticias] = useState(true);

  useEffect(() => {
    // Cargar Servicios desde Swagger / API
    fetch("http://localhost:8080/api/servicios")
      .then((res) => res.json())
      .then((data) => {
        setServicios(data);
        setLoadingServicios(false);
      })
      .catch((err) => {
        console.error("Error en /api/servicios:", err);
        setLoadingServicios(false);
      });

    // Cargar Noticias desde Swagger / API
    fetch("http://localhost:8080/api/noticias")
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data);
        setLoadingNoticias(false);
      })
      .catch((err) => {
        console.error("Error en /api/noticias:", err);
        setLoadingNoticias(false);
      });
  }, []);

  // Lista extendida de accesos rápidos institucionales
  const accesosRapidos = [
    { id: 1, titulo: "RESERVA DE ATENCIÓN", desc: "Solicita tu ficha médica aquí", action: () => navigate("/servicios/fichaje"), clase: "b-red" },
    { id: 2, titulo: "CUESTIONARIO COVID - 19", desc: "Formularios de control", clase: "b-blue" },
    { id: 3, titulo: "SOLVENCIAS AFILIACIONES", desc: "Trámites internos", clase: "b-dark" },
    { id: 4, titulo: "MANUAL ATENCIÓN EN LÍNEA", desc: "Descarga de guías PDF", clase: "b-red" },
    { id: 5, titulo: "CERTIFICACIÓN EN LÍNEA", desc: "Manual de certificaciones institucionales", clase: "b-blue" },
    { id: 6, titulo: "MANUAL RESERVAS DE FICHAS", desc: "Guía paso a paso para fichaje en línea", clase: "b-dark" },
    { id: 7, titulo: "INGRESO FICHAJE EN LÍNEA", desc: "Acceso directo al portal de turnos", clase: "b-red" },
    { id: 8, titulo: "CERTIFICADO AFILIACIÓN", desc: "Estados de afiliación y no afiliación SSU", clase: "b-blue" }
  ];

  // Duplicamos las listas para lograr el efecto de scroll infinito continuo hacia la izquierda
  const bunderAccesos = [...accesosRapidos, ...accesosRapidos];

  return (
    <div className="inicio-container">
      
      {/* SECCIÓN 1: Novedades con Carrusel Automático Infinito (Muestra 4 visibles) */}
      <section className="novedades-section">
        <h2>ÚLTIMAS NOVEDADES Y CONSULTAS EXTERNAS</h2>
        <p className="subtitle">
          Estimado usuario, le comunicamos que los enlaces para los diferentes servicios se encuentran <span className="highlight-red">A CONTINUACIÓN</span>
        </p>

        <div className="carousel-wrapper">
          <div className="carousel-track track-accesos">
            {bunderAccesos.map((item, idx) => (
              <div 
                key={`acc-${idx}`} 
                className={`banner-card ${item.clase}`} 
                onClick={item.action || null}
              >
                <h3>{item.titulo}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: Noticias e Informes (Solo imágenes/tarjetas dinámicas con carrusel) */}
      <section className="noticias-dinamicas-section">
        <h2 className="section-title-line">Noticias e Informes Institucionales</h2>
        {loadingNoticias ? (
          <p className="loading-text">Cargando noticias desde el servidor...</p>
        ) : noticias.length === 0 ? (
          <div className="empty-api-notice">
            <p>No hay noticias registradas. Agrega elementos con imágenes simuladas usando <strong>POST /api/noticias</strong> en Swagger.</p>
          </div>
        ) : (
          <div className="carousel-wrapper">
            <div className="carousel-track track-noticias" style={{ "--items-count": noticias.length }}>
              {[...noticias, ...noticias].map((noticia, idx) => (
                <div key={`not-${idx}`} className="noticia-card-api">
                  
                  {/* MODIFICACIÓN AQUÍ: Renderiza la imagen real si existe */}
                  {noticia.imagen ? (
                    <img 
                      src={noticia.imagen} 
                      alt={noticia.titulo} 
                      className="noticia-img-renderizada"
                      onError={(e) => {
                        // Respaldo por si el enlace de la imagen falla o se cae
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Marcador de posición por si no hay imagen o el enlace falla */}
                  <div className="noticia-img-placeholder" style={{ display: noticia.imagen ? 'none' : 'flex' }}>📰</div>

                  <div className="noticia-body">
                    <div className="noticia-tag">Novedad</div>
                    <h3>{noticia.titulo || "Sin Título"}</h3>
                    <p>{noticia.descripcion || "Sin descripción."}</p>
                    <span className="noticia-fecha">📅 {noticia.fecha || "Reciente"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SECCIÓN 3: Autoridades Institucionales con Carrusel */}
      <section className="medicos-section">
        <div className="autoridades-barra-roja">
          <strong>AUTORIDADES INSTITUCIONALES</strong>
          <p>Conozca a nuestras autoridades ingresando al módulo correspondiente</p>
        </div>
        
        <div className="carousel-wrapper">
          <div className="carousel-track track-autoridades">
            {/* Lista duplicada para loop infinito */}
            {[1, 2, 3, 4, 1, 2, 3, 4].map((item, idx) => (
              <div key={`med-${idx}`} className="medico-card border-blue">
                <div className="medico-avatar-placeholder">👨‍⚕️</div>
                <h4>{idx % 4 === 0 ? "OSCAR LA FUENTE" : idx % 4 === 1 ? "JERSON ARANCIBIA" : idx % 4 === 2 ? "ELENA BRAVO" : "GRINEZ ROCIO"}</h4>
                <p>{idx % 4 === 0 ? "MÉDICO GENERAL" : idx % 4 === 1 ? "GESTOR DE CALIDAD" : idx % 4 === 2 ? "MÉDICO GENERAL EST." : "MÉDICO CENTINELA"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: Especialidades Disponibles (Estructura Rectangular Corregida) */}
      <section className="servicios-dinamicos-section">
        <h2 className="section-title-line">Nuestras Especialidades Disponibles</h2>
        {loadingServicios ? (
          <p className="loading-text">Cargando especialidades...</p>
        ) : servicios.length === 0 ? (
          <div className="empty-api-notice">
            <p>No hay servicios clínicos registrados. Agrega especialidades desde <strong>POST /api/servicios</strong> en Swagger.</p>
          </div>
        ) : (
          <div className="carousel-wrapper">
            <div className="carousel-track track-servicios">
              {[...servicios, ...servicios].map((servicio, idx) => (
                <div key={`ser-${idx}`} className="servicio-item-api">
                  
                  {/* La imagen va arriba ocupando todo el ancho de la tarjeta */}
                  {servicio.imagen ? (
                    <img 
                      src={servicio.imagen} 
                      alt={servicio.nombre} 
                      className="servicio-img-renderizada" 
                    />
                  ) : (
                    <div className="servicio-icon">🩺</div>
                  )}

                  {/* Los detalles se renderizan abajo con acolchado interno */}
                  <div className="servicio-detalles">
                    <h4>{servicio.nombre}</h4>
                    <p>{servicio.descripcion}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  );
}