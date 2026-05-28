import { useState } from "react";
import "./App.css";

function MyPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header className="navbar">
        <div className="logo">🚀 <span>SpaceX</span>Agency</div>
        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#misiones">Misiones</a></li>
          <li><a href="#cohetes">Cohetes</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-content">
          <h1>Explorando el <span>Universo</span></h1>
          <p>Misiones espaciales de última generación hacia los confines del cosmos.</p>
          <button>Ver Misiones</button>
        </div>
      </section>

      <section className="cards" id="misiones">
        <div className="card">
          <h3>🌕 Luna</h3>
          <p>Misión Artemis — regreso a la superficie lunar en 2026.</p>
        </div>
        <div className="card">
          <h3>🔴 Marte</h3>
          <p>Primera colonia humana en el planeta rojo para 2030.</p>
        </div>
        <div className="card">
          <h3>🪐 Saturno</h3>
          <p>Exploración de Titán, la luna más misteriosa del sistema solar.</p>
        </div>
      </section>

      <footer>© 2026 — SpaceAgency. Todos los derechos reservados.</footer>
    </div>
  );
}

export default MyPage;