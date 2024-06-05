import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { SalaryTable } from '../store/salaryTable/salaryTableSlice';
import Button from '../components/common/Button';
import Table from '../components/common/Table';

interface TableType extends SalaryTable {
  note: React.ReactElement;
}

const TABLE_COLUMNS = ['월', '급여', '보너스', '세금', '실수령', '비고'];

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
        columnName={TABLE_COLUMNS}
        data={tableData}
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
