import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

// Componentes temporales con la clase limpia para que no se dupliquen
const Inicio = () => <div className="page-body"><h2>Sección de Novedades y Consultas Externas</h2></div>;
const Institucional = () => <div className="page-body"><h2>Contenido Institucional</h2></div>;
const Servicios = () => <div className="page-body"><h2>Nuestros Servicios Médicos</h2></div>;
const PersonalSalud = () => <div className="page-body"><h2>Personal de Salud Autorizado</h2></div>;
const Contrataciones = () => <div className="page-body"><h2>Convocatorias y Contrataciones</h2></div>;
const Transparencia = () => <div className="page-body"><h2>Acceso a la Información y Transparencia</h2></div>;

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Componentes estructurales superiores fijos */}
        <Header />
        <Hero />
        <Navbar />

        {/* Cambiador dinámico de páginas basado en la URL */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/institucional" element={<Institucional />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/personal-salud" element={<PersonalSalud />} />
            <Route path="/contrataciones" element={<Contrataciones />} />
            <Route path="/transparencia" element={<Transparencia />} />
          </Routes>
        </main>

        {/* Componente del Footer global */}
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;