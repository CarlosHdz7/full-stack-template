import { Col, Row } from '@components/atoms/grid';
import Typography from '@components/atoms/typography';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col>
        <Typography variant="h1">{t('pages.about.welcome')}</Typography>
        <Typography>{t('pages.about.description')}</Typography>
      </Col>
    </Row>
  );
};

export default About;
