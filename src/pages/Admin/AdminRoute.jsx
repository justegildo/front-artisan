import { Route, Routes } from "react-router-dom";
import ALayout from "./ALayout";
import Dashboard from "./Dashboard";
import Error from "../../_utils/Error";

const AdminRoute = () => {
    return (
        <div>
            <Routes>
                <Route element={<ALayout/>}>
                    <Route index element={<Dashboard/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                </Route>

                <Route path="*" element={<Error/>} />
            </Routes>
        </div>
    );
};

export default AdminRoute;