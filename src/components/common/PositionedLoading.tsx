import styled, { css } from 'styled-components';
import Loading from './Loading';
import sb from '../../utils/styledBranch';

type Position = 'unfixed' | 'middle' | 'center' | 'rightunder';

interface PositionedLoadingProps {
  position: Position;
}

function PositionedLoading({ position }: PositionedLoadingProps) {
  return (
    <LoadingLayout $position={position}>
      <Loading />
    </LoadingLayout>
  );
}

export default PositionedLoading;

const LoadingLayout = styled.div<{ $position: Position }>`
  z-index: 100;
  & > div {
    width: fit-content;
    height: fit-content;
  }
  ${(props) =>
    sb(props.$position, {
      unfixed: css``,
      middle: css`
        & > div {
          width: 100%;
          margin: 0 auto;
        }
      `,
      center: css`
        & > div {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `,
      rightunder: css`
        & > div {
          position: fixed;
          right: 2vw;
          bottom: 2vh;
        }
      `,
    })}
`;
