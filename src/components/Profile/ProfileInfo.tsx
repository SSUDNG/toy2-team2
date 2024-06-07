import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { initializeSalaryAsync } from '../../store/salaryTable';
import { initializeCorrectionAsync } from '../../store/correctionTable';
import { app } from '../../firebase/firebase';

export default function ProfileInfo() {
  const [todayScheduleCount, setTodayScheduleCount] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const userId = sessionStorage.getItem('id');
  const salaryTable = useSelector(
    (state: RootState) => state.salaryTable.table,
  );
  const correctionTable = useSelector(
    (state: RootState) => state.correctionTable.table,
  );
  const currentMonth = new Date().getMonth();
  const currentMonthSalary = salaryTable.find(
    (salary) => salary.month === currentMonth,
  );
  const pendingCorrections = correctionTable.filter(
    (correction) => correction.progress === 'in progress',
  ).length;

  useEffect(() => {
    const fetchTodayScheduleCount = async () => {
      try {
        if (userId) {
          const firestore = getFirestore(app);
          const eventsRef = collection(firestore, 'events', userId, 'event');
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          const todayString = `${year}-${month}-${day}`;

          const q = query(eventsRef, where('startDate', '==', todayString));
          const querySnapshot = await getDocs(q);

          setTodayScheduleCount(querySnapshot.size);
        } else {
          console.log('로그인 된 상태 아님.');
        }
      } catch (error) {
        console.error('DB 불러오기 오류: ', error);
      }
    };

    fetchTodayScheduleCount();
    if (userId) {
      dispatch(initializeSalaryAsync(userId));
      dispatch(initializeCorrectionAsync(userId));
    }
  }, [dispatch, userId]);

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
    margin: 0 50px 0 50px;
    color: ${(props) => props.theme.color.black};
    font-size: ${(props) => props.theme.fontSize.title2};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    border-radius: 10px;
    padding: 2em;
    background-color: ${(props) => props.theme.color.pureWhite};
    box-shadow: 0 3px 10px -5px;
  }
  .confirmApply {
    margin-top: 2rem;
    text-align: center;
    color: ${(props) => props.theme.color.yellow};
  }
  .confirmPay {
    margin-top: 2rem;
    text-align: center;
    color: ${(props) => props.theme.color.primary};
  }
  .confirmSchedule {
    margin-top: 2rem;
    text-align: center;
    color: ${(props) => props.theme.color.red};
  }
`;
