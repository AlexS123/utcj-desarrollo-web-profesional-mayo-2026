import { useState } from "react";

function MyPage() {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setDatos({
      ...datos,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validar = () => {
    let error = {};

    const letras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;

    if (!datos.nombre.trim()) {
      error.nombre = "Campo obligatorio";
    } else if (!letras.test(datos.nombre)) {
      error.nombre = "Solo letras";
    }

    if (!datos.apellido.trim()) {
      error.apellido = "Campo obligatorio";
    } else if (!letras.test(datos.apellido)) {
      error.apellido = "Solo letras";
    }

    if (!datos.edad) {
      error.edad = "Ingrese edad";
    }

    if (!datos.vehiculo) {
      error.vehiculo = "Seleccione vehículo";
    }

    if (!datos.compra) {
      error.compra = "Seleccione compra";
    }

    if (!datos.terminos) {
      error.terminos = "Debe aceptar";
    }

    setErrores(error);

    return Object.keys(error).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validar()) {
      setMensaje("✅ Registro exitoso");

      setDatos({
        nombre: "",
        apellido: "",
        edad: "",
        vehiculo: "",
        compra: "",
        terminos: false,
      });

      setErrores({});
    } else {
      setMensaje("");
    }
  };

  return (
    <div>

      <nav style={styles.nav}>
        <h2 style={styles.logo}>AutoMax</h2>

        <ul style={styles.menu}>
          <li><a href="#inicio" style={styles.link}>Inicio</a></li>
          <li><a href="#servicios" style={styles.link}>Servicios</a></li>
          <li><a href="#nosotros" style={styles.link}>Nosotros</a></li>
          <li><a href="#galeria" style={styles.link}>Galería</a></li>
          <li><a href="#registro" style={styles.link}>Registro</a></li>
          <li><a href="#contacto" style={styles.link}>Contacto</a></li>
        </ul>
      </nav>

      <section id="inicio" style={styles.section}>
        <h1>Agencia AutoMax</h1>

        <p>
          Bienvenido a AutoMax, tu mejor opción para encontrar vehículos nuevos y seminuevos.
        </p>

        <p>
          Contamos con una amplia variedad de automóviles.
        </p>
      </section>

      <section id="servicios" style={styles.section2}>
        <h1>Servicios</h1>

        <p>🚗 Venta de vehículos</p>
        <p>💰 Financiamiento</p>
        <p>🔧 Mantenimiento</p>
      </section>

      <section id="nosotros" style={styles.section}>
        <h1>Nosotros</h1>

        <p>
          AutoMax ofrece vehículos y excelente servicio.
        </p>
      </section>

      <section id="galeria" style={styles.section2}>
        <h1>Catálogo</h1>

        <p>🚗 Nissan Versa</p>
        <p>🚙 Toyota RAV4</p>
        <p>🏎️ Mazda 3</p>
      </section>

      <section id="registro" style={styles.section}>
        <h1>Registro de Clientes</h1>

        <form style={styles.formulario} onSubmit={handleSubmit}>

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
            <option value="">Seleccione vehículo</option>
            <option>Nissan Versa</option>
            <option>Toyota RAV4</option>
            <option>Mazda 3 Sport</option>
            <option>Honda Civic</option>
            <option>Ford Ranger</option>
          </select>

          <span style={styles.error}>
            {errores.vehiculo}
          </span>

          <label>
            <input
              type="radio"
              name="compra"
              value="Contado"
              checked={datos.compra === "Contado"}
              onChange={handleChange}
            />
            Contado
          </label>

          <label>
            <input
              type="radio"
              name="compra"
              value="Financiamiento"
              checked={datos.compra === "Financiamiento"}
              onChange={handleChange}
            />
            Financiamiento
          </label>

          <span style={styles.error}>
            {errores.compra}
          </span>

          <label>
            <input
              type="checkbox"
              name="terminos"
              checked={datos.terminos}
              onChange={handleChange}
            />
            Acepto términos
          </label>

          <span style={styles.error}>
            {errores.terminos}
          </span>

          <button type="submit" style={styles.boton}>
            Registrarse
          </button>

          <p style={styles.exito}>
            {mensaje}
          </p>

        </form>
      </section>

      <section id="contacto" style={styles.section2}>
        <h1>Contacto</h1>

        <p>📧 contacto@automax.com</p>
        <p>📞 (656) 123-4567</p>
      </section>

    </div>
  );
}

const styles = {
  nav:{
    position:"fixed",
    top:0,
    width:"100%",
    background:"#111",
    color:"white",
    display:"flex",
    justifyContent:"space-between",
    padding:"20px",
  },

  logo:{
    color:"#00bfff"
  },

  menu:{
    display:"flex",
    gap:"20px",
    listStyle:"none"
  },

  link:{
    color:"white",
    textDecoration:"none"
  },

  section:{
    minHeight:"100vh",
    padding:"100px 40px",
    background:"#f4f4f4"
  },

  section2:{
    minHeight:"100vh",
    padding:"100px 40px",
    background:"#dcdcdc"
  },

  formulario:{
    display:"flex",
    flexDirection:"column",
    gap:"15px",
    maxWidth:"500px"
  },

  input:{
    padding:"12px",
    borderRadius:"6px"
  },

  boton:{
    background:"#00bfff",
    color:"white",
    padding:"12px",
    border:"none"
  },

  error:{
    color:"red"
  },

  exito:{
    color:"green"
  }
};

export default MyPage;