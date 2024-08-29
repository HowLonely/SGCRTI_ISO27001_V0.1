import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const PrivateRoute = () => {
  const accessToken = Cookies.get("access");
  const isAuthenticated = useSelector(state => state.AuthReducer.isAuthenticated);

  return (
    isAuthenticated && accessToken ? <Outlet /> : <Navigate to="/auth/" replace={true} />
  );
};

export default PrivateRoute;
