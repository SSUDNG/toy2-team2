import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import schema from '../../schema/correctionSchema';
import { AppDispatch } from '../../store';
import { CorrectionTable, appendAsync } from '../../store/correctionTable';
import Input from '../common/Input';
import Button from '../common/Button';
import PositionedLoading from '../common/PositionedLoading';

type FormFields = z.infer<typeof schema>;

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
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch<AppDispatch>();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    reset();
    setIsVisible(false);
  }, [reset, setIsVisible]);

  const appendData = useCallback(
    async (data: FormFields) => {
      setIsSubmitting(true);
      const newData: Omit<CorrectionTable, 'id'> = {
        reason: data.reason,
        pay: parseInt(data.pay, 10),
        irregular: parseInt(data.irregular, 10),
        month,
        date: new Date().valueOf(),
        progress: 'in progress',
      };
      dispatch(appendAsync(newData))
        .then(() => {
          closeModal();
        })
        .catch((err) => {
          setError('root', {
            message: err.message,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    [closeModal, dispatch, month, setError],
  );

  return (
    isVisible && (
      <>
        <CorrectionModalBackground
          onClick={() => {
            closeModal();
          }}
        />
        <CorrectionModalLayout>
          <h3>정정 신청</h3>
          <CorrectionModalForm
            onSubmit={handleSubmit((data) => {
              appendData(data);
            })}
          >
            <CorrectionModalLabel>신청 월</CorrectionModalLabel>
            <Input
              type="text"
              value={`${month}월`}
              bordercolor="gray"
              placeholdercolor="gray"
              fontSize="1rem"
              readOnly
              disabled
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
            <CorrectionModalErrorMessage>
              {errors.reason && errors.reason.message}
            </CorrectionModalErrorMessage>
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
            <CorrectionModalErrorMessage>
              {errors.pay && errors.pay.message}
            </CorrectionModalErrorMessage>
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
            <CorrectionModalErrorMessage>
              {errors.irregular && errors.irregular.message}
            </CorrectionModalErrorMessage>
            <CorrectionModalNav>
              <Button
                size="basic"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                신청
              </Button>
              <Button
                size="basic"
                color="white"
                onClick={() => {
                  closeModal();
                }}
                disabled={isSubmitting}
              >
                취소
              </Button>
            </CorrectionModalNav>
            <CorrectionModalErrorMessage>
              {errors.root && errors.root.message}
            </CorrectionModalErrorMessage>
          </CorrectionModalForm>
        </CorrectionModalLayout>
        {isSubmitting && <PositionedLoading position="rightunder" />}
      </>
    )
  );
}

export default CorrectionModal;

const CorrectionModalLayout = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 83.75vw;
  padding: 2rem;
  background-color: ${(props) => props.theme.color.background};
  border-radius: 10px;
  z-index: 10;

  & h3 {
    text-align: center;
    font-size: ${(props) => props.theme.fontSize.title1};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.color.blue};
  }
`;

const CorrectionModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 1rem;

  & input:first-of-type {
    color: ${(props) => props.theme.color.dimgray};
    margin-bottom: 2rem;
  }
`;

const CorrectionModalLabel = styled.label`
  font-size: ${(props) => props.theme.fontSize.title4};
  margin-bottom: 0.25rem;
  color: ${(props) => props.theme.color.blue};
`;

const CorrectionModalErrorMessage = styled.label`
  display: block;
  height: 1rem;
  margin-bottom: 0.75rem;
  text-align: right;
  font-size: ${(props) => props.theme.fontSize.body1};
  color: ${(props) => props.theme.color.red};
`;

const CorrectionModalNav = styled.nav`
  display: flex;
  gap: 1rem;
  align-self: center;
  margin-top: 2rem;
`;

const CorrectionModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
