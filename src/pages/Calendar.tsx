import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Day from '../components/Calendar/Day';
import EventBar from '../components/Calendar/EventBar';
import MonthNavigator from '../components/Calendar/MonthNavigator';
import AddEventModal from '../components/Calendar/AddEventModal';
import EventModal from '../components/Calendar/EventModal';
import { RootState, AppDispatch } from '../store';
import { fetchEvents } from '../modules/calendar';

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  width: 100%;
  background-color: #ccc;
`;

const DayCell = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  height: 100px;
`;

const EventContainer = styled.div`
  width: 100%;
`;

function Calendar() {
  const dispatch: AppDispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const events = useSelector((state: RootState) => {
    console.log(state); // RootState 전체를 확인
    console.log(state.calendar); // calendar 슬라이스가 올바르게 포함되어 있는지 확인
    return state.calendar.events;
  });
  const eventStatus = useSelector((state: RootState) => state.calendar.status);
  const error = useSelector((state: RootState) => state.calendar.error);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
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

  const daysInMonth = [];
  for (let i = startOfMonth.getDate(); i <= endOfMonth.getDate(); i += 1) {
    daysInMonth.push(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
    );
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

  function getEventsForDay(date: Date) {
    return events.filter((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      return date >= startDate && date <= endDate;
    });
  }

  return (
    <CalendarWrapper>
      <MonthNavigator onPrevMonth={onPrevMonth} onNextMonth={onNextMonth} />
      {eventStatus === 'loading' && <div>Loading...</div>}
      {eventStatus === 'failed' && <div>Error: {error}</div>}
      <DaysGrid>
        {daysInMonth.map((day) => (
          <DayCell key={day.toString()}>
            <Day date={day.toDateString()} isToday={isToday(day)} />
            <EventContainer>
              {getEventsForDay(day).map((event) => (
                <EventBar
                  key={event.id}
                  name={event.name}
                  color={event.color}
                />
              ))}
            </EventContainer>
          </DayCell>
        ))}
      </DaysGrid>
      <AddEventModal />
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </CalendarWrapper>
  );
}

export default Calendar;
