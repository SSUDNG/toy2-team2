import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { initializeSalaryAsync } from '../../store/salaryTable';
import { initializeCorrectionAsync } from '../../store/correctionTable';
import { fetchEvents } from '../../store/calendar';

export default function ProfileInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = sessionStorage.getItem('id');
  const salaryTable = useSelector(
    (state: RootState) => state.salaryTable.table,
  );
  const correctionTable = useSelector(
    (state: RootState) => state.correctionTable.table,
  );
  const events = useSelector((state: RootState) => state.calendar.events);
  const currentMonth = new Date().getMonth();
  const currentMonthSalary = salaryTable.find(
    (salary) => salary.month === currentMonth,
  );
  const pendingCorrections = correctionTable.filter(
    (correction) => correction.progress === 'in progress',
  ).length;

  const [todayScheduleCount, setTodayScheduleCount] = useState(0);

  useEffect(() => {
    if (userId) {
      dispatch(initializeSalaryAsync());
      dispatch(initializeCorrectionAsync());
      dispatch(fetchEvents()).then(() => {});
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (events && events.length > 0) {
      const today = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
      const count = events.filter(({ startDate, endDate }) => {
        const eventStartDate = new Date(startDate);
        eventStartDate.setHours(0, 0, 0, 0);
        const eventEndDate = new Date(endDate);
        eventEndDate.setHours(23, 59, 59, 999);
        return today >= eventStartDate && today <= eventEndDate;
      }).length;
      setTodayScheduleCount(count);
    }
  }, [events]);

  return (
    <ProfileInfoStyle>
      <div>
        <div className="confirmWrapper">
          <div className="confirmEl">
            <Link to="/correction">
              결재 대기중인 내역
              <div className="confirmApply">{pendingCorrections}건</div>
            </Link>
          </div>
          <div className="confirmEl">
            <Link to="/salary">
              당월 예상 급여
              <div className="confirmPay">
                {currentMonthSalary
                  ? currentMonthSalary.net.toLocaleString()
                  : '데이터 없음'}
                원
              </div>
            </Link>
          </div>
          <div className="confirmEl">
            <Link to="/calendar">
              오늘의 일정
              <div className="confirmSchedule">{todayScheduleCount}건</div>
            </Link>
          </div>
        </div>
      </div>
    </ProfileInfoStyle>
  );
}

const ProfileInfoStyle = styled.div`
  .confirmWrapper {
    display: flex;
    justify-content: space-evenly;
  }

  .confirmEl {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 0 50px;
    padding: 2em;
    border-radius: 10px;
    background-color: ${(props) => props.theme.color.pureWhite};
    color: ${(props) => props.theme.color.black};
    font-size: ${(props) => props.theme.fontSize.title2};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    box-shadow: 0 3px 10px -5px;
  }

  .confirmApply,
  .confirmPay,
  .confirmSchedule {
    margin-top: 2rem;
    text-align: center;
  }

  .confirmApply {
    color: ${(props) => props.theme.color.yellow};
  }

  .confirmPay {
    color: ${(props) => props.theme.color.primary};
  }

  .confirmSchedule {
    color: ${(props) => props.theme.color.red};
  }
`;
