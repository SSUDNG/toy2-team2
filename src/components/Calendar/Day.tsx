import React from 'react';
import styled from 'styled-components';

function Day({ date, $isToday }: { date: string; $isToday: boolean }) {
  return <DayWrapper $isToday={$isToday}>{date.split(' ')[2]}</DayWrapper>;
}

export default Day;

const DayWrapper = styled.div<{ $isToday: boolean }>`
  background-color: ${(props) => props.theme.color.white};
  width: 100%;
  font-size: ${(props) => props.theme.fontSize.body1};
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;
