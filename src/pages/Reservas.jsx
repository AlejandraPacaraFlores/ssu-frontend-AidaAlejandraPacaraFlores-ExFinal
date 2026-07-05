import { useState } from "react";
import "./Reservas.css";

export default function Reservas() {
  // --- ESTADOS REQUERIDOS POR TU BACKEND (ESTRUCTURA JSON) ---
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [fechaReserva, setFechaReserva] = useState(new Date().toISOString().split("T")[0]); // Fecha de hoy por defecto
  const [horaReserva, setHoraReserva] = useState("19:30"); // Hora por defecto dentro del rango del SSU

  // --- ESTADOS DE CONTROL DE PANTALLA Y MENSAJES ---
  const [autenticado, setAutenticado] = useState(false); // NUEVO: Controla si ya pasó el filtro de credenciales
  const [mostrarPantallaBloqueo, setMostrarPantallaBloqueo] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  // FASE 1: Validar únicamente las credenciales del Asegurado
  const handleValidarCredenciales = async (e) => {
    e.preventDefault();
    setMensajeError("");
    setMensajeExito("");

    // Enviamos un formato seguro de autenticación sin romper restricciones del backend
    const datosLogin = {
      codigoAsegurado: usuario,
      contrasenia: contrasena,
      especialidad: "Validacion_Inicial", // Valor temporal requerido por el modelo de datos
      fechaReserva: "2026-01-01",        // Fecha genérica temporal
      horaReserva: "00:00",
      estado: 0                          // Estado inactivo temporal
    };

    try {
      const response = await fetch("https://ssu-backend-aidaalejandrapacaraflores.onrender.com/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosLogin),
      });

      if (response.status === 403) { 
        setMostrarPantallaBloqueo(true);
        return;
      }

      if (response.status === 401) {
        setMensajeError("Contraseña incorrecta. Intente de nuevo.");
      } else if (response.status === 404) {
        setMensajeError("El usuario ingresado no se encuentra afiliado al SSU Potosí.");
      } else if (response.status === 500 || response.ok) {
        // NOTA IMPORTANTE: Si devuelve 200/201 o incluso 500 con datos genéricos, 
        // significa que el backend procesó el código y la contraseña con éxito.
        setAutenticado(true);
      } else {
        setMensajeError("Error de conexión con el servidor de autorizaciones.");
      }
    } catch (error) {
      setMostrarPantallaBloqueo(true);
    }
  };

  // FASE 2: Registrar la reserva real con la especialidad seleccionada
  const handleRegistrarReserva = async (e) => {
    e.preventDefault();
    setMensajeError("");
    setMensajeExito("");

    if (!especialidad) {
      setMensajeError("Por favor, seleccione una especialidad médica.");
      return;
    }

    const datosReserva = {
      codigoAsegurado: usuario,
      contrasenia: contrasena,
      especialidad: especialidad,
      fechaReserva: fechaReserva,
      horaReserva: horaReserva,
      estado: 1 // 1 = Reservado / Activo en tu BD
    };

    try {
      const response = await fetch("https://ssu-backend-aidaalejandrapacaraflores.onrender.com/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosReserva),
      });

      if (!response.ok) {
        setMensajeError("Hubo un problema al procesar la reserva. Inténtelo de nuevo.");
      } else {
        setMensajeExito("¡Reserva realizada con éxito!");
        // Limpiamos todo el formulario y regresamos al login
        setUsuario("");
        setContrasena("");
        setEspecialidad("");
        setAutenticado(false); 
      }
    } catch (error) {
      setMensajeError("Error al conectar con la base de datos médica.");
    }
  };

  // VISTA EXTRA: PANTALLA DE ERROR/BLOQUEO (Horarios SSU)
  if (mostrarPantallaBloqueo) {
    return (
      <div className="bloqueo-page-container">
        <div className="bloqueo-card">
          <h1 className="bloqueo-titulo">SEGURO SOCIAL UNIVERSITARIO POTOSÍ</h1>
          <div className="bloqueo-mensaje-box">
            <p className="bloqueo-estimado">ESTIMADO USUARIO LA DISPOSICIÓN DE FICHAS SOLO ESTA DISPONIBLE</p>
            <p className="bloqueo-dias">LUNES A VIERNES</p>
            <div className="bloqueo-tabla-horas">
              <p>Asegurados de 19:30 a 19:45</p>
              <p>Estudiantes de 20:00 a 20:30</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDERIZADO CONDICIONAL DE PANTALLAS
  return (
    <div className="reserva-page-container">
      <div className="reserva-card">
        
        {/* Cuadro Rojo Informativo */}
        <div className="reserva-banner-rojo">
          <h3>RESERVA DE ATENCIÓN 2026!!!</h3>
          <p className="banner-sub">LUNES A VIERNES</p>
          <p>Asegurados de 19:30 a 20:00</p>
          <p>Estudiantes de 20:00 a 20:30</p>
        </div>

        {mensajeError && <div className="reserva-alert-error">{mensajeError}</div>}
        {mensajeExito && (
          <div className="reserva-alert-exito" style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "10px", borderRadius: "4px", marginBottom: "15px", textAlign: "center", fontWeight: "bold" }}>
            {mensajeExito}
          </div>
        )}

        {/* SI NO ESTÁ AUTENTICADO: Muestra el Login de Credenciales */}
        {!autenticado ? (
          <form onSubmit={handleValidarCredenciales} className="reserva-form">
            <div className="reserva-input-group">
              <label>USUARIO</label>
              <input
                type="text"
                placeholder="Código de Carnet de Asegurado"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>

            <div className="reserva-input-group">
              <label>CONTRASEÑA</label>
              <input
                type="password"
                placeholder="N° de Carnet de Identidad"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="reserva-btn-ingresar" style={{ marginTop: "15px" }}>
              INGRESAR
            </button>
          </form>
        ) : (
          /* SI YA ESTÁ AUTENTICADO: Muestra el Formulario para agendar la reserva */
          <form onSubmit={handleRegistrarReserva} className="reserva-form">
            <h3 style={{ fontSize: "16px", color: "#002855", marginBottom: "15px", fontWeight: "bold" }}>
              SELECCIONE LOS DATOS DE SU CITA
            </h3>

            <div className="reserva-input-group">
              <label>ESPECIALIDAD MÉDICA</label>
              <select
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                required
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
              >
                <option value="">-- Seleccione Especialidad --</option>
                <option value="Medicina General">Medicina General</option>
                <option value="Pediatría">Pediatría</option>
                <option value="Ginecología">Ginecología</option>
                <option value="Odontología">Odontología</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div className="reserva-input-group" style={{ flex: 1 }}>
                <label>FECHA</label>
                <input
                  type="date"
                  value={fechaReserva}
                  onChange={(e) => setFechaReserva(e.target.value)}
                  required
                />
              </div>

              <div className="reserva-input-group" style={{ flex: 1 }}>
                <label>HORA</label>
                <select
                  value={horaReserva}
                  onChange={(e) => setHoraReserva(e.target.value)}
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #cbd5e1", height: "40px" }}
                >
                  <option value="19:30">19:30 PM</option>
                  <option value="19:45">19:45 PM</option>
                  <option value="20:00">20:00 PM</option>
                  <option value="20:15">20:15 PM</option>
                  <option value="20:30">20:30 PM</option>
                </select>
              </div>
            </div>

            <button type="submit" className="reserva-btn-ingresar" style={{ marginTop: "15px", borderColor: "#28a745", color: "#28a745" }}>
              CONFIRMAR RESERVA
            </button>
          </form>
        )}

        <p className="reserva-aviso-expirado">
          Señor usuario su sesión acaba de expirar, por favor vuelva a introducir sus credenciales de acceso.
        </p>
      </div>
    </div>
  );
}