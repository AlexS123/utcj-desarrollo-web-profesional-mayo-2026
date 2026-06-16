import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyPage from './MyPage.jsx';
import ErrorPage from './ErrorPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyPage />} />
        
        {/* Rutas para diferentes códigos de error */}
        <Route path="/error/:code" element={<ErrorPage />} />
        <Route path="/400" element={<ErrorPage />} />
        <Route path="/403" element={<ErrorPage />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="/500" element={<ErrorPage />} />
        <Route path="/503" element={<ErrorPage />} />
        
        {/* Ruta catchall para páginas no encontradas */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
