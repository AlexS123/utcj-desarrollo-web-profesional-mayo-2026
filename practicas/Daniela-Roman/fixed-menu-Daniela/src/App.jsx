import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MyPage from './pages/MyPage';
import Registro from './pages/Registro';
import Error404 from './pages/Error404';

import './styles/global.css';
import './styles/error404.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;