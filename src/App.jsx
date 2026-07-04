import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

// IMPORTACIÓN DE PÁGINAS REALES
import Inicio from "./pages/Inicio"; 
import Convocatorias from "./pages/Convocatorias"; 
import Reservas from "./pages/Reservas"; 
import Institucional from "./pages/Institucional"; // <-- ¡IMPORTAMOS TU NUEVA PÁGINA REAL!

// Componentes temporales limpios restantes
const Servicios = () => <div className="page-body" style={{ padding: "40px", textAlign: "center" }}><h2>Nuestros Servicios Médicos</h2></div>;
const PersonalSalud = () => <div className="page-body" style={{ padding: "40px", textAlign: "center" }}><h2>Personal de Salud Autorizado</h2></div>;
const Transparencia = () => <div className="page-body" style={{ padding: "40px", textAlign: "center" }}><h2>Acceso a la Información y Transparencia</h2></div>;

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Hero />
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            
            <Route path="/servicios/fichaje" element={<Reservas />} />
            <Route path="/reservas" element={<Reservas />} />

            {/* Conectamos la ruta dinámica a tu contenedor real */}
            <Route path="/institucional/:tab" element={<Institucional />} />

            <Route path="/servicios" element={<Servicios />} />
            <Route path="/personal-salud" element={<PersonalSalud />} />
            
            <Route path="/convocatorias" element={<Convocatorias />} />
            <Route path="/contrataciones" element={<Convocatorias />} /> 
            <Route path="/transparencia" element={<Transparencia />} />
          </Routes>
        </main>

        <Footer /> 
      </div>
    </Router>
  );
}

export default App;