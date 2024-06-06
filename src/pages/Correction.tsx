import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { SalaryLayout as CorrectionLayout } from './Salary';
import { CorrectionTable } from '../store/correctionTable';
import Table from '../components/common/Table';
import IrregularWrapper from '../components/Correction/IrregularWrapper';
import DeleteButton from '../components/Correction/DeleteButton';
import ProgressBadge from '../components/Correction/ProgressBadge';
import { CORRECTION_TABLE_COLUMNS } from '../constants';

interface TableType extends Omit<CorrectionTable, 'date' | 'progress'> {
  date: Date;
  note: React.ReactElement;
  progress: React.ReactElement;
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
