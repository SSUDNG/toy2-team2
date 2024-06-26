import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Day from '../components/Calendar/Day';
import EventBar from '../components/Calendar/EventBar';
import MonthNavigator from '../components/Calendar/MonthNavigator';
import EventModal from '../components/Calendar/EventModal';
import { RootState, AppDispatch } from '../store';
import { fetchEvents, Event as EventType } from '../store/calendar';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

function Calendar() {
  const dispatch: AppDispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const events = useSelector((state: RootState) => state.calendar.events);
  const eventStatus = useSelector((state: RootState) => state.calendar.status);
  const error = useSelector((state: RootState) => state.calendar.error);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

  useEffect(() => {
    const isLogin = sessionStorage.getItem('isLogin');
    if (!(isLogin && isLogin.length)) {
      return;
    }

    if (eventStatus === 'idle') {
      dispatch(fetchEvents());
    }
  }, [eventStatus, dispatch]);

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  const currentDateIterator = new Date(startOfMonth);
  currentDateIterator.setDate(
    currentDateIterator.getDate() - currentDateIterator.getDay(),
  );

  while (currentDateIterator <= endOfMonth || currentWeek.length < 7) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(new Date(currentDateIterator));
    currentDateIterator.setDate(currentDateIterator.getDate() + 1);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  function isToday(date: Date) {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  const onPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const onNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const onToday = () => {
    setCurrentDate(new Date());
  };

  const TitleMonth = `${String(currentDate.getMonth() + 1).padStart(2, '0')} `;
  const TitleYear = `${currentDate.getFullYear()}`;
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const renderEventBars = (week: Date[]) => {
    const rows: EventType[][] = [];
    const weekStart = new Date(week[0]);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(week[6]);
    weekEnd.setHours(23, 59, 59, 999);

    const weekEvents = events
      .filter((event) => {
        const startDate = new Date(event.startDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(event.endDate);
        endDate.setHours(23, 59, 59, 999);
        return weekStart <= endDate && weekEnd >= startDate;
      })
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );

    weekEvents.forEach((event) => {
      let added = false;
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
        if (
          !rows[rowIndex].some(
            (e) =>
              new Date(e.startDate).getTime() <=
                new Date(event.endDate).getTime() &&
              new Date(e.endDate).getTime() >=
                new Date(event.startDate).getTime(),
          )
        ) {
          rows[rowIndex].push(event);
          added = true;
          break;
        }
      }
      if (!added) {
        rows.push([event]);
      }
    });

    const renderRow = (row: EventType[]) =>
      row.map((event) => {
        const eventStartDate = new Date(event.startDate);
        eventStartDate.setHours(0, 0, 0, 0);
        const eventEndDate = new Date(event.endDate);
        eventEndDate.setHours(23, 59, 59, 999);
        const span = Math.min(
          (eventEndDate.getTime() - eventStartDate.getTime()) /
            (1000 * 60 * 60 * 24),
          (weekEnd.getTime() - eventStartDate.getTime()) /
            (1000 * 60 * 60 * 24),
          (eventEndDate.getTime() - weekStart.getTime()) /
            (1000 * 60 * 60 * 24),
          7,
        );
        const offset = Math.max(
          (eventStartDate.getTime() - weekStart.getTime()) /
            (1000 * 60 * 60 * 24),
          0,
        );

        return (
          <EventBar
            key={event.id}
            event={event}
            span={span}
            offset={offset}
            onClick={() => setSelectedEvent(event)}
          />
        );
      });

    return rows.flatMap((row) => (
      <EventRow key={row.map((event) => event.id).join('-')}>
        {renderRow(row)}
      </EventRow>
    ));
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <Title>
          <Year>{TitleYear}</Year>
          <Month>{TitleMonth}</Month>
        </Title>

        <AddButton
          size="basic"
          color="primary"
          type="button"
          onClick={() => setIsAddEventModalOpen(true)}
        >
          이벤트 추가
        </AddButton>
      </CalendarHeader>
      <MonthNavigator
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onToday={onToday}
      />
      <WeekDays>
        {weekDays.map((day) => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDays>
      {eventStatus === 'loading' && <Loading />}
      {eventStatus === 'failed' && <div>Error: {error}</div>}
      {weeks.map((week) => (
        <WeekWrapper key={week[0].toString()}>
          <WeekGrid>
            {week.map((day) => (
              <GridItem key={day.toString()} $isToday={isToday(day)} />
            ))}
          </WeekGrid>
          <WeekHeader>
            {week.map((day) => (
              <DayCell
                key={day.toString()}
                $isCurrentMonth={day.getMonth() === currentDate.getMonth()}
              >
                <Day date={day.toDateString()} $isToday={isToday(day)} />
              </DayCell>
            ))}
          </WeekHeader>
          <EventContainer>{renderEventBars(week)}</EventContainer>
        </WeekWrapper>
      ))}
      {isAddEventModalOpen && (
        <EventModal type="add" onClose={() => setIsAddEventModalOpen(false)} />
      )}
      {selectedEvent && (
        <EventModal
          type="edit"
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </CalendarWrapper>
  );
}

export default Calendar;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 73.7vw;
  margin: 2rem auto;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Year = styled.div`
  font-size: ${(props) => props.theme.fontSize.title3};
  color: ${(props) => props.theme.color.dimgray};
`;

const Month = styled.div`
  font-size: ${(props) => props.theme.fontSize.title1};
  color: ${(props) => props.theme.color.darkgray};
`;

const AddButton = styled(Button)`
  position: absolute;
  right: 0;
  width: 10rem;
`;

const WeekDays = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.color.gray};
  border: 1px solid ${(props) => props.theme.color.pureWhite};
  border-radius: 8px 8px 0 0;
`;

const WeekDay = styled.div`
  flex: 1;
  padding: 0.5rem;
  color: ${(props) => props.theme.color.darkgray};
  &:first-child {
    color: ${(props) => props.theme.color.red};
  }
`;

const WeekWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 8rem;
  position: relative;
  background-color: ${(props) => props.theme.color.white};
`;

const WeekGrid = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const GridItem = styled.div<{ $isToday: boolean }>`
  border: ${(props) =>
    props.$isToday
      ? `2px solid ${props.theme.color.primary}`
      : `1px solid ${props.theme.color.pureWhite}`};
`;

const WeekHeader = styled.div`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.color.white};
`;

const DayCell = styled.div<{ $isCurrentMonth: boolean }>`
  flex: 1;
  background-color: ${(props) => props.theme.color.white};
  color: ${({ $isCurrentMonth }) => ($isCurrentMonth ? 'black' : 'gray')};
  &:first-child div {
    color: ${(props) => props.theme.color.red};
  }
`;

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 2;
`;

const EventRow = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  position: relative;
  margin-bottom: 0.1rem;
`;
