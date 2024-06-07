import { useCallback } from 'react';
import styled, { css } from 'styled-components';

export type TableRowItem =
  | string
  | number
  | boolean
  | Date
  | React.ReactElement;

export interface TableRowProps {
  isHeader?: boolean;
  isTail?: boolean;
  column: TableRowItem[];
  keys: string[];
}

function TableRow({
  isHeader = false,
  isTail = false,
  column,
  keys,
}: TableRowProps) {
  const generateChildren = useCallback((columnItem: TableRowItem) => {
    if (
      typeof columnItem === 'string' ||
      typeof columnItem === 'number' ||
      typeof columnItem === 'boolean'
    ) {
      return (
        <TableItemText>
          {typeof columnItem === 'number'
            ? columnItem.toLocaleString()
            : columnItem}
        </TableItemText>
      );
    }
    if (columnItem instanceof Date) {
      return (
        <TableItemText>
          {columnItem.getFullYear() % 100}.{columnItem.getMonth() < 9 && '0'}
          {columnItem.getMonth() + 1}.{columnItem.getDate() < 10 && '0'}
          {columnItem.getDate()}
        </TableItemText>
      );
    }
    return columnItem;
  }, []);

  return (
    <>
      {column.map((columnItem: TableRowItem, index) => (
        <TableItem
          $header={isHeader}
          $tail={isTail}
          $first={index === 0}
          $last={index === column.length - 1}
          key={keys[index]}
        >
          {generateChildren(columnItem)}
        </TableItem>
      ))}
    </>
  );
}

export default TableRow;

const TableItem = styled.div<{
  $header: boolean;
  $tail: boolean;
  $first: boolean;
  $last: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  align-self: stretch;
  ${(props) =>
    props.$header
      ? css`
          background-color: ${props.theme.color.primary};
          color: ${props.theme.color.white};
          font-weight: ${props.theme.fontWeight.bold};
          border-radius: ${props.$first && '8px 0 0 0'}
            ${props.$last && '0 8px 0 0'};
        `
      : css`
          background-color: ${props.theme.color.pureWhite};
          color: ${props.theme.color.darkgray};
          font-size: ${props.theme.fontSize.body2};
          ${props.$tail &&
          css`
            border-radius: ${props.$first && '0 0 0 8px'}
              ${props.$last && '0 0 8px 0'};
          `}
        `}
`;

const TableItemText = styled.span``;
