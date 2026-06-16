import { Routes, Route } from "react-router-dom";

import Mypage from "./Mypage";
import Error404 from "./components/Error404";

function App() {

    return (

        <Routes>

            <Route path="/" element={<Mypage />} />

            <Route path="*" element={<Error404 />} />

        </Routes>

    );

}

export default App;