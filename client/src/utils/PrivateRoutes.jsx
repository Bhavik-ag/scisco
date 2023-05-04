import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ component, ...rest }) => {
    const authenticated = true;

    return !authenticated ? <Navigate to={"/login"} /> : <Outlet />;
};

export default PrivateRoutes;
