import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'

import MyPage from './assets/MyPage.jsx'
import ErrorPage from './assets/error.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Routes>

        {/* Página principal */}
        <Route path="/" element={<MyPage />} />

        {/* Página 404 */}
        <Route path="*" element={<ErrorPage />} />

      </Routes>

    </BrowserRouter>
  </StrictMode>,
)