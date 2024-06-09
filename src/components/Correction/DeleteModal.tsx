import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../../store';
import { removeAsync } from '../../store/correctionTable';
import Button from '../common/Button';
import PositionedLoading from '../common/PositionedLoading';

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

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    isVisible && (
      <>
        <DeleteModalLayout>
          <p>{errorMessage.length ? errorMessage : '정말 삭제하시겠습니까?'}</p>
          <DeleteModalNav>
            <Button
              size="basic"
              color="primary"
              onClick={() => {
                setErrorMessage('');
                setIsSubmitting(true);
                dispatch(removeAsync(id))
                  .then(() => {
                    setIsVisible(false);
                  })
                  .catch((error) => {
                    setErrorMessage(error.message);
                  })
                  .finally(() => {
                    setIsSubmitting(false);
                  });
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
        {isSubmitting && <PositionedLoading position="rightunder" />}
      </>
    )
  );
}

export default DeleteModal;

const DeleteModalLayout = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding: 3rem;
  background-color: ${(props) => props.theme.color.pureWhite};
  border: 1px solid ${(props) => props.theme.color.primary};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & p {
    text-align: center;
    font-size: ${(props) => props.theme.fontSize.title1};
  }
`;

const DeleteModalNav = styled.nav`
  align-self: center;
  display: flex;
  gap: 1rem;
`;
