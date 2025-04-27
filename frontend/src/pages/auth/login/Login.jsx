import Box from '@components/atoms/box';
import Button from '@components/atoms/button';
import { Col, Container, Row } from '@components/atoms/grid';
import { ROUTES } from '@constants/routes';
import useLocalStorage from '@hooks/useLocalStorage';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage('user');

  const handleLogin = () => {
    if (user) {
      navigate(ROUTES.private.fullPath.home);
      return;
    }

    setUser('carlos');
    navigate(ROUTES.private.fullPath.home);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Box>
            <Button onClick={handleLogin}>Login</Button>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
