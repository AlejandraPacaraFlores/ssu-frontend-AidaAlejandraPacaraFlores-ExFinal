import { useState, useEffect } from "react";
import "./Convocatorias.css";

export default function Convocatorias() {
  // Estados para listar las convocatorias
  const [convocatorias, setConvocatorias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para el formulario de registro (llenado de datos)
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha: new Date().toISOString().split("T")[0], // Fecha actual por defecto
    archivo: "", // Aquí se guardará directamente el enlace URL de texto real
    estado: 1 // 1 = Activo / Vigente
  });

  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  // 1. Cargar las convocatorias desde el Backend
  const cargarConvocatorias = () => {
    fetch("https://ssu-backend-aidaalejandrapacaraflores.onrender.com/api/convocatorias")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los datos");
        return res.json();
      })
      .then((data) => {
        setConvocatorias(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error en GET /api/convocatorias:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarConvocatorias();
  }, []);

  // 2. Manejar cambios en los inputs de texto, fecha, select y enlace
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "estado" ? parseInt(value) : value
    });
  };

  // LÓGICA DE APERTURA DE ENLACES
  const handleVerDocumento = (e, archivoString, titulo) => {
    e.preventDefault(); 
    if (!archivoString) return;

    // Abre cualquier enlace HTTP/HTTPS real en una pestaña nueva de forma segura
    const urlCompleta = archivoString.startsWith("http") ? archivoString : `https://${archivoString}`;
    window.open(urlCompleta, "_blank", "noopener,noreferrer");
  };

  // 3. Enviar los datos mediante POST a tu API
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.fecha) {
      setMensaje({ texto: "El título y la fecha son campos obligatorios.", tipo: "error" });
      return;
    }

    fetch("https://ssu-backend-aidaalejandrapacaraflores.onrender.com/api/convocatorias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en el servidor al guardar");
        return res.json();
      })
      .then((data) => {
        setMensaje({ texto: "¡Convocatoria registrada exitosamente!", tipo: "exito" });
        
        // Limpiar formulario restableciendo valores nativos
        setFormData({
          titulo: "",
          descripcion: "",
          fecha: new Date().toISOString().split("T")[0],
          archivo: "",
          estado: 1
        });

        cargarConvocatorias();
      })
      .catch((err) => {
        console.error("Error en POST /api/convocatorias:", err);
        setMensaje({ texto: "Hubo un problema al registrar la convocatoria.", tipo: "error" });
      });
  };

  return (
    <div className="convocatorias-page-container">
      
      <div className="convocatorias-header">
        <h1>CONVOCATORIAS - 2026</h1>
        <div className="linea-decorativa"></div>
      </div>

      <div className="convocatorias-grid-layout">
        
        {/* COLUMNA IZQUIERDA: Formulario */}
        <section className="form-convocatoria-section">
          <div className="panel-title">
            <h3>📝 Registrar Nueva Convocatoria</h3>
          </div>
          
          {mensaje.texto && (
            <div className={`alert-message ${mensaje.tipo}`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-ssu">
            <div className="form-group">
              <label>Título de la Convocatoria *</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                placeholder="Ej. Convocatoria de Méritos para Médicos Generales"
                required
              />
            </div>

            <div className="form-group">
              <label>Descripción / Requisitos detallados</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Escribe el cuerpo, bases o requisitos de la convocatoria aquí..."
                rows="5"
              />
            </div>

            <div className="form-row-2col">
              <div className="form-group">
                <label>Fecha de Publicación *</label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Enlace URL del Documento (PDF)</label>
                <input
                  type="text"
                  name="archivo"
                  value={formData.archivo}
                  onChange={handleInputChange}
                  placeholder="Ej. https://drive.google.com/... o enlace de Dropbox"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Estado del Proceso</label>
              <select name="estado" value={formData.estado} onChange={handleInputChange}>
                <option value={1}>Vigente / Activo</option>
                <option value={0}>Concluido / Inactivo</option>
              </select>
            </div>

            <button type="submit" className="btn-ssu-submit">
              Publicar Convocatoria
            </button>
          </form>
        </section>

        {/* COLUMNA DERECHA: Listado */}
        <section className="list-convocatoria-section">
          <div className="panel-title azul-ssu">
            <h3>📋 Convocatorias Publicadas</h3>
          </div>

          {loading ? (
            <p className="loading-convocatorias">Conectando con la API del backend...</p>
          ) : convocatorias.length === 0 ? (
            <div className="no-data-box">
              <p>No se encontraron convocatorias cargadas en el sistema actualmente.</p>
            </div>
          ) : (
            <div className="convocatorias-lista-scroll">
              {convocatorias.map((conv) => (
                <div key={conv.id} className={`convocatoria-card-item ${conv.estado === 0 ? "concluida" : ""}`}>
                  <div className="card-badge">
                    {conv.estado === 1 ? (
                      <span className="badge-activo">Vigente</span>
                    ) : (
                      <span className="badge-inactivo">Concluido</span>
                    )}
                  </div>
                  
                  <h4>{conv.titulo}</h4>
                  <p className="desc-text">{conv.descripcion || "Sin descripción proporcionada."}</p>
                  
                  <div className="card-footer-info">
                    <span className="fecha-badge">📅 Publicado el: {conv.fecha}</span>
                    {conv.archivo && (
                      <a 
                        href="#documento"
                        onClick={(e) => handleVerDocumento(e, conv.archivo, conv.titulo)}
                        className="download-link-btn"
                      >
                        📂 Ver Documento PDF
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}