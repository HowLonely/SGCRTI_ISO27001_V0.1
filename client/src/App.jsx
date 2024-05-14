import { Route, RouterProvider, Routes } from "react-router-dom";
import { Loader } from "@mantine/core";

import { createBrowserRouter } from "react-router-dom";
import { IndexSPA } from "./pages/SPA/Index";
import { Auth } from "./pages/Auth/Auth"
import { Home } from "./pages/app/Home";
import { Login } from "./pages/Auth/Login";


const router = createBrowserRouter([
  {
    path: "*",
    Component: Root,
  },
  {
    path: "/",
    Component: IndexSPA
  }, 
  {
    path: "/auth/",
    children: [
      { index: true, Component: () => <Login /> },
      { path: "*", Component: Auth },
    ],
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

function Root() {
  // 2️⃣ `BrowserRouter` component removed, but the <Routes>/<Route>
  // component below are unchanged
  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/app/*" element={<Home />} />
    </Routes>
  );
}
