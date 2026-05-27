import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

//import MyPage from './mypage.jsx'
import ErrorPage from './ErrorPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorPage />
  </StrictMode>,
)