import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { SalaryLayout as CorrectionLayout } from './Salary';
import { CorrectionTable } from '../store/correctionTable';
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

function DeleteButton() {
  return (
    <Button size="basic" color="red">
      삭제
    </Button>
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
      note: <DeleteButton />,
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
