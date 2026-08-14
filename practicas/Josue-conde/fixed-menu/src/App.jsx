import { Routes, Route } from "react-router-dom";

import MyPage from "./MyPage";
import Registro from "./Registro";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Error403 from "./Error403";
import Usuarios from "./Usuarios";

function App(){

    return(

        <Routes>

            <Route
                path="/"
                element={<MyPage/>}
            />

            <Route
                path="/registro"
                element={<Registro/>}
            />

            <Route
                path="/login"
                element={<Login/>}
            />

            <Route
                path="/dashboard"
                element={<Dashboard/>}
            />

            <Route
                path="/usuarios"
                element={<Usuarios/>}
            />

            <Route
                path="/403"
                element={<Error403/>}
            />

        </Routes>

    );

}

export default App;