function Error404() {
  return (
    <section className="error">

      <div className="errorCaja">

        <h1>404</h1>

        <h2>Página no encontrada</h2>

        <p>
          La página que intentas visitar no existe
          o fue movida a otra ubicación.
        </p>

        <a href="/">
          <button>Regresar al inicio</button>
        </a>

      </div>

    </section>
  )
}

export default Error404