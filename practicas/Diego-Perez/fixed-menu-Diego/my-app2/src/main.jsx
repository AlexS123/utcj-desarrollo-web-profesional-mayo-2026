import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import Errorpage from "./Errorpage.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Errorpage />
  </StrictMode>,
)
