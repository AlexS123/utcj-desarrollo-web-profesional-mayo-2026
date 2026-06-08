import Navbar from "../components/Navbar";
import "../styles/home.css";

function MyPage() {
  return (
    <>
      <Navbar />

      <section className="principal">
        <h1>Vuela con nosotros</h1>
        <p>Somos tu mejor opción para viajar seguro y cómodo.</p>
      </section>
    </>
  );
}

export default MyPage;