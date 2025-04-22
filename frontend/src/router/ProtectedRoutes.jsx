import { ROUTES } from '@constants/routes';
import { Navigate } from 'react-router-dom';

// Simulación de autenticación
const useAuth = () => {
  const user = localStorage.getItem('user'); // Si hay usuario en localStorage, está autenticado
  return !!user;
};

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Navigate to={`${ROUTES.private.fullPath.home}`} /> : children;
};

export default ProtectedRoutes;
