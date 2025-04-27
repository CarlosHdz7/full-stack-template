import { Route, BrowserRouter as Router, Routes } from 'react-router';
import NotFound from '@pages/NotFound';
import { BASE_ROUTES, ROUTES } from '@constants/routes';
import PublicRoutes from './PublicRoutes';
import AuthRoutes from './AuthRoutes';
import PrivateRoutes from './PrivateRoutes';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path={`${BASE_ROUTES.AUTH}/*`} element={<AuthRoutes />} />

        {/* Public Routes */}
        <Route path={`${BASE_ROUTES.PUBLIC}/*`} element={<PublicRoutes />} />

        {/* Private Routes */}
        <Route path={`${BASE_ROUTES.APP}/*`} element={<PrivateRoutes />} />

        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
