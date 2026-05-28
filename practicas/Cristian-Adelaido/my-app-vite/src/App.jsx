import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./MyPage";
import Error404 from "./Error404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;