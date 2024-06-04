import { useMemo } from 'react';
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
  const dataWithId = useMemo(() => {
    return data.map((item) => {
      return { ...item, id: crypto.getRandomValues(new Uint32Array(1)) };
    });
  }, []);

  return (
    <TableLayout
      $column={columnName.length}
      $row={data.length + 1}
      $minWidth={minWidth}
    >
      <TableRow isHeader column={columnName} />
      {dataWithId.map((row, index) => {
        const { id, ...newRow } = row;
        return (
          <TableRow
            isTail={data.length - 1 === index}
            column={Object.values(newRow)}
            key={id.join('')}
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
