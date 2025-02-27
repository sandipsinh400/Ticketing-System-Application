import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticate } = useSelector((state) => state.auth); // Get user data from Redux

    return isAuthenticate ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
