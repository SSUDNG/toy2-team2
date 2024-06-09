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
  offset: number;
  onClick: () => void;
}

function EventBar({ event, span, offset, onClick }: EventBarProps) {
  return (
    <Bar color={event.color} span={span} offset={offset} onClick={onClick}>
      <EventName>{event.name}</EventName>
    </Bar>
  );
}

export default EventBar;

const Bar = styled.div<{ color: string; span: number; offset: number }>`
  position: absolute;
  display: flex;
  left: ${(props) => props.offset * (100 / 7)}%;
  width: calc(${(props) => props.span * (100 / 7)}% - 1rem);
  height: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem 1rem 1rem 0.5rem;
  background-color: ${(props) => props.color};
  color: ${(props) => props.theme.color.pureWhite};
  cursor: pointer;
`;

const EventName = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
