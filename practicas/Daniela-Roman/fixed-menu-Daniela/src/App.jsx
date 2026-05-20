function MyPage() {
    return (
        <>
            <section className="itinerary-intro">
                <h1>Itinerario CDMX</h1>
                <p>Un itinerario para mi viaje en julio-agosto</p>
            </section>

            <section id="lugares" className="itinerary-section">
                <h2>Lugares</h2>
                <ul>
                    <li>Zócalo, Catedral y Centro Histórico</li>
                    <li>Barrio de la Roma o Condesa para pasear</li>
                </ul>
            </section>

            <section id="actividades" className="itinerary-section">
                <h2>Actividades</h2>
                <ul>
                    <li>Caminar por el Bosque de Chapultepec y ver el Castillo</li>
                    <li>Atardecer en el monumento a la Revolución</li>
                </ul>
            </section>

            <section id="outfits" className="itinerary-section">
                <h2>Outfits</h2>
                <ul>
                    <li>Ropa cómoda para caminar: tenis, pantalones y playera</li>
                    <li>Abrigo ligero o chamarra para la noche</li>
                </ul>
            </section>
        </>
    )
}
export default MyPage