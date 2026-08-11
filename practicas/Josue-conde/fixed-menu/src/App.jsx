import { Routes, Route } from "react-router-dom";

import MyPage from "./MyPage";
import Registro from "./Registro";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App(){

    return(

        <Routes>

            <Route path="/" element={<MyPage/>}/>

            <Route path="/registro" element={<Registro/>}/>

            <Route path="/login" element={<Login/>}/>

            <Route path="/dashboard" element={<Dashboard/>}/>

        </Routes>

    );

}

export default App;