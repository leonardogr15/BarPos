import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Pedidos from "./routes/Pedidos";
import Home from "./routes/Home";
import Caja from "./routes/Caja";
import Admin from "./routes/Admin";
import Navbar from "./components/Navbar";
import "./App.css";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "pedidos",
        element: <Pedidos />,
      },
      {
        path: "caja",
        element: <Caja />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);