import { Col, Row } from '@components/atoms/grid';
import Typography from '@components/atoms/typography';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col>
        <Typography variant="h1">{t('pages.home.welcome')}</Typography>
        <Typography>{t('pages.home.description')}</Typography>
      </Col>
    </Row>
  );
};

export default Home;
