import { useState } from "react";
import "./App.css";
import Registro from "./Registro";


function MyPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);

const [loginData, setLoginData] = useState({
  user: "",
  pass: "",
  rol: "",
  terminos: false,
});
const handleLoginChange = (e) => {
  const { name, value, type, checked } = e.target;

  setLoginData({
    ...loginData,
    [name]: type === "checkbox" ? checked : value,
  });
};

const handleLogin = async (e) => {
  e.preventDefault();

  if (!loginData.terminos) {
    alert("Debes aceptar los términos y condiciones.");
    return;
  }

  try {

    const response = await fetch(
      "http://localhost:5000/registrar",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user: loginData.user,
          pass: loginData.pass,
          rol: loginData.rol,
        }),
      }
    );


    const data = await response.json();


    if(response.ok){

      alert("Usuario registrado correctamente");


      setLoginData({
        user:"",
        pass:"",
        rol:"",
        terminos:false
      });


      setLoginOpen(false);


    }else{

      alert(data.error);

    }


  } catch(error){

    console.error(error);

    alert("Error al conectar con el servidor");

  }

};

  return (
    <div>
      <header className="navbar">
        <div className="logo">
          🚀 <span>SpaceX</span>Agency
        </div>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#misiones">Misiones</a></li>
          <li><a href="#cohetes">Cohetes</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li> <button className="btn-nav-user" onClick={() => setLoginOpen(true)}> Iniciar sesión</button></li>
        </ul>

        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </div>
      </header>

      {loginOpen && (
  <div className="modal-overlay">
    <div className="modal-panel">

      <div className="modal-header">
        <h2>Registrar usuarios</h2>

        <button
          className="modal-close"
          onClick={() => setLoginOpen(false)}
        >
          ✕
        </button>
      </div>

      <form
        className="user-form"
        onSubmit={handleLogin}
      >

        <div className="form-field">
          <label>Correo electrónico</label>

        <input
          type="text"
          name="user"
          value={loginData.user}
         onChange={handleLoginChange}
          placeholder="Nombre de usuario"
           required
            />
        </div>

        <div className="form-field">
          <label>Contraseña</label>

          <input
            type="password"
            name="pass"
            value={loginData.pass}
            onChange={handleLoginChange}
            placeholder="********"
            required
            />
        </div>

        <div className="form-field">

<label>Rol</label>

  <select  name="rol"  value={loginData.rol} onChange={handleLoginChange}  required > <option value=""> Seleccione un rol </option>

    <option value="admin"> Administrador</option>

    <option value="usuario">Usuario </option>
  </select>
</div>

        <div className="form-field" style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <input type="checkbox" name="terminos" checked={loginData.terminos} onChange={handleLoginChange}/>

          <label>
            Acepto los términos y condiciones
          </label>
        </div>

        <div className="modal-actions">

          <button type="button" className="btn-secondary" onClick={() => setLoginOpen(false)}>Cancelar</button>

          <button type="submit" className="btn-primary"> Regsitrar </button>

        </div>

      </form>

    </div>
  </div>
)}

      <section className="hero" id="inicio">
        <div className="hero-content">
          <h1>
            Explorando el <span>Universo</span>
          </h1>

          <p>
            Misiones espaciales de última generación hacia
            los confines del cosmos.
          </p>

          <button>Ver Misiones</button>
        </div>
      </section>

      <section className="cards" id="misiones">
        <div className="card">
          <h3>🌕 Luna</h3>
          <p>
            Misión Artemis — regreso a la superficie
            lunar en 2026.
          </p>
        </div>

        <div className="card">
          <h3>🔴 Marte</h3>
          <p>
            Primera colonia humana en el planeta rojo
            para 2030.
          </p>
        </div>

        <div className="card">
          <h3>🪐 Saturno</h3>
          <p>
            Exploración de Titán, la luna más misteriosa
            del sistema solar.
          </p>
        </div>
      </section>

      {/* FORMULARIO */}
      <Registro />

      <footer>
        © 2026 - Página Profesional
      </footer>
    </div>
  );
}

export default MyPage;