import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Vuelos from "./pages/Vuelos";
import Destinos from "./pages/Destinos";
import Ofertas from "./pages/Ofertas";
import Contacto from "./pages/Contacto";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";

import RutaPublica from "./components/RutaPublica";

import "./styles/global.css";

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vuelos" element={<Vuelos />} />
        <Route path="/destinos" element={<Destinos />} />´
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/contacto" element={<Contacto />} />

        <Route
          path="/login"
          element={
            <RutaPublica>
              <Login />
            </RutaPublica>
          }
        />

        <Route
          path="/registro"
          element={
            <RutaPublica>
              <Registro />
            </RutaPublica>
          }
        />

        <Route path="*" element={<Error404 />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;