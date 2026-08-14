import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyPage() {

  const navigate = useNavigate();

  // ==========================================
  // USUARIO LOGUEADO
  // ==========================================

  const [usuario, setUsuario] = useState(
    localStorage.getItem("usuario") || "Invitado"
  );

  const [rol, setRol] = useState("");

  const [cargando, setCargando] = useState(true);


  // ==========================================
  // VERIFICAR SESIÓN CON EL BACKEND
  // ==========================================

  useEffect(() => {

    const verificarSesion = async () => {

      try {

        const response = await fetch(
          "http://localhost:5000/verificar-sesion",
          {
            method: "GET",
            credentials: "include"
          }
        );


        if (!response.ok) {

          localStorage.removeItem("usuario");

          navigate("/");

          return;

        }


        const data = await response.json();


        // ======================================
        // GUARDAR DATOS DEL USUARIO
        // ======================================

        if (data.usuario) {

          if (data.usuario.user) {

            setUsuario(data.usuario.user);

            localStorage.setItem(
              "usuario",
              data.usuario.user
            );

          }


          if (data.usuario.rol) {

            setRol(data.usuario.rol);

          }

        }

      }
      catch (error) {

        console.error(
          "Error verificando sesión:",
          error
        );

        localStorage.removeItem("usuario");

        navigate("/");

      }
      finally {

        setCargando(false);

      }

    };


    verificarSesion();

  }, [navigate]);


  // ==========================================
  // CERRAR SESIÓN
  // ==========================================

  const cerrarSesion = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/logout",
        {
          method: "POST",
          credentials: "include"
        }
      );


      if (!response.ok) {

        console.error(
          "No se pudo cerrar correctamente la sesión."
        );

      }

    }
    catch (error) {

      console.error(
        "Error cerrando sesión:",
        error
      );

    }


    // ========================================
    // BORRAR INFORMACIÓN LOCAL
    // ========================================

    localStorage.removeItem("usuario");

    localStorage.removeItem("app_token");


    // ========================================
    // REGRESAR AL LOGIN
    // ========================================

    navigate("/");

  };


  // ==========================================
  // DATOS DEL FORMULARIO
  // ==========================================

  const [datos, setDatos] = useState({

    nombre: "",
    apellido: "",
    edad: "",
    vehiculo: "",
    compra: "",
    terminos: false,

  });


  const [errores, setErrores] = useState({});

  const [mensaje, setMensaje] = useState("");


  // ==========================================
  // CAMBIAR DATOS
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;


    setDatos({

      ...datos,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    });

  };


  // ==========================================
  // VALIDAR FORMULARIO
  // ==========================================

  const validar = () => {

    let error = {};


    const letras =
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;


    // ========================================
    // NOMBRE
    // ========================================

    if (!datos.nombre.trim()) {

      error.nombre =
        "Campo obligatorio";

    }
    else if (!letras.test(datos.nombre)) {

      error.nombre =
        "Solo letras";

    }


    // ========================================
    // APELLIDO
    // ========================================

    if (!datos.apellido.trim()) {

      error.apellido =
        "Campo obligatorio";

    }
    else if (!letras.test(datos.apellido)) {

      error.apellido =
        "Solo letras";

    }


    // ========================================
    // EDAD
    // ========================================

    if (!datos.edad) {

      error.edad =
        "Ingrese edad";

    }


    // ========================================
    // VEHÍCULO
    // ========================================

    if (!datos.vehiculo) {

      error.vehiculo =
        "Seleccione vehículo";

    }


    // ========================================
    // FORMA DE COMPRA
    // ========================================

    if (!datos.compra) {

      error.compra =
        "Seleccione compra";

    }


    // ========================================
    // TÉRMINOS
    // ========================================

    if (!datos.terminos) {

      error.terminos =
        "Debe aceptar";

    }


    setErrores(error);


    return Object.keys(error).length === 0;

  };


  // ==========================================
  // ENVIAR FORMULARIO
  // ==========================================

  const handleSubmit = (e) => {

    e.preventDefault();


    if (validar()) {

      setMensaje(
        "✅ Registro exitoso"
      );


      setDatos({

        nombre: "",
        apellido: "",
        edad: "",
        vehiculo: "",
        compra: "",
        terminos: false,

      });


      setErrores({});

    }
    else {

      setMensaje("");

    }

  };


  // ==========================================
  // MOSTRAR CARGANDO
  // ==========================================

  if (cargando) {

    return (

      <div style={styles.loading}>

        <div style={styles.loadingCard}>

          <h2>
            🔐 Verificando sesión...
          </h2>

          <p>
            Por favor espera un momento.
          </p>

        </div>

      </div>

    );

  }


  // ==========================================
  // PÁGINA
  // ==========================================

  return (

    <div style={styles.page}>


      {/* ======================================
          FIXED MENU
          ====================================== */}

      <nav style={styles.nav}>


        {/* ====================================
            PARTE IZQUIERDA
            ==================================== */}

        <div style={styles.leftMenu}>

          <h2 style={styles.logo}>
            AutoMax
          </h2>


          <div style={styles.welcome}>

            👤 Bienvenido,{" "}

            <strong>
              {usuario}
            </strong>

          </div>

        </div>


        {/* ====================================
            MENÚ
            ==================================== */}

        <ul style={styles.menu}>


          <li>

            <a
              href="#inicio"
              style={styles.link}
            >
              Inicio
            </a>

          </li>


          <li>

            <a
              href="#servicios"
              style={styles.link}
            >
              Servicios
            </a>

          </li>


          <li>

            <a
              href="#nosotros"
              style={styles.link}
            >
              Nosotros
            </a>

          </li>


          <li>

            <a
              href="#galeria"
              style={styles.link}
            >
              Galería
            </a>

          </li>


          <li>

            <a
              href="#registro"
              style={styles.link}
            >
              Registro
            </a>

          </li>


          <li>

            <a
              href="#contacto"
              style={styles.link}
            >
              Contacto
            </a>

          </li>


          {/* ==================================
              RUTA ADMINISTRADOR
              ================================== */}

          {String(rol).toLowerCase() === "admin" && (

            <li>

              <button
                type="button"
                style={styles.adminButton}
                onClick={() =>
                  navigate("/admin")
                }
              >

                🛡️ Administrador

              </button>

            </li>

          )}

        </ul>


        {/* ====================================
            CERRAR SESIÓN
            ==================================== */}

        <button
          type="button"
          style={styles.logoutButton}
          onClick={cerrarSesion}
        >

          🔒 Cerrar sesión

        </button>

      </nav>


      {/* ======================================
          INICIO
          ====================================== */}

      <section
        id="inicio"
        style={styles.hero}
      >

        <div style={styles.heroContent}>

          <div>

            <span style={styles.badge}>
              🚗 AGENCIA AUTOMOTRIZ
            </span>


            <h1 style={styles.heroTitle}>
              Encuentra el vehículo
              <br />
              perfecto para ti
            </h1>


            <p style={styles.heroText}>

              Bienvenido a AutoMax,
              {usuario}. Descubre nuestra
              variedad de vehículos nuevos
              y seminuevos.

            </p>


            <a
              href="#galeria"
              style={styles.heroButton}
            >

              Ver catálogo

            </a>

          </div>


          <div style={styles.carCard}>

            <div style={styles.carEmoji}>
              🚘
            </div>

            <h2>
              AutoMax
            </h2>

            <p>
              Calidad • Confianza • Servicio
            </p>

          </div>

        </div>

      </section>


      {/* ======================================
          SERVICIOS
          ====================================== */}

      <section
        id="servicios"
        style={styles.section}
      >

        <div style={styles.sectionHeader}>

          <span style={styles.sectionTag}>
            NUESTROS SERVICIOS
          </span>

          <h1>
            Todo para tu vehículo
          </h1>

          <p>
            Te ofrecemos soluciones completas
            para que encuentres y mantengas
            el vehículo ideal.
          </p>

        </div>


        <div style={styles.cardsContainer}>


          <div style={styles.serviceCard}>

            <div style={styles.serviceIcon}>
              🚗
            </div>

            <h2>
              Venta de vehículos
            </h2>

            <p>
              Encuentra vehículos nuevos
              y seminuevos de excelente calidad.
            </p>

          </div>


          <div style={styles.serviceCard}>

            <div style={styles.serviceIcon}>
              💰
            </div>

            <h2>
              Financiamiento
            </h2>

            <p>
              Opciones de financiamiento
              adaptadas a tus necesidades.
            </p>

          </div>


          <div style={styles.serviceCard}>

            <div style={styles.serviceIcon}>
              🔧
            </div>

            <h2>
              Mantenimiento
            </h2>

            <p>
              Mantén tu vehículo en excelentes
              condiciones con nuestros servicios.
            </p>

          </div>

        </div>

      </section>


      {/* ======================================
          NOSOTROS
          ====================================== */}

      <section
        id="nosotros"
        style={styles.darkSection}
      >

        <div style={styles.aboutContainer}>

          <div style={styles.aboutIcon}>
            🏢
          </div>


          <div>

            <span style={styles.sectionTag}>
              SOBRE NOSOTROS
            </span>

            <h1>
              Conoce AutoMax
            </h1>

            <p>
              Somos una agencia comprometida
              con ofrecer vehículos de calidad
              y una excelente experiencia
              para nuestros clientes.
            </p>

            <p>
              Nuestro objetivo es ayudarte a
              encontrar el vehículo que mejor
              se adapte a tus necesidades.
            </p>

          </div>

        </div>

      </section>


      {/* ======================================
          GALERÍA
          ====================================== */}

      <section
        id="galeria"
        style={styles.section}
      >

        <div style={styles.sectionHeader}>

          <span style={styles.sectionTag}>
            CATÁLOGO
          </span>

          <h1>
            Nuestros vehículos
          </h1>

        </div>


        <div style={styles.cardsContainer}>


          <div style={styles.vehicleCard}>

            <div style={styles.vehicleImage}>
              🚗
            </div>

            <h2>
              Nissan Versa
            </h2>

            <p>
              Sedán • Económico • Confortable
            </p>

            <button style={styles.cardButton}>
              Ver vehículo
            </button>

          </div>


          <div style={styles.vehicleCard}>

            <div style={styles.vehicleImage}>
              🚙
            </div>

            <h2>
              Toyota RAV4
            </h2>

            <p>
              SUV • Familiar • Versátil
            </p>

            <button style={styles.cardButton}>
              Ver vehículo
            </button>

          </div>


          <div style={styles.vehicleCard}>

            <div style={styles.vehicleImage}>
              🏎️
            </div>

            <h2>
              Mazda 3
            </h2>

            <p>
              Deportivo • Elegante • Moderno
            </p>

            <button style={styles.cardButton}>
              Ver vehículo
            </button>

          </div>


          <div style={styles.vehicleCard}>

            <div style={styles.vehicleImage}>
              🚘
            </div>

            <h2>
              Honda Civic
            </h2>

            <p>
              Sedán • Potente • Moderno
            </p>

            <button style={styles.cardButton}>
              Ver vehículo
            </button>

          </div>

        </div>

      </section>


      {/* ======================================
          REGISTRO
          ====================================== */}

      <section
        id="registro"
        style={styles.formSection}
      >

        <div style={styles.sectionHeader}>

          <span style={styles.sectionTag}>
            CONTACTO
          </span>

          <h1>
            Registro de Clientes
          </h1>

          <p>
            Déjanos tus datos y nos pondremos
            en contacto contigo.
          </p>

        </div>


        <form
          style={styles.formulario}
          onSubmit={handleSubmit}
        >


          <input
            style={styles.input}
            name="nombre"
            placeholder="Nombre"
            value={datos.nombre}
            onChange={handleChange}
          />


          <span style={styles.error}>
            {errores.nombre}
          </span>


          <input
            style={styles.input}
            name="apellido"
            placeholder="Apellido"
            value={datos.apellido}
            onChange={handleChange}
          />


          <span style={styles.error}>
            {errores.apellido}
          </span>


          <input
            type="number"
            style={styles.input}
            name="edad"
            placeholder="Edad"
            value={datos.edad}
            onChange={handleChange}
          />


          <span style={styles.error}>
            {errores.edad}
          </span>


          <select
            style={styles.input}
            name="vehiculo"
            value={datos.vehiculo}
            onChange={handleChange}
          >

            <option value="">
              Seleccione vehículo
            </option>

            <option>
              Nissan Versa
            </option>

            <option>
              Toyota RAV4
            </option>

            <option>
              Mazda 3 Sport
            </option>

            <option>
              Honda Civic
            </option>

            <option>
              Ford Ranger
            </option>

          </select>


          <span style={styles.error}>
            {errores.vehiculo}
          </span>


          <div style={styles.radioContainer}>

            <label>

              <input
                type="radio"
                name="compra"
                value="Contado"
                checked={
                  datos.compra === "Contado"
                }
                onChange={handleChange}
              />

              {" "}Contado

            </label>


            <label>

              <input
                type="radio"
                name="compra"
                value="Financiamiento"
                checked={
                  datos.compra === "Financiamiento"
                }
                onChange={handleChange}
              />

              {" "}Financiamiento

            </label>

          </div>


          <span style={styles.error}>
            {errores.compra}
          </span>


          <label style={styles.terms}>

            <input
              type="checkbox"
              name="terminos"
              checked={datos.terminos}
              onChange={handleChange}
            />

            {" "}Acepto términos y condiciones

          </label>


          <span style={styles.error}>
            {errores.terminos}
          </span>


          <button
            type="submit"
            style={styles.boton}
          >

            Enviar registro

          </button>


          <p style={styles.exito}>
            {mensaje}
          </p>

        </form>

      </section>


      {/* ======================================
          CONTACTO
          ====================================== */}

      <section
        id="contacto"
        style={styles.contactSection}
      >

        <h1>
          ¿Tienes alguna pregunta?
        </h1>

        <p>
          Estamos para ayudarte.
        </p>

        <div style={styles.contactInfo}>

          <span>
            📧 contacto@automax.com
          </span>

          <span>
            📞 (656) 123-4567
          </span>

          <span>
            📍 Ciudad Juárez, Chihuahua
          </span>

        </div>

      </section>


      {/* ======================================
          FOOTER
          ====================================== */}

      <footer style={styles.footer}>

        <h2>
          AutoMax
        </h2>

        <p>
          © 2026 AutoMax. Todos los derechos
          reservados.
        </p>

      </footer>

    </div>

  );

}


/* ==================================================
   ESTILOS
   ================================================== */

const styles = {


  page: {

    margin: 0,
    padding: 0,
    width: "100%",
    fontFamily:
      "Arial, Helvetica, sans-serif",

    background: "#f4f7fa",

  },


  // ==========================================
  // LOADING
  // ==========================================

  loading: {

    minHeight: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    background:
      "linear-gradient(135deg,#07111f,#12304a)",

  },


  loadingCard: {

    background: "white",

    padding: "40px",

    borderRadius: "15px",

    textAlign: "center",

    boxShadow:
      "0 10px 40px rgba(0,0,0,0.3)",

  },


  // ==========================================
  // NAV
  // ==========================================

  nav: {

    position: "fixed",

    top: 0,

    left: 0,

    right: 0,

    width: "100%",

    height: "75px",

    boxSizing: "border-box",

    background:
      "rgba(10,15,25,0.97)",

    color: "white",

    display: "flex",

    alignItems: "center",

    justifyContent:
      "space-between",

    padding: "0 25px",

    zIndex: 9999,

    boxShadow:
      "0 3px 15px rgba(0,0,0,0.35)",

  },


  leftMenu: {

    display: "flex",

    alignItems: "center",

    gap: "20px",

  },


  logo: {

    color: "#00bfff",

    margin: 0,

    fontSize: "25px",

    whiteSpace: "nowrap",

  },


  welcome: {

    color: "#ddd",

    fontSize: "14px",

    whiteSpace: "nowrap",

  },


  menu: {

    display: "flex",

    alignItems: "center",

    gap: "18px",

    listStyle: "none",

    margin: 0,

    padding: 0,

  },


  link: {

    color: "white",

    textDecoration: "none",

    fontWeight: "bold",

    cursor: "pointer",

  },


  adminButton: {

    background:
      "rgba(0,191,255,0.15)",

    color: "#00bfff",

    border:
      "1px solid #00bfff",

    padding: "8px 12px",

    borderRadius: "6px",

    cursor: "pointer",

    fontWeight: "bold",

  },


  logoutButton: {

    background: "#e53935",

    color: "white",

    border: "none",

    padding: "10px 15px",

    borderRadius: "7px",

    cursor: "pointer",

    fontWeight: "bold",

    whiteSpace: "nowrap",

  },


  // ==========================================
  // HERO
  // ==========================================

  hero: {

    minHeight: "100vh",

    padding:
      "120px 60px 60px",

    boxSizing: "border-box",

    background:
      "linear-gradient(135deg,#07111f,#12304a)",

    color: "white",

    display: "flex",

    alignItems: "center",

  },


  heroContent: {

    width: "100%",

    maxWidth: "1200px",

    margin: "auto",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    gap: "60px",

  },


  badge: {

    display: "inline-block",

    background:
      "rgba(0,191,255,0.15)",

    color: "#00bfff",

    padding: "8px 15px",

    borderRadius: "20px",

    fontWeight: "bold",

    fontSize: "13px",

    marginBottom: "20px",

  },


  heroTitle: {

    fontSize: "52px",

    lineHeight: "1.1",

    margin: "0 0 25px",

  },


  heroText: {

    fontSize: "18px",

    lineHeight: "1.7",

    color: "#d4dde8",

    maxWidth: "600px",

    marginBottom: "30px",

  },


  heroButton: {

    display: "inline-block",

    background: "#00bfff",

    color: "white",

    textDecoration: "none",

    padding: "14px 25px",

    borderRadius: "8px",

    fontWeight: "bold",

  },


  carCard: {

    width: "330px",

    height: "270px",

    borderRadius: "20px",

    background:
      "linear-gradient(145deg,#102b42,#07111f)",

    border:
      "1px solid rgba(0,191,255,0.3)",

    display: "flex",

    flexDirection: "column",

    justifyContent: "center",

    alignItems: "center",

    boxShadow:
      "0 20px 50px rgba(0,0,0,0.4)",

  },


  carEmoji: {

    fontSize: "100px",

    marginBottom: "10px",

  },


  // ==========================================
  // SECCIONES
  // ==========================================

  section: {

    minHeight: "100vh",

    padding:
      "110px 50px 70px",

    boxSizing: "border-box",

    background: "#f4f7fa",

  },


  darkSection: {

    minHeight: "70vh",

    padding:
      "110px 50px",

    boxSizing: "border-box",

    background: "#0c1825",

    color: "white",

    display: "flex",

    alignItems: "center",

  },


  sectionHeader: {

    textAlign: "center",

    maxWidth: "750px",

    margin:
      "0 auto 50px",

  },


  sectionTag: {

    color: "#00aeea",

    fontWeight: "bold",

    fontSize: "13px",

    letterSpacing: "2px",

  },


  cardsContainer: {

    maxWidth: "1200px",

    margin: "auto",

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",

    gap: "25px",

  },


  serviceCard: {

    background: "white",

    padding: "30px",

    borderRadius: "15px",

    textAlign: "center",

    boxShadow:
      "0 8px 25px rgba(0,0,0,0.08)",

  },


  serviceIcon: {

    fontSize: "50px",

    marginBottom: "15px",

  },


  // ==========================================
  // NOSOTROS
  // ==========================================

  aboutContainer: {

    maxWidth: "1000px",

    margin: "auto",

    display: "flex",

    alignItems: "center",

    gap: "50px",

  },


  aboutIcon: {

    fontSize: "100px",

    background:
      "rgba(0,191,255,0.1)",

    padding: "35px",

    borderRadius: "25px",

  },


  // ==========================================
  // VEHÍCULOS
  // ==========================================

  vehicleCard: {

    background: "white",

    borderRadius: "15px",

    padding: "20px",

    boxShadow:
      "0 8px 25px rgba(0,0,0,0.08)",

    textAlign: "center",

  },


  vehicleImage: {

    height: "170px",

    borderRadius: "12px",

    background:
      "linear-gradient(135deg,#dceeff,#f4f7fa)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "80px",

    marginBottom: "20px",

  },


  cardButton: {

    background: "#00aeea",

    color: "white",

    border: "none",

    padding: "10px 18px",

    borderRadius: "6px",

    cursor: "pointer",

    fontWeight: "bold",

  },


  // ==========================================
  // FORMULARIO
  // ==========================================

  formSection: {

    minHeight: "100vh",

    padding:
      "110px 30px 70px",

    boxSizing: "border-box",

    background: "#eaf1f7",

  },


  formulario: {

    background: "white",

    padding: "35px",

    borderRadius: "15px",

    maxWidth: "550px",

    margin: "auto",

    display: "flex",

    flexDirection: "column",

    gap: "12px",

    boxShadow:
      "0 10px 35px rgba(0,0,0,0.1)",

  },


  input: {

    padding: "13px",

    borderRadius: "7px",

    border:
      "1px solid #ccd5dd",

    fontSize: "16px",

    boxSizing: "border-box",

  },


  radioContainer: {

    display: "flex",

    gap: "25px",

    marginTop: "5px",

  },


  terms: {

    marginTop: "5px",

  },


  boton: {

    background: "#00aeea",

    color: "white",

    padding: "14px",

    border: "none",

    borderRadius: "7px",

    cursor: "pointer",

    fontSize: "16px",

    fontWeight: "bold",

  },


  error: {

    color: "#e53935",

    fontSize: "13px",

  },


  exito: {

    color: "#168a3d",

    fontWeight: "bold",

    textAlign: "center",

  },


  // ==========================================
  // CONTACTO
  // ==========================================

  contactSection: {

    padding: "100px 30px",

    textAlign: "center",

    background:
      "linear-gradient(135deg,#07111f,#12304a)",

    color: "white",

  },


  contactInfo: {

    display: "flex",

    justifyContent: "center",

    flexWrap: "wrap",

    gap: "35px",

    marginTop: "30px",

    color: "#d5e0ea",

  },


  // ==========================================
  // FOOTER
  // ==========================================

  footer: {

    background: "#050b12",

    color: "#aaa",

    textAlign: "center",

    padding: "30px",

  },

};


export default MyPage;