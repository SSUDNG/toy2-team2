import React from 'react';
import styled from 'styled-components';

const Bar = styled.div<{ color: string; span: number }>`
  display: flex;
  background-color: ${(props) => props.color};
  width: 100%;
  color: white;
  padding: 5px;
  cursor: pointer;
  grid-column: span ${(props) => props.span};
  margin-bottom: 2px;
  height: 1rem;
  line-height: 1rem;
`;

interface EventBarProps {
  event: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    color: string;
  };
  span: number;
  showName: boolean;
  onClick: () => void;
}

function EventBar({ event, span, showName, onClick }: EventBarProps) {
  return (
    <Bar color={event.color} span={span} onClick={onClick}>
      {showName && event.name}
    </Bar>
  );
}

export default EventBar;
