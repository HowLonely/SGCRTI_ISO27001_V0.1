import { Route, RouterProvider, Routes, useNavigate } from "react-router-dom";
import { Loader } from "@mantine/core";
import { createBrowserRouter } from "react-router-dom";
import { IndexSPA } from "./pages/SPA/Index";
import { Auth } from "./pages/Auth/Auth";
import { Home } from "./pages/app/Home";
import { Login } from "./pages/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { verify, getUser } from "./reducer/Actions";
import Cookies from "js-cookie";

const router = createBrowserRouter([
  {
    path: "*",
    Component: Root,
  },
  {
    path: "/",
    Component: IndexSPA,
  },
  {
    path: "/auth/",
    children: [
      { index: true, Component: () => <Login /> },
      { path: "*", Component: Auth },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

function Root() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.AuthReducer.isAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access_token = Cookies.get("access");

    // Verificar si existe un token de acceso
    if (access_token) {
      // Verificar autenticación y cargar usuario
      dispatch(verify())
        .then(() => dispatch(getUser()))
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // No hay token, detener la carga
    }
  }, [dispatch]);

  // Mostrar un loader mientras se verifica la autenticación
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Loader />
      </div>
    );
  }

  return (
    <Routes>
      {/* Ruta para la autenticación */}
      <Route path="/auth/*" element={<Auth />} />
      
      {/* Ruta para el dashboard, requiere autenticación */}
      {isAuthenticated ? (
        <Route path="/app/*" element={<Home />} />
      ) : (
        // Si no está autenticado, redirigir a login
        navigate("/auth/")
      )}
    </Routes>
  );
}
