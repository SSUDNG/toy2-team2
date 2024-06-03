import styled from 'styled-components';
import TableRow, { TableRowItem } from './TableRow';

type TableData<T> = Record<keyof T, TableRowItem> & T;

interface TableProps<T> {
  columnName: string[];
  data: TableData<T>[];
  minWidth?: string;
}

function Table<T>({
  columnName,
  data,
  minWidth = 'fit-content',
}: TableProps<T>) {
  return (
    <TableLayout
      $column={columnName.length}
      $row={data.length + 1}
      $minWidth={minWidth}
    >
      <TableRow isHeader column={columnName} />
      {data.map((row, index) => (
        <TableRow
          isTail={data.length - 1 === index}
          column={Object.values(row)}
          key={JSON.stringify(row)}
        />
      ))}
    </TableLayout>
  );
}

export default Table;

const TableLayout = styled.article<{
  $column: number;
  $row: number;
  $minWidth: string;
}>`
  width: fit-content;
  min-width: ${(props) => props.$minWidth};
  display: grid;
  grid-template-columns: repeat(${(props) => props.$column}, auto);
  row-gap: 1px;
  align-items: center;
`;
