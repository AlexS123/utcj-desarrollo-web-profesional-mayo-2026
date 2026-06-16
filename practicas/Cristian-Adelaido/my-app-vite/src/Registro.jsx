import { useState } from "react";
import "./App.css";

function Registro() {

  const [datos, setDatos] = useState({
    nombre: "",
    edad: "",
    puesto: "",
    genero: "",
    terminos: false
  });

  const [errores, setErrores] = useState({});

  const validar = () => {

    let nuevosErrores = {};

    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{3,30}$/;
    const edadRegex = /^[0-9]{1,2}$/;

    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    } else if (!nombreRegex.test(datos.nombre)) {
      nuevosErrores.nombre = "Solo letras (3-30 caracteres)";
    }

    if (!datos.edad.trim()) {
      nuevosErrores.edad = "La edad es obligatoria";
    } else if (!edadRegex.test(datos.edad)) {
      nuevosErrores.edad = "Edad inválida";
    }

    if (!datos.puesto) {
      nuevosErrores.puesto = "Selecciona un puesto";
    }

    if (!datos.genero) {
      nuevosErrores.genero = "Selecciona un género";
    }

    if (!datos.terminos) {
      nuevosErrores.terminos = "Debes aceptar los términos";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (validar()) {
      alert("Registro exitoso");
    }
  };

  return (

    <section className="registro">

      <form className="formulario" onSubmit={handleSubmit}>

        <h2>Registro de Empleado</h2>

        <div className="campo">

          <label>Nombre</label>

          <input
            type="text"
            value={datos.nombre}
            onChange={(e) =>
              setDatos({ ...datos, nombre: e.target.value })
            }
          />

          {errores.nombre && (
            <span className="error">
              {errores.nombre}
            </span>
          )}

        </div>

        <div className="campo">

          <label>Edad</label>

          <input
            type="number"
            value={datos.edad}
            onChange={(e) =>
              setDatos({ ...datos, edad: e.target.value })
            }
          />

          {errores.edad && (
            <span className="error">
              {errores.edad}
            </span>
          )}

        </div>

        <div className="campo">

          <label>Puesto</label>

          <select
            value={datos.puesto}
            onChange={(e) =>
              setDatos({ ...datos, puesto: e.target.value })
            }
          >
            <option value="">Seleccione...</option>
            <option>Desarrollador</option>
            <option>Diseñador</option>
            <option>Marketing</option>
            <option>Administrador</option>
            <option>Soporte Técnico</option>
          </select>

          {errores.puesto && (
            <span className="error">
              {errores.puesto}
            </span>
          )}

        </div>

        <div className="campo">

          <label>Género</label>

          <div className="radio-group">

            <label>
              <input
                type="radio"
                name="genero"
                value="Masculino"
                onChange={(e) =>
                  setDatos({ ...datos, genero: e.target.value })
                }
              />
              Masculino
            </label>

            <label>
              <input
                type="radio"
                name="genero"
                value="Femenino"
                onChange={(e) =>
                  setDatos({ ...datos, genero: e.target.value })
                }
              />
              Femenino
            </label>

          </div>

          {errores.genero && (
            <span className="error">
              {errores.genero}
            </span>
          )}

        </div>

        <div className="campo">

          <label>

            <input
              type="checkbox"
              checked={datos.terminos}
              onChange={(e) =>
                setDatos({
                  ...datos,
                  terminos: e.target.checked
                })
              }
            />

            Acepto términos y condiciones

          </label>

          {errores.terminos && (
            <span className="error">
              {errores.terminos}
            </span>
          )}

        </div>

        <button type="submit">
          Registrarse
        </button>

      </form>

    </section>

  );

}

export default Registro;