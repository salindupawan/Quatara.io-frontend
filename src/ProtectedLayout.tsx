import { useUser } from "@clerk/react";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "ADMIN" | "USER" | "MENTOR";
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return <div></div>; 
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  const userRole = user?.publicMetadata?.roles as string[] || [];
  if (requiredRole && !userRole.includes(requiredRole)) {
    console.warn(
      `Access denied. Required: ${requiredRole}, Found: ${userRole}`,
    );
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};