import styled from 'styled-components';

interface MonthNavigatorProps {
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function MonthNavigator({ onPrevMonth, onNextMonth }: MonthNavigatorProps) {
  return (
    <NavigatorWrapper>
      <Button onClick={onPrevMonth}>{'<'}</Button>
      <Button onClick={onNextMonth}>{'>'}</Button>
    </NavigatorWrapper>
  );
}

export default MonthNavigator;

const NavigatorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background-color: #f5f5f5;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
