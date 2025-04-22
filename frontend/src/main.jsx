import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from '@contexts/themeContext.jsx';
import { LanguageProvider } from '@contexts/languageContext.jsx';

import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <ThemeProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>
);
