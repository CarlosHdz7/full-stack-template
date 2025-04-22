import Sidebar from '@components/molecules/sidebar';
import styles from './PrivateLayout.module.css';
import Box from '@components/atoms/box';
import { Container } from '@components/atoms/grid';
import TopNavbar from '@components/molecules/topNavbar';

const PrivateLayout = ({ children }) => {
  return (
    <Box className={styles['app-layout']}>
      <Sidebar />
      <Box component="main" className={styles['main-container']}>
        <TopNavbar />
        <Container fluid className={styles['inner-container']}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default PrivateLayout;
