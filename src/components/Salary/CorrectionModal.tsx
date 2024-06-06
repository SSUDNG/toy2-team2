import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../../store';
import { CorrectionTable, appendAsync } from '../../store/correctionTable';
import Input from '../common/Input';
import Button from '../common/Button';

function CorrectionModal({
  month,
  isVisible,
  setIsVisible,
}: {
  month: number;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<Pick<CorrectionTable, 'reason' | 'pay' | 'irregular'>>();
  const dispatch = useDispatch<AppDispatch>();

  const appendData = (
    data: Pick<CorrectionTable, 'reason' | 'pay' | 'irregular'>,
  ) => {
    const newData: CorrectionTable = {
      ...data,
      month,
      date: new Date().valueOf(),
      progress: 'in progress',
    };
    dispatch(appendAsync(newData));
    setIsVisible(false);
  };

  return (
    isVisible && (
      <>
        <CorrectionModalBackground
          onClick={() => {
            setIsVisible(false);
          }}
        />
        <CorrectionModalLayout>
          <h3>정정 신청</h3>
          <CorrectionModalForm
            onSubmit={handleSubmit((data) => appendData(data))}
          >
            <CorrectionModalLabel>신청 월</CorrectionModalLabel>
            <Input
              type="text"
              value={`${month}월`}
              bordercolor="gray"
              placeholdercolor="gray"
              fontSize="1rem"
              readOnly
            />
            <CorrectionModalLabel>사유</CorrectionModalLabel>
            <Input
              type="text"
              outlinecolor="primary"
              bordercolor="gray"
              required
              placeholder="사유를 입력하세요"
              placeholdercolor="gray"
              register={register('reason')}
              fontSize="1rem"
            />
            <CorrectionModalLabel>급여</CorrectionModalLabel>
            <Input
              type="text"
              outlinecolor="primary"
              bordercolor="gray"
              required
              placeholder="급여를 입력하세요"
              placeholdercolor="gray"
              register={register('pay')}
              fontSize="1rem"
            />
            <CorrectionModalLabel>비정상급여</CorrectionModalLabel>
            <Input
              type="text"
              outlinecolor="primary"
              bordercolor="gray"
              required
              placeholder="비정상급여를 입력하세요 (수령 금액보다 적을경우 -를 붙여 기재)"
              placeholdercolor="gray"
              register={register('irregular')}
              fontSize="1rem"
            />
            <CorrectionModalNav>
              <Button size="basic" color="primary" type="submit">
                신청
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
            </CorrectionModalNav>
          </CorrectionModalForm>
        </CorrectionModalLayout>
      </>
    )
  );
}

export default CorrectionModal;

const CorrectionModalLayout = styled.section`
  min-width: 83.75vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem;
  background-color: ${(props) => props.theme.color.background};
  border-radius: 10px;
  z-index: 10;
  & h3 {
    text-align: center;
    color: ${(props) => props.theme.color.blue};
    font-size: ${(props) => props.theme.fontSize.title1};
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }
`;

const CorrectionModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  & input:first-of-type {
    color: ${(props) => props.theme.color.dimgray};
  }
`;

const CorrectionModalLabel = styled.label`
  color: ${(props) => props.theme.color.blue};
  font-size: ${(props) => props.theme.fontSize.title4};
`;

const CorrectionModalNav = styled.nav`
  display: flex;
  gap: 1rem;
  align-self: center;
  margin-top: 3rem;
`;

const CorrectionModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
