import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyPage from './Mypage.jsx' // Asegúrate de que coincida con el nombre del archivo físico

// Usamos createRoot directamente y apuntamos a 'root'
const container = document.getElementById('root') || document.getElementById('app')
const root = createRoot(container)

root.render(
  <StrictMode>
    <MyPage />
  </StrictMode>
)