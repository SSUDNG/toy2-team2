import styled from 'styled-components';

function Day({ date, $isToday }: { date: string; $isToday: boolean }) {
  return <DayWrapper $isToday={$isToday}>{date.split(' ')[2]}</DayWrapper>;
}

export default Day;

const DayWrapper = styled.div<{ $isToday: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  font-size: ${(props) => props.theme.fontSize.body1};
  background-color: ${(props) => props.theme.color.white};
`;
