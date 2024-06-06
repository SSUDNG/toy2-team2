import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../../store';
import { removeAsync } from '../../store/correctionTable';
import Button from '../common/Button';
import { LoadingLayout } from '../Salary/CorrectionModal';
import Loading from '../common/Loading';

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    isVisible && (
      <>
        <DeleteModalLayout>
          <p>정말 삭제하시겠습니까?</p>
          <DeleteModalNav>
            <Button
              size="basic"
              color="primary"
              onClick={() => {
                setIsSubmitting(true);
                dispatch(removeAsync(id))
                  .then(() => {
                    setIsVisible(false);
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
        {isSubmitting && (
          <LoadingLayout>
            <Loading />
          </LoadingLayout>
        )}
      </>
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
    text-align: center;
    font-size: ${(props) => props.theme.fontSize.title1};
  }
`;

const DeleteModalNav = styled.nav`
  display: flex;
  gap: 1rem;
  align-self: center;
`;
