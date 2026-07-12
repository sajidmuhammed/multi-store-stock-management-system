import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../features/auth/hooks/useAuth";
import { UserRole } from "../../types/common.types";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {debugger
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    user &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
}