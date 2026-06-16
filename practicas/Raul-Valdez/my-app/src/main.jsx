import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Mypage from './Mypage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Mypage />
  </StrictMode>,
)