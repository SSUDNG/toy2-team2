import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../firebase/firebase';

interface UserInfo {
  name: string;
  department: string;
  jobPosition: string;
  joiningDate: string;
  email: string;
}

export default function PersonalInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem('id');
        if (userId) {
          const firestore = getFirestore(app);
          const docRef = doc(firestore, 'User', userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo({
              name: data.name,
              department: data.department,
              jobPosition: data.jobPosition,
              joiningDate: data.joiningDate,
              email: data.email,
            });
          } else {
            console.log('데이터를 찾을 수 없습니다.');
          }
        } else {
          console.log('로그인 된 상태 아님.');
        }
      } catch (error) {
        console.error('DB 불러오기 오류: ', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table>
        <tbody>
          <TableRow>
            <TableHeaderCell>이름</TableHeaderCell>
            <TableCell>{userInfo.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell>부서</TableHeaderCell>
            <TableCell>{userInfo.department}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell>직위</TableHeaderCell>
            <TableCell>{userInfo.jobPosition}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell>입사일</TableHeaderCell>
            <TableCell>{userInfo.joiningDate}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell>이메일</TableHeaderCell>
            <TableCell>{userInfo.email}</TableCell>
          </TableRow>
        </tbody>
      </Table>
    </div>
  );
}

const Table = styled.table`
  width: 60vw;
  height: 40vh;
  border-radius: 10px;
  overflow: hidden;
  justify-content: center;
  border-collapse: collapse;
  text-align: center;
  font-weight: ${(props) => props.theme.fontWeight.semiBold};
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 8px;
  background-color: ${(props) => props.theme.color.pureWhite};
  text-align: center;
  height: 8vh;
  display: flex;
  justify-content: center;
  align-content: stretch;
  flex-direction: column;
`;

const TableHeaderCell = styled.th`
  padding: 8px;
  background-color: ${(props) => props.theme.color.pureWhite};
`;
