import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function Admin() {

  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);

  const [usuario, setUsuario] = useState("");

  const [cargando, setCargando] = useState(true);

  const [error, setError] = useState("");


  // ==========================================
  // CARGAR USUARIOS (RUTA PROTEGIDA)
  // ==========================================

  const cargarUsuarios = async () => {

    setCargando(true);

    setError("");

    try {

      // 1. Verificar que haya sesión y que sea Admin

      const sesion = await fetch(
        API + "/verificar-sesion",
        {
          method: "GET",
          credentials: "include"
        }
      );


      if (!sesion.ok) {

        // Sin token válido: de vuelta al login
        navigate("/");

        return;

      }


      const datosSesion = await sesion.json();

      setUsuario(datosSesion.usuario.user);


      // 2. Pedir la lista de usuarios

      const response = await fetch(
        API + "/consultarUsuarios",
        {
          method: "GET",
          credentials: "include"
        }
      );


      if (response.status === 403) {

        setError(
          "Tu cuenta no tiene rol Admin, así que no puedes ver los usuarios registrados."
        );

        setUsuarios([]);

        return;

      }


      if (!response.ok) {

        const datos = await response.json();

        throw new Error(
          datos.mensaje || "No se pudieron consultar los usuarios."
        );

      }


      const lista = await response.json();

      setUsuarios(Array.isArray(lista) ? lista : []);

    }
    catch (e) {

      setError(
        e.message === "Failed to fetch"
          ? "No se pudo conectar al servidor. Revisa que el backend esté corriendo en " + API
          : e.message
      );

    }
    finally {

      setCargando(false);

    }

  };


  useEffect(() => {

    cargarUsuarios();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // ==========================================
  // CONTEO POR ROL
  // ==========================================

  const totalAdmin = usuarios.filter(
    (u) => String(u.rol || "").toLowerCase() === "admin"
  ).length;

  const totalUser = usuarios.length - totalAdmin;


  return (

    <div className="admin-page">

      <div className="admin-container">


        {/* ====================================
            ENCABEZADO
            ==================================== */}

        <div className="admin-top">

          <div>

            <h1 className="admin-title">
              🛡️ Panel de Administrador
            </h1>

            <p className="admin-subtitle">
              {usuario
                ? "Sesión de " + usuario + ". "
                : ""}
              Usuarios registrados en la base de datos.
            </p>

          </div>


          <div className="admin-actions">

            <button
              type="button"
              className="admin-button"
              onClick={cargarUsuarios}
              disabled={cargando}
            >
              {cargando ? "Actualizando..." : "Actualizar"}
            </button>

            <button
              type="button"
              className="admin-button admin-button--ghost"
              onClick={() => navigate("/mypage")}
            >
              Volver a AutoMax
            </button>

          </div>

        </div>


        {/* ====================================
            RESUMEN
            ==================================== */}

        <div className="admin-cards">

          <div className="admin-card">

            <strong>
              {cargando ? "—" : usuarios.length}
            </strong>

            <span>Usuarios totales</span>

          </div>


          <div className="admin-card">

            <strong>
              {cargando ? "—" : totalAdmin}
            </strong>

            <span>Administradores</span>

          </div>


          <div className="admin-card">

            <strong>
              {cargando ? "—" : totalUser}
            </strong>

            <span>Usuarios estándar</span>

          </div>

        </div>


        {/* ====================================
            CONTENIDO
            ==================================== */}

        {error && (

          <div className="admin-message">
            {error}
          </div>

        )}


        {!error && (

          <div className="admin-panel">

            {cargando ? (

              <div className="admin-empty">
                Consultando usuarios...
              </div>

            ) : usuarios.length === 0 ? (

              <div className="admin-empty">
                Todavía no hay usuarios registrados.
              </div>

            ) : (

              <table className="admin-table">

                <thead>

                  <tr>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>ID</th>
                  </tr>

                </thead>

                <tbody>

                  {usuarios.map((u) => (

                    <tr key={u._id}>

                      <td>
                        <strong>{u.user}</strong>
                      </td>

                      <td>
                        <span
                          className={
                            String(u.rol || "").toLowerCase() === "admin"
                              ? "admin-rol admin-rol--admin"
                              : "admin-rol admin-rol--user"
                          }
                        >
                          {u.rol}
                        </span>
                      </td>

                      <td className="admin-id">
                        {u._id}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default Admin;
