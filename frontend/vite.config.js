import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_APP_PORT) || 3000,
    },
    define: {
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE),
    },
    css: {
      modules: {
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        hashPrefix: 'prefix',
      },
      devSourcemap: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: 'vitest.setup.js',
    },
    resolve: {
      alias: {
        // jsconfig.json should have the same alias
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@utils': path.resolve(__dirname, 'src/lib/utils'),
        '@constants': path.resolve(__dirname, 'src/lib/constants'),
        '@contexts': path.resolve(__dirname, 'src/lib/contexts'),
        '@hooks': path.resolve(__dirname, 'src/lib/hooks'),
        '@locales': path.resolve(__dirname, 'src/lib/locales'),
        '@services': path.resolve(__dirname, 'src/lib/services/api'),
      },
    },
  };
});
