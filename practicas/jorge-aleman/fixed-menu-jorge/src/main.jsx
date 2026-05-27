import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import './menu.css'

import MyPage from './MyPage.jsx'
import PaginaNoEncontrada from './PaginaNoEncontrada.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<MyPage />}
        />

        <Route
          path="*"
          element={<PaginaNoEncontrada />}
        />

      </Routes>

    </BrowserRouter>

  </StrictMode>,
)