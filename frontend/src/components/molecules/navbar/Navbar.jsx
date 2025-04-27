import Button from '@components/atoms/button';
import { ROUTES } from '@constants/routes';
import { useTheme } from '@contexts/themeContext';

import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useI18n } from '@contexts/languageContext';
import styles from './Navbar.module.css';
import Box from '@components/atoms/box';

const Navbar = ({ logo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, currentLanguage, setLanguage } = useI18n();

  const menuItems = [
    { label: t('navbar.home'), to: ROUTES.public.home, isActive: true },
    { label: t('navbar.about'), to: ROUTES.public.about },
    { label: t('navbar.login'), to: ROUTES.auth.fullPath.login },
    { label: t('navbar.signup'), to: ROUTES.auth.fullPath.signup },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cierra el menú cuando se hace clic en un enlace (en dispositivos móviles)
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <Box component="header" className={styles.navbar}>
      <Box className={styles.container}>
        <Box className={styles.navbarBrand}>
          {logo ? (
            <Link to="/" className={styles.logo}>
              {logo}
            </Link>
          ) : (
            <Link to="/" className={styles.logoText}>
              Brand
            </Link>
          )}
        </Box>

        <Button
          variant="transparent"
          className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.hamburger} />
        </Button>

        <nav className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
          <ul className={styles.navLinks}>
            {menuItems.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li key={index} className={styles.navItem}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                  onClick={handleLinkClick}
                >
                  {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {setTheme ? (
            <Button
              variant="primary"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={styles.themeToggle}
              aria-label="Toggle theme"
            >
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              {theme === 'dark' ? (
                <i className="bi bi-brightness-high-fill" />
              ) : (
                <i className="bi bi-moon-fill" />
              )}
              {/* <svg
                color={theme === 'dark' ? 'white' : 'black'}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                  fill="currentColor"
                />
                <path
                  d="M12 0V4M12 20V24M0 12H4M20 12H24M3.5 3.5L6.3 6.3M17.7 17.7L20.5 20.5M3.5 20.5L6.3 17.7M17.7 6.3L20.5 3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg> */}
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
        </nav>
      </Box>
    </Box>
  );
};

export default Navbar;
