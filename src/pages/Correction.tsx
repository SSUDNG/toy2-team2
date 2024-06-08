import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
  CorrectionTable,
  initializeCorrectionAsync,
} from '../store/correctionTable';
import { SalaryLayout as CorrectionLayout, LoadingLayout } from './Salary';
import PositionedLoading from '../components/common/PositionedLoading';
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
  const dispatch = useDispatch<AppDispatch>();
  const isFetched = useSelector(
    (state: RootState) => state.correctionTable.isFetched,
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isFetched) {
      setIsLoading(true);
      dispatch(initializeCorrectionAsync()).then(() => {
        setIsLoading(false);
      });
    }
  }, [isFetched, dispatch]);

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
      {isLoading ? (
        <LoadingLayout>
          <PositionedLoading position="center" />
        </LoadingLayout>
      ) : (
        <Table<Omit<TableType, 'irregular'> & { irregular: React.ReactElement }>
          columnName={CORRECTION_TABLE_COLUMNS}
          data={tableData}
          order={[
            'date',
            'month',
            'reason',
            'pay',
            'irregular',
            'note',
            'progress',
          ]}
          minWidth="85.573vw"
          keys={CORRECTION_TABLE_COLUMNS}
        />
      )}
    </CorrectionLayout>
  );
}

export default Correction;
