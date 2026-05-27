import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import './index.css'
import './App.css'

import MyPage from './MyPage.jsx'
import Error404 from './Error404.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<MyPage />} />

        <Route path="*" element={<Error404 />} />

      </Routes>

    </BrowserRouter>

  </StrictMode>,
)