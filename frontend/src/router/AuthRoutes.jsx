import PublicLayout from '@components/layouts/publicLayout';
import { ROUTES } from '@constants/routes';
import NotFound from '@pages/NotFound';
import Login from '@pages/auth/login';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

const AuthRoutes = () => {
  return (
    <ProtectedRoutes>
      <PublicLayout>
        <Routes>
          <Route path={ROUTES.auth.login} element={<Login />} />

          <Route path={ROUTES.notFound} element={<NotFound />} />
        </Routes>
      </PublicLayout>
    </ProtectedRoutes>
  );
};

export default AuthRoutes;
