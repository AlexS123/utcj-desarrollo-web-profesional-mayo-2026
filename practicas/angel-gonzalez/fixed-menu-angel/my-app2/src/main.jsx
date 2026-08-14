import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import Reg from './reg.jsx'
import MyPage from './mypage.jsx'
import ErrorPage from './ErrorPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Reg />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)