import { Container } from '@components/atoms/grid';
import Navbar from '@components/molecules/navbar';

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container fluid>
        <main>{children}</main>
      </Container>
    </>
  );
};

export default PublicLayout;
