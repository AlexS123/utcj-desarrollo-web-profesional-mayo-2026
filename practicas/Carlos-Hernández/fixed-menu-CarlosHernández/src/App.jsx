import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MyPage from "./pages/MyPage";
import Registro from "./pages/Registro";
import Error404 from "./pages/Error404";

import "./styles/global.css";

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;