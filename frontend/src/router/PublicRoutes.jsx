import PublicLayout from '@components/layouts/publicLayout';
import { ROUTES } from '@constants/routes';
import NotFound from '@pages/NotFound';
import About from '@pages/public/about';
import Home from '@pages/public/home';
import { Route, Routes } from 'react-router';

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path={ROUTES.public.home} element={<Home />} />
        <Route path={ROUTES.public.about} element={<About />} />

        {/* Default */}
        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
