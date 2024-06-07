import styled from 'styled-components';

function NotFound() {
  return (
    <Layout>
      <WarningBox>존재하지 않는 페이지 입니다.</WarningBox>
    </Layout>
  );
}

export default NotFound;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const WarningBox = styled.div`
  font-size: ${(props) => props.theme.fontSize.title2};
`;
