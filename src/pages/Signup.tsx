import styled from 'styled-components';

function Signup() {
  return (
    <Layout>
      <Col>
        <InputBox>
          <span>ID</span>
          <Input />
        </InputBox>
      </Col>
    </Layout>
  );
}

export default Signup;

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

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 28.438vw;
  height: 4.63vh;
  border-color: ${(props) => props.theme.color.gray};
`;
