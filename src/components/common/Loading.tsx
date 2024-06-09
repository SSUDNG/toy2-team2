import styled, { keyframes } from 'styled-components';

function Loading() {
  return (
    <LoadingWrapper>
      <Spinner />
    </LoadingWrapper>
  );
}

export default Loading;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${(props) => props.theme.color.black};
  border-top: 4px solid ${(props) => props.theme.color.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
