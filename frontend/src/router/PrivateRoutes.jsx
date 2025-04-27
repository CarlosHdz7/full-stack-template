import { ROUTES } from '@constants/routes';
import { Navigate, Route, Routes } from 'react-router';
import PrivateLayout from '../components/layouts/privateLayout';

import Home from '@pages/private/home';
import Settings from '@pages/private/settings';
import NotFound from '@pages/NotFound';
import Profile from '@pages/private/profile';
import Pokemon from '@pages/private/pokemon/Pokemon';

// Auth Simulation
const useAuth = () => {
  const user = localStorage.getItem('user', undefined, true);
  return !!user;
};

const PrivateRoutes = () => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) return <Navigate to={`${ROUTES.auth.fullPath.login}`} />;

  return (
    <PrivateLayout>
      <Routes>
        <Route path={ROUTES.private.home} element={<Home />} />
        <Route path={ROUTES.private.settings} element={<Settings />} />
        <Route path={ROUTES.private.profile} element={<Profile />} />
        <Route path={ROUTES.private.pokemon} element={<Pokemon />} />

        {/* Default */}
        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Routes>
    </PrivateLayout>
  );
};

export default PrivateRoutes;
