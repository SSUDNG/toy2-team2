import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import IrregularWrapper from '../components/Correction/IrregularWrapper';
import { SalaryLayout as CorrectionLayout } from './Salary';

interface TableType {
  number: number;
  date: string;
  reason: string;
  pay: number;
  irregular: number;
  note: React.ReactElement;
  progress: React.ReactElement;
}

const TABLE_COLUMNS = [
  'No',
  '신청일',
  '사유',
  '급여',
  '비정상급여',
  '비고',
  '상태',
];
const TABLE_DATA: TableType[] = [
  {
    number: 1,
    date: '24.05.28',
    reason: '야근수당 초과 지급',
    pay: 3500000,
    irregular: 29700,
    note: (
      <Button size="basic" color="red">
        삭제
      </Button>
    ),
    progress: (
      <Badge size="basic" color="yellow">
        처리 중
      </Badge>
    ),
  },
  {
    number: 2,
    date: '24.04.28',
    reason: '휴일 수당 미지급',
    pay: 3500000,
    irregular: -127200,
    note: (
      <Button size="basic" color="red">
        삭제
      </Button>
    ),
    progress: (
      <Badge size="basic" color="bluegreen">
        처리 완료
      </Badge>
    ),
  },
  {
    number: 3,
    date: '24.03.28',
    reason: '휴일 수당 미지급',
    pay: 3500000,
    irregular: -127200,
    note: (
      <Button size="basic" color="red">
        삭제
      </Button>
    ),
    progress: (
      <Badge size="basic" color="bluegreen">
        처리 완료
      </Badge>
    ),
  },
  {
    number: 4,
    date: '24.02.28',
    reason: '휴일 수당 미지급',
    pay: 3500000,
    irregular: -127200,
    note: (
      <Button size="basic" color="red">
        삭제
      </Button>
    ),
    progress: (
      <Badge size="basic" color="bluegreen">
        처리 완료
      </Badge>
    ),
  },
  {
    number: 5,
    date: '24.01.28',
    reason: '휴일 수당 미지급',
    pay: 3500000,
    irregular: -127200,
    note: (
      <Button size="basic" color="red">
        삭제
      </Button>
    ),
    progress: (
      <Badge size="basic" color="bluegreen">
        처리 완료
      </Badge>
    ),
  },
];

function Correction() {
  return (
    <CorrectionLayout>
      <h2>정정 내역</h2>
      <Table<Omit<TableType, 'irregular'> & { irregular: React.ReactElement }>
        columnName={TABLE_COLUMNS}
        data={TABLE_DATA.map((data: TableType) => {
          return {
            ...data,
            irregular: <IrregularWrapper>{data.irregular}</IrregularWrapper>,
          };
        })}
        minWidth="85.573vw"
      />
    </CorrectionLayout>
  );
}

export default Correction;
