import React from 'react';
import styled from 'styled-components';

const DayWrapper = styled.div<{ isToday: boolean }>`
  background-color: ${(props) => (props.isToday ? 'yellow' : 'white')};
  border: 1px solid #ccc;
  width: 100%;
  text-align: center;
`;

function Day({ date, isToday }: { date: string; isToday: boolean }) {
  return (
    <DayWrapper isToday={isToday}>
      {date.split(' ')[2]} {/* 일자만 표시 */}
    </DayWrapper>
  );
}

export default Day;
