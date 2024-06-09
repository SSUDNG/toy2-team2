import styled from 'styled-components';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
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
      <Navigator onClick={onPrevMonth}>
        <MdOutlineArrowBackIos />
      </Navigator>
      <Button size="basic" color="primary" type="button" onClick={onToday}>
        오늘
      </Button>
      <Navigator onClick={onNextMonth}>
        <MdOutlineArrowForwardIos />
      </Navigator>
    </NavigatorWrapper>
  );
}

export default MonthNavigator;

const NavigatorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Navigator = styled.div`
  cursor: pointer;
  transition: all 200ms;
  font-size: ${(props) => props.theme.fontSize.title1};
  color: ${(props) => props.theme.color.gray};

  &:hover {
    color: ${(props) => props.theme.color.darkgray};
    transform: translateY(-2px);
  }

  & svg {
    display: flex;
    align-items: center;
  }
`;
