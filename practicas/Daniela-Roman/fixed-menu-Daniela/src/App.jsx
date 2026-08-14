import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Itinerario from './pages/Itinerario';
import Lugares from './pages/Lugares';
import Recomendaciones from './pages/Recomendaciones';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import AdministrarUsuarios from './pages/AdministrarUsuarios';
import Error404 from './pages/Error404';

import RutaPublica from './components/RutaPublica';
import RutaAdministrador from './components/RutaAdministrador';

import './styles/global.css';
import './styles/error404.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itinerario" element={<Itinerario />} />
        <Route path="/lugares" element={<Lugares />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/contacto" element={
            <RutaAdministrador>
              <Contacto />
            </RutaAdministrador>
          }
        />

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

        <Route
          path="/administrar-usuarios"
          element={
            <RutaAdministrador>
              <AdministrarUsuarios />
            </RutaAdministrador>
          }
        />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
