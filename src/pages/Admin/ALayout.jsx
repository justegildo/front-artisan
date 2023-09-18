import { Outlet } from "react-router-dom";


const ALayout = () => {
    return (
        <div>
            <h1>Layout admin</h1>
            <Outlet/>
        </div>
    );
};

export default ALayout;