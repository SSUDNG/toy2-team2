import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { SalaryTable } from '../store/salaryTable';
import Button from '../components/common/Button';
import Table from '../components/common/Table';
import { SALARY_TABLE_COLUMNS } from '../constants';

interface TableType extends SalaryTable {
  note: React.ReactElement;
}

function CorrectButton() {
  return (
    <Button size="basic" color="white">
      정정 신청
    </Button>
  );
}

function Salary() {
  const tableData = useSelector(
    (state: RootState) => state.salaryTable.table,
  ).map((data: SalaryTable) => {
    return { ...data, note: <CorrectButton /> };
  });

  return (
    <SalaryLayout>
      <h2>급여 내역</h2>
      <Table<TableType>
        columnName={SALARY_TABLE_COLUMNS}
        data={tableData}
        order={['month', 'gross', 'bonus', 'tax', 'net', 'note']}
        minWidth="73.7vw"
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
