// Base route segments
export const BASE_ROUTES = {
  AUTH: '/auth',
  APP: '/app',
  PUBLIC: '', // Root path for public routes
};

// Complete route definitions
export const ROUTES = {
  public: {
    home: '/',
    about: '/about',
  },
  auth: {
    login: '/login',
    signup: '/signup',
    forgotPassword: '/forgot-password',
    // Add full paths including the /auth prefix
    fullPath: {
      login: `${BASE_ROUTES.AUTH}/login`,
      signup: `${BASE_ROUTES.AUTH}/signup`,
      forgotPassword: `${BASE_ROUTES.AUTH}/forgot-password`,
      root: BASE_ROUTES.AUTH, // The auth root path
    },
  },
  private: {
    home: '/',
    profile: '/profile',
    settings: '/settings',
    pokemon: '/pokemon',
    // Add full paths including the /app prefix
    fullPath: {
      home: `${BASE_ROUTES.APP}/`,
      profile: `${BASE_ROUTES.APP}/profile`,
      settings: `${BASE_ROUTES.APP}/settings`,
      pokemon: `${BASE_ROUTES.APP}/pokemon`,
      root: BASE_ROUTES.APP, // The private root path
    },
  },
  notFound: '*',
};
