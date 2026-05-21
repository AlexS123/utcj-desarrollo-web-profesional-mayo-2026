import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyPage from './assets/MyPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyPage />
  </StrictMode>,
)
