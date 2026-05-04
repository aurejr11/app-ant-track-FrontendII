import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import EstadisticasPage from "../pages/EstadisticasPage";

const router = createBrowserRouter([
  { path: "/",          element: <HomePage /> },
  { path: "/login",     element: <LoginPage /> },
  { path: "/register",  element: <RegisterPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/estadisticas",  element: <EstadisticasPage /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}