import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '../store';
import { SalaryTable, initializeSalaryAsync } from '../store/salaryTable';
import Table from '../components/common/Table';
import PositionedLoading from '../components/common/PositionedLoading';
import CorrectionButton from '../components/Salary/CorrectionButton';
import { SALARY_TABLE_COLUMNS } from '../constants';

interface TableType extends SalaryTable {
  note: React.ReactElement;
}

function Salary() {
  const dispatch = useDispatch<AppDispatch>();
  const isFetched = useSelector(
    (state: RootState) => state.salaryTable.isFetched,
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isFetched) {
      setIsLoading(true);
      dispatch(initializeSalaryAsync()).then(() => {
        setIsLoading(false);
      });
    }
  }, [isFetched, dispatch]);

  const tableData = useSelector(
    (state: RootState) => state.salaryTable.table,
  ).map((data: SalaryTable) => {
    return { ...data, note: <CorrectionButton month={data.month} /> };
  });

  return (
    <SalaryLayout>
      <h2>급여 내역</h2>
      {isLoading ? (
        <LoadingLayout>
          <PositionedLoading position="center" />
        </LoadingLayout>
      ) : (
        <Table<TableType>
          columnName={SALARY_TABLE_COLUMNS}
          data={tableData}
          order={['month', 'gross', 'bonus', 'tax', 'net', 'note']}
          minWidth="73.7vw"
          keys={SALARY_TABLE_COLUMNS}
        />
      )}
    </SalaryLayout>
  );
}

export default Salary;

export const SalaryLayout = styled.section`
  min-width: 73.7vw;
  width: fit-content;
  margin: 0 auto;

  & h2 {
    font-size: ${(props) => props.theme.fontSize.title3};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    margin-bottom: 1.5rem;
  }
`;

export const LoadingLayout = styled.section`
  padding: 1rem 0;
`;
