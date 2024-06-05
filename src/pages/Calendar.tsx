import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Day from '../components/Calendar/Day';
import EventBar from '../components/Calendar/EventBar';
import MonthNavigator from '../components/Calendar/MonthNavigator';
import AddEventModal from '../components/Calendar/AddEventModal';
import EventModal from '../components/Calendar/EventModal';
import { RootState, AppDispatch } from '../store';
import {
  fetchEvents,
  updateEvent,
  deleteEvent,
  Event as EventType,
} from '../store/calendar';
import Button from '../components/common/Button';

function Calendar() {
  const dispatch: AppDispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const events = useSelector((state: RootState) => state.calendar.events);
  const eventStatus = useSelector((state: RootState) => state.calendar.status);
  const error = useSelector((state: RootState) => state.calendar.error);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

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

  const startDayOfWeek = (startOfMonth.getDay() + 7) % 7;
  const endDayOfWeek = (endOfMonth.getDay() + 7) % 7;

  const prevMonthDays = [];
  const prevMonthLastDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0,
  ).getDate();

  for (let i = startDayOfWeek - 1; i >= 0; i -= 1) {
    prevMonthDays.unshift(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        prevMonthLastDate - (startDayOfWeek - 1 - i),
      ),
    );
  }

  const nextMonthDays = [];
  for (let i = 1; i < 7 - endDayOfWeek; i += 1) {
    nextMonthDays.push(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i),
    );
  }

  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];

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

  const handleEventUpdate = (updatedEvent: EventType) => {
    dispatch(updateEvent(updatedEvent));
  };

  const handleEventDelete = (eventId: string) => {
    dispatch(deleteEvent(eventId));
  };

  const monthTitle = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const renderEventBars = (day: Date, dayIndex: number) => {
    const dayWithoutTime = new Date(day);
    dayWithoutTime.setHours(0, 0, 0, 0);

    const rows: EventType[][] = [];

    const dayEvents = events
      .filter((event) => {
        const startDate = new Date(event.startDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(event.endDate);
        endDate.setHours(0, 0, 0, 0);
        return dayWithoutTime >= startDate && dayWithoutTime <= endDate;
      })
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );

    dayEvents.forEach((event) => {
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

    const renderRow = (row: EventType[], rowIndex: number) =>
      row.map((event, index) => {
        const key = `row-${dayWithoutTime.getTime()}-${rowIndex}-${index}`;
        const span = Math.min(
          (new Date(event.endDate).getTime() -
            new Date(event.startDate).getTime()) /
            (1000 * 60 * 60 * 24) +
            1,
          allDays.length - dayIndex,
        );
        return (
          <Row key={key}>
            <EventBar
              key={event.id}
              event={event}
              span={span}
              showName={
                dayWithoutTime.toDateString() ===
                new Date(event.startDate).toDateString()
              }
              onClick={() => setSelectedEvent(event)}
            />
          </Row>
        );
      });

    return rows.flatMap((row, rowIndex) => renderRow(row, rowIndex));
  };

  return (
    <CalendarWrapper>
      <MonthTitle>{monthTitle}</MonthTitle>
      <MonthNavigator onPrevMonth={onPrevMonth} onNextMonth={onNextMonth} />
      <Button
        size="basic"
        color="primary"
        type="button"
        onClick={() => setIsAddEventModalOpen(true)}
      >
        이벤트 추가
      </Button>
      <WeekDays>
        {weekDays.map((day) => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDays>
      {eventStatus === 'loading' && <div>Loading...</div>}
      {eventStatus === 'failed' && <div>Error: {error}</div>}
      <DaysGrid>
        {allDays.map((day, index) => (
          <DayCell
            key={day.toString()}
            isCurrentMonth={day.getMonth() === currentDate.getMonth()}
          >
            <Day date={day.toDateString()} isToday={isToday(day)} />
            <EventContainer>{renderEventBars(day, index)}</EventContainer>
          </DayCell>
        ))}
      </DaysGrid>
      {isAddEventModalOpen && (
        <AddEventModal onClose={() => setIsAddEventModalOpen(false)} />
      )}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdate={handleEventUpdate}
          onDelete={handleEventDelete}
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
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  width: 100%;
  background-color: #ccc;
`;

const DayCell = styled.div<{ isCurrentMonth: boolean }>`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 12rem;
  color: ${({ isCurrentMonth }) => (isCurrentMonth ? 'black' : 'gray')};
`;

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
`;

const WeekDays = styled.div`
  display: flex;
  width: 100%;
  background-color: #f0f0f0;
`;

const WeekDay = styled.div`
  flex: 1;
  text-align: center;
  padding: 8px 0;
`;

const MonthTitle = styled.h2`
  margin-bottom: 0;
`;
