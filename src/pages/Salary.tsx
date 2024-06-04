import styled from 'styled-components';
import Button from '../components/common/Button';
import Table from '../components/common/Table';

interface TableType {
  month: number;
  gross: number;
  bonus: number;
  tax: number;
  net: number;
  note: React.ReactElement;
}

const TABLE_COLUMNS = ['월', '급여', '보너스', '세금', '실수령', '비고'];
const TABLE_DATA: TableType[] = [
  {
    month: 1,
    gross: 3500000,
    bonus: 1200000,
    tax: 930000,
    net: 3770000,
    note: (
      <Button size="basic" color="white">
        정정 신청
      </Button>
    ),
  },
  {
    month: 2,
    gross: 3500000,
    bonus: 0,
    tax: 930000,
    net: 2570000,
    note: (
      <Button size="basic" color="white">
        정정 신청
      </Button>
    ),
  },
  {
    month: 3,
    gross: 3500000,
    bonus: 0,
    tax: 930000,
    net: 2570000,
    note: (
      <Button size="basic" color="white">
        정정 신청
      </Button>
    ),
  },
  {
    month: 4,
    gross: 3500000,
    bonus: 0,
    tax: 930000,
    net: 2570000,
    note: (
      <Button size="basic" color="white">
        정정 신청
      </Button>
    ),
  },
  {
    month: 5,
    gross: 3500000,
    bonus: 0,
    tax: 930000,
    net: 2570000,
    note: (
      <Button size="basic" color="white">
        정정 신청
      </Button>
    ),
  },
];

function Salary() {
  return (
    <SalaryLayout>
      <h2>급여 내역</h2>
      <Table<TableType>
        columnName={TABLE_COLUMNS}
        data={TABLE_DATA}
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
