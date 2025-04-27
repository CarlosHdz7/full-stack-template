import Box from '@components/atoms/box';
import { useI18n } from '@contexts/languageContext';
import { useTheme } from '@contexts/themeContext';
import styles from './TopNavbar.module.css';
import Button from '@components/atoms/button';
import { useNavigate } from 'react-router';
import { ROUTES } from '@constants/routes';

const TopNavbar = () => {
  const { theme, setTheme } = useTheme();
  const { currentLanguage, setLanguage } = useI18n();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate(ROUTES.public.home);
  };

  return (
    <Box component="header" className={styles.navbar}>
      <Box className={styles.container}>
        <nav className={`${styles.navMenu} ${styles.active}`}>
          {setTheme ? (
            <Button
              variant="primary"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={styles.themeToggle}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <i className="bi bi-brightness-high-fill" />
              ) : (
                <i className="bi bi-moon-fill" />
              )}
            </Button>
          ) : null}

          {setLanguage ? (
            <Button
              variant="primary"
              onClick={() => setLanguage(currentLanguage === 'en' ? 'es' : 'en')}
            >
              {currentLanguage === 'en' ? 'EN' : 'ES'}
            </Button>
          ) : null}

          <Button variant="primary" onClick={() => handleLogout()}>
            Logout
          </Button>
        </nav>
      </Box>
    </Box>
  );
};

export default TopNavbar;
