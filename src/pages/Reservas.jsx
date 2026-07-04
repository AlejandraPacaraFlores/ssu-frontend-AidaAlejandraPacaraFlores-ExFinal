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
  const [mostrarPantallaBloqueo, setMostrarPantallaBloqueo] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const handleIngresar = async (e) => {
    e.preventDefault();
    setMensajeError("");
    setMensajeExito("");

    if (!especialidad) {
      setMensajeError("Por favor, seleccione una especialidad médica.");
      return;
    }

    // Armamos el objeto exactamente igual a la estructura que especificas de tu backend
    const datosReserva = {
      codigoAsegurado: usuario,
      contrasenia: contrasena,
      especialidad: especialidad,
      fechaReserva: fechaReserva,
      horaReserva: horaReserva,
      estado: 1 // 1 = Reservado / Activo en tu BD
    };

    try {
      // Enviamos la petición directa a tu API de Spring Boot
      const response = await fetch("http://localhost:8080/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosReserva),
      });

      // SI TU API RECONOCE QUE ESTÁ FUERA DE HORARIO
      if (response.status === 403) { 
        setMostrarPantallaBloqueo(true);
        return;
      }

      if (response.status === 401) {
        setMensajeError("Contraseña o datos incorrectos. Intente de nuevo.");
      } else if (response.status === 404) {
        setMensajeError("El usuario ingresado no se encuentra afiliado al SSU Potosí.");
      } else if (!response.ok) {
        // En caso de otro error del servidor, se activa la pantalla de bloqueo o error
        setMostrarPantallaBloqueo(true); 
      } else {
        // Ingreso y registro correcto (200 OK / 201 Created)
        setMensajeExito("¡Reserva realizada con éxito!");
        
        // Limpiamos los campos del formulario
        setUsuario("");
        setContrasena("");
        setEspecialidad("");
        setFechaReserva(new Date().toISOString().split("T")[0]);
        setHoraReserva("19:30");
      }
    } catch (error) {
      // Si el backend no está corriendo o se cae, se activa el bloqueo de seguridad
      setMostrarPantallaBloqueo(true);
    }
  };

  // VISTA 2: PANTALLA DE ERROR/BLOQUEO (Horarios SSU)
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

  // VISTA 1: FORMULARIO DE INGRESO Y REGISTRO DIRECTO
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

        {mensajeError && (
          <div className="reserva-alert-error">
            {mensajeError}
          </div>
        )}

        {mensajeExito && (
          <div className="reserva-alert-exito" style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "10px", borderRadius: "4px", marginBottom: "15px", textAlign: "center", fontWeight: "bold" }}>
            {mensajeExito}
          </div>
        )}

        <form onSubmit={handleIngresar} className="reserva-form">
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

          {/* NUEVO: Selección de Especialidad */}
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

          {/* NUEVO: Selección de Fecha y Hora en la misma línea */}
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

          <button type="submit" className="reserva-btn-ingresar" style={{ marginTop: "15px" }}>
            INGRESAR
          </button>
        </form>

        <p className="reserva-aviso-expirado">
          Señor usuario su sesión acaba de expirar, por favor vuelva a introducir sus credenciales de acceso.
        </p>
      </div>
    </div>
  );
}