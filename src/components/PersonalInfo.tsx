import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebase';

const Table = styled.table`
  width: 50vw;
  border-collapse: collapse;
  text-align: center;
`;

const TableRow = styled.tr`
  border: 1px solid #ddd;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const TableHeaderCell = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: ${(props) => props.theme.color.white};
`;

interface UserInfo {
  name: string;
  department: string;
  position: string;
  hireDate: string;
  email: string;
}

export default function PersonalInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth(app);
        const user = auth.currentUser;

        if (user) {
          const firestore = getFirestore(app);
          const docRef = doc(firestore, 'User', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo({
              name: data.name,
              department: data.department,
              position: data.position,
              hireDate: data.hireDate,
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
            <TableCell>{userInfo.position}</TableCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell>입사일</TableHeaderCell>
            <TableCell>{userInfo.hireDate}</TableCell>
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
