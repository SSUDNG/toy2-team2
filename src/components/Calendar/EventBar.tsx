import React from 'react';
import styled from 'styled-components';

interface EventBarProps {
  name: string;
  color: string;
}

const Bar = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  color: white;
  width: 100%;
  text-align: center;
  margin: 2px 0;
`;

function EventBar({ name, color }: EventBarProps) {
  return <Bar color={color}>{name}</Bar>;
}

export default EventBar;
