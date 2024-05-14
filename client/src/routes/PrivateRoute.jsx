import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
    const access_token = localStorage.getItem("access_token");
    const authSelector = useSelector(state => state.AuthReducer.isAuthenticated);

    return (
        authSelector && access_token ? <Outlet /> : <Navigate to="/auth/" replace={true} />
    )
}

export default PrivateRoute;