// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = true; // Reemplazar con lógica real (zustand, context, etc.)

const ProtectedRoute = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
