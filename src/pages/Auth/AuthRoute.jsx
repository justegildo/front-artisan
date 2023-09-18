import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Error from "../../_utils/Error";


const AuthRoute = () => {
    return (
        <div>
            <Routes>
                <Route index element={<Login/>} />
                <Route path="login" element={<Login/>} />
                <Route path="register" element={<Register/>} />
                <Route path="*" element={<Error/>} />
            </Routes>
        </div>
    );
};

export default AuthRoute;