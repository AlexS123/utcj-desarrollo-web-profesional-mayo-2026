import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'

import Reg from './reg.jsx'
import MyPage from './mypage.jsx'
import ErrorPage from './ErrorPage.jsx'
import Login from './login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>

      <Routes>

        {/* La primera pantalla será Login */}
        <Route path="/" element={<Login />} />

        {/* Registro */}
        <Route path="/reg" element={<Reg />} />

        {/* Página principal */}
        <Route path="/mypage" element={<MyPage />} />

        {/* Página de error */}
        <Route path="*" element={<ErrorPage />} />

      </Routes>

    </BrowserRouter>

  </StrictMode>
)
