import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Mypage from "./mypage.jsx";

function App() {
  return <Mypage />
}

export default App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Mypage />
  </StrictMode>,
)
