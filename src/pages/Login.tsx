import styled from 'styled-components';

import InputBox from '../components/Login/InputBox';

function Login() {
  return (
    <Layout>
      <Col>
        <Logo>LOGO</Logo>
        <LoginBox />
      </Col>
    </Layout>
  );
}

export default Login;

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.color.background};
`;
const Col = styled.div`
  width: 28.438vw;
  margin: 0 auto;
  display: flex;
  gap: 6.296vh;
  flex-direction: column;
`;

const Logo = styled.span`
  padding: 9vh 0;
  margin: 0 auto;
  color: ${(props) => props.theme.color.blue};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.title1};
`;
