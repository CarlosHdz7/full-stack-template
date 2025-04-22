import styles from './Sidebar.module.css';
import Typography from '@components/atoms/typography';
import Box from '@components/atoms/box';
import { ROUTES } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { useI18n } from '@contexts/languageContext';

const Sidebar = () => {
  const { t } = useI18n();

  const menuItems = [
    {
      id: 'home',
      icon: <i className="bi bi-house-fill" />,
      label: t('sidebar.home'),
      to: ROUTES.private.fullPath.home,
      exact: true,
    },
    {
      id: 'profile',
      icon: <i className="bi bi-person-fill" />,
      label: t('sidebar.profile'),
      to: ROUTES.private.fullPath.profile,
      exact: false,
    },
    {
      id: 'pokemon',
      icon: <i className="bi bi-calculator-fill" />,
      label: 'Pokemon',
      to: ROUTES.private.fullPath.pokemon,
      exact: false,
    },
    {
      id: 'settings',
      icon: <i className="bi bi-gear-fill" />,
      label: t('sidebar.settings'),
      to: ROUTES.private.fullPath.settings,
      exact: false,
    },
  ];

  return (
    <Box component="aside" className={styles.sidebar}>
      <Box className={styles.logo}>
        <Typography variant="h2">App Name</Typography>
      </Box>
      <Box component="nav" className={styles.navigation}>
        <Box component="ul" className={styles.menuList}>
          {menuItems.map((item) => (
            <Box component="li" key={item.id}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.active : ''}`}
                end={item.exact}
              >
                <Typography variant="span" className={styles.icon}>
                  {item.icon}
                </Typography>
                <Typography variant="span" className={styles.label}>
                  {item.label}
                </Typography>
              </NavLink>
            </Box>
          ))}
        </Box>
      </Box>
      <div className={styles.footer}>
        <Typography variant="p">© 2025 App Name</Typography>
      </div>
    </Box>
  );
};

export default Sidebar;
