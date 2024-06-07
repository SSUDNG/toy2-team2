import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

interface MonthNavigatorProps {
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

function MonthNavigator({
  onPrevMonth,
  onNextMonth,
  onToday,
}: MonthNavigatorProps) {
  return (
    <NavigatorWrapper>
      <Button size="basic" color="white" type="button" onClick={onPrevMonth}>
        {'<'}
      </Button>
      <Button size="basic" color="primary" type="button" onClick={onToday}>
        오늘
      </Button>
      <Button size="basic" color="white" type="button" onClick={onNextMonth}>
        {'>'}
      </Button>
    </NavigatorWrapper>
  );
}

export default MonthNavigator;

const NavigatorWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 10px;
`;
