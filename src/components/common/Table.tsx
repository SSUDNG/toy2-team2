import styled from 'styled-components';
import TableRow, { TableRowItem } from './TableRow';

type TableData<T> = Record<keyof T, TableRowItem>;

interface TableProps<T> {
  columnName: string[];
  data: TableData<T>[];
  keys: string[];
  order?: (keyof T)[];
  minWidth?: string;
}

function Table<T>({
  columnName,
  data,
  order,
  keys,
  minWidth = 'fit-content',
}: TableProps<T>) {
  return (
    <TableLayout
      $column={columnName.length}
      $row={data.length + 1}
      $minWidth={minWidth}
    >
      <TableRow isHeader column={columnName} keys={columnName} />
      {data.map((row, index) => {
        return (
          <TableRow
            isTail={data.length - 1 === index}
            column={
              order ? order.map((column) => row[column]) : Object.values(row)
            }
            keys={columnName}
            key={keys[index]}
          />
        );
      })}
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
  align-items: center;
  row-gap: 1px;
`;
