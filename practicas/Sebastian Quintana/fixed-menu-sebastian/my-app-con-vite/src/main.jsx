import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.js'
import ReactDOM from 'react-dom/client'
import MyPage from './MyPage.jsx'

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<MyPage />)
