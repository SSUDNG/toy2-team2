import React from 'react';
import styled from 'styled-components';

interface EventBarProps {
  event: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    color: string;
  };
  span: number;
  onClick: () => void;
}

function EventBar({ event, span, onClick }: EventBarProps) {
  return (
    <Bar color={event.color} span={span} onClick={onClick}>
      {event.name}
    </Bar>
  );
}

export default EventBar;
const Bar = styled.div<{ color: string; span: number }>`
  display: flex;
  background-color: ${(props) => props.color};
  color: ${(props) => props.theme.color.pureWhite};
  grid-column: span ${(props) => props.span};
  width: 100%;
  padding: 5px 10px 5px;
  border-radius: 0.5rem 1rem 1rem 0.5rem;
  cursor: pointer;
  margin-bottom: 2px;
  height: 1rem;
`;
