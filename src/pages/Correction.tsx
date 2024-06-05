import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { SalaryLayout as CorrectionLayout } from './Salary';
import { CorrectionTable, removeAsync } from '../store/correctionTable';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import IrregularWrapper from '../components/Correction/IrregularWrapper';
import { CORRECTION_TABLE_COLUMNS, PROGRESS_VALUES } from '../constants';

interface TableType extends Omit<CorrectionTable, 'date' | 'progress'> {
  date: Date;
  note: React.ReactElement;
  progress: React.ReactElement;
}

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
            color="red"
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

function DeleteButton({ id }: { id: string }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Button
        size="basic"
        color="red"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        삭제
      </Button>
      <DeleteModal
        id={id}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
      />
    </>
  );
}

type Progress = Pick<CorrectionTable, 'progress'> &
  (typeof PROGRESS_VALUES)[number];

function ProgressBadge({ progress }: { progress: Progress }) {
  if (progress === PROGRESS_VALUES[0]) {
    return (
      <Badge size="basic" color="yellow">
        처리 중
      </Badge>
    );
  }
  return (
    <Badge size="basic" color="bluegreen">
      처리 완료
    </Badge>
  );
}

function Correction() {
  const tableData = useSelector(
    (state: RootState) => state.correctionTable.table,
  ).map((data: CorrectionTable) => {
    return {
      ...data,
      date: new Date(data.date),
      irregular: <IrregularWrapper>{data.irregular}</IrregularWrapper>,
      note: <DeleteButton id={data.id} />,
      progress: <ProgressBadge progress={data.progress} />,
    };
  });

  return (
    <CorrectionLayout>
      <h2>정정 내역</h2>
      <Table<Omit<TableType, 'irregular'> & { irregular: React.ReactElement }>
        columnName={CORRECTION_TABLE_COLUMNS}
        data={tableData}
        order={[
          'month',
          'date',
          'reason',
          'pay',
          'irregular',
          'note',
          'progress',
        ]}
        minWidth="85.573vw"
      />
    </CorrectionLayout>
  );
}

export default Correction;
