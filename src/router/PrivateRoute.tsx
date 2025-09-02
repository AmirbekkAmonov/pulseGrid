import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuth: boolean;
}

export default function ProtectedRoute({
  children,
  isAuth,
}: ProtectedRouteProps) {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
