import { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setUserInfo } from '../../store/login';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
export default function PersonalInfo() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = sessionStorage.getItem('id');
        if (!userId) {
          throw new Error('User ID not found in session storage');
        }
        const userCollectionRef = collection(firestore, 'User');
        const userQuery = query(
          userCollectionRef,
          where('id', '==', userId)
        );
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data() as {
            department: string;
            jobPosition: string;
            id: string;
            email: string;
            joiningDate: string;
            name: string;
          };
          dispatch(setUserInfo(userData));
        }
      } catch (error) {
        console.error('사용자 정보를 불러오는 중 에러 발생: ', error);
      }
    };
    
  
    fetchUserInfo();
  }, [dispatch]);

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
            <TableCell>{userInfo.jobposition}</TableCell>
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
  width: 50vw;
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
