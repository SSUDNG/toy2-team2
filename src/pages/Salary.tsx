import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '../store';
import { SalaryTable, initializeSalaryAsync } from '../store/salaryTable';
import Table from '../components/common/Table';
import CorrectionButton from '../components/Salary/CorrectionButton';
import { SALARY_TABLE_COLUMNS } from '../constants';

interface TableType extends SalaryTable {
  note: React.ReactElement;
}

function Salary() {
  const userId = sessionStorage.getItem('id');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      dispatch(initializeSalaryAsync(userId));
    }
  }, [userId, dispatch]);

  const tableData = useSelector(
    (state: RootState) => state.salaryTable.table,
  ).map((data: SalaryTable) => {
    return { ...data, note: <CorrectionButton month={data.month} /> };
  });

  return (
    <SalaryLayout>
      <h2>급여 내역</h2>
      <Table<TableType>
        columnName={SALARY_TABLE_COLUMNS}
        data={tableData}
        order={['month', 'gross', 'bonus', 'tax', 'net', 'note']}
        minWidth="73.7vw"
        keys={SALARY_TABLE_COLUMNS}
      />
    </SalaryLayout>
  );
}

export default Salary;

export const SalaryLayout = styled.section`
  width: fit-content;
  margin: 0 auto;
  & h2 {
    font-size: ${(props) => props.theme.fontSize.title3};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    margin-bottom: 1.5rem;
  }
`;
