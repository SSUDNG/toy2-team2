import { useMemo } from 'react';
import styled from 'styled-components';
import TableRow, { TableRowItem } from './TableRow';

type TableData<T> = Record<keyof T, TableRowItem>;

interface TableProps<T> {
  columnName: string[];
  data: TableData<T>[];
  order?: (keyof T)[];
  minWidth?: string;
}

function Table<T>({
  columnName,
  data,
  order,
  minWidth = 'fit-content',
}: TableProps<T>) {
  const dataWithId = useMemo(() => {
    return data.map(() => crypto.getRandomValues(new Uint32Array(1)));
  }, [data]);

  return (
    <TableLayout
      $column={columnName.length}
      $row={data.length + 1}
      $minWidth={minWidth}
    >
      <TableRow isHeader column={columnName} />
      {data.map((row, index) => {
        return (
          <TableRow
            isTail={data.length - 1 === index}
            column={
              order ? order.map((column) => row[column]) : Object.values(row)
            }
            key={dataWithId[index].join('')}
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
  row-gap: 1px;
  align-items: center;
`;
