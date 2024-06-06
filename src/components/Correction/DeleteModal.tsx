import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../../store';
import { removeAsync } from '../../store/correctionTable';
import Button from '../common/Button';

function DeleteModal({
  id,
  isVisible,
  setIsVisible,
}: {
  id: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    isVisible && (
      <DeleteModalLayout>
        <p>정말 삭제하시겠습니까?</p>
        <DeleteModalNav>
          <Button
            size="basic"
            color="primary"
            onClick={() => {
              dispatch(removeAsync(id));
              setIsVisible(false);
            }}
          >
            삭제
          </Button>
          <Button
            size="basic"
            color="white"
            onClick={() => {
              setIsVisible(false);
            }}
          >
            취소
          </Button>
        </DeleteModalNav>
      </DeleteModalLayout>
    )
  );
}

export default DeleteModal;

const DeleteModalLayout = styled.section`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem;
  background-color: ${(props) => props.theme.color.pureWhite};
  border: 1px solid ${(props) => props.theme.color.primary};
  border-radius: 10px;
  z-index: 10;
  & p {
    font-size: ${(props) => props.theme.fontSize.title1};
  }
`;

const DeleteModalNav = styled.nav`
  display: flex;
  gap: 1rem;
  align-self: center;
`;