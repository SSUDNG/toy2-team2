import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import signUpSchema from '../schema/signupSchema';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import { firestore } from '../firebase/firebase';
import Loading from '../components/common/Loading';
import useCheckLogin from '../components/Login/useCheckLogin';
import SignupInputBox from '../components/Signup/SignupInputBox';

interface IuserInfo {
  id: string;
  password: string;
  name: string;
  department: string;
  jobPosition: string;
  joiningDate: string;
  email: string;
}

interface ISignUP extends IuserInfo {
  confirmPassword: string;
}

function Signup() {
  useCheckLogin();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ISignUP>({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const departmentList = ['인사부', '재무부', '마케팅부', '영업부', '기술부'];
  const jobPositionList = ['사원', '대리', '과장', '부장', '이사'];
  const enroll = async (userInfo: IuserInfo) => {
    setIsLoading(true);
    try {
      const USER_COLLECTION = 'User';
      const userCollectionRef = collection(firestore, USER_COLLECTION);
      const idQuery = query(userCollectionRef, where('id', '==', userInfo.id));
      const emailQuery = query(
        userCollectionRef,
        where('email', '==', userInfo.email),
      );
      const idQuerySnapshot = await getDocs(idQuery);
      const emailQuerySnapshot = await getDocs(emailQuery);
      if (!idQuerySnapshot.empty || !emailQuerySnapshot.empty) {
        if (!idQuerySnapshot.empty) {
          setError('id', { type: 'manual', message: '존재하는 ID입니다.' });
        }
        if (!emailQuerySnapshot.empty) {
          setError('email', {
            type: 'manual',
            message: '존재하는 E-mail입니다.',
          });
        }
      } else {
        await setDoc(doc(firestore, USER_COLLECTION, `${userInfo.id}`), {
          id: userInfo.id,
          password: userInfo.password,
          name: userInfo.name,
          department: userInfo.department,
          jobPosition: userInfo.jobPosition,
          joiningDate: userInfo.joiningDate,
          email: userInfo.email,
        });
        navigate('/login');
      }
    } catch (error) {
      console.log('SignUp Error: ', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <Col>
        <Logo>LOGO</Logo>
        {isLoading ? (
          <Loading />
        ) : (
          <Form onSubmit={handleSubmit((data) => enroll(data))}>
            <OptionList>
              <List>
                <InputLabel>ID</InputLabel>
                <SignupInputBox
                  type="text"
                  required
                  placeholder="아이디를 입력하세요"
                  register={register('id')}
                  message={errors.id?.message}
                />
              </List>
              <List>
                <InputLabel>비밀번호</InputLabel>
                <SignupInputBox
                  type="password"
                  required
                  placeholder="비밀번호를 입력하세요"
                  register={register('password')}
                  message={errors.password?.message}
                />
              </List>
              <List>
                <InputLabel>비밀번호 확인</InputLabel>
                <SignupInputBox
                  type="password"
                  required
                  placeholder="비밀번호를 입력하세요"
                  register={register('confirmPassword')}
                  message={errors.confirmPassword?.message}
                />
              </List>
              <List>
                <InputLabel>이름</InputLabel>
                <SignupInputBox
                  type="text"
                  required
                  placeholder="이름을 입력하세요"
                  register={register('name')}
                  message={errors.name?.message}
                />
              </List>
              <List>
                <InputLabel>부서</InputLabel>
                <Select
                  bordercolor="gray"
                  outlinecolor="primary"
                  register={register('department')}
                >
                  {departmentList.map((item) => (
                    <option value={`${item}`} key={`${item}`}>
                      {item}
                    </option>
                  ))}
                </Select>
              </List>
              <List>
                <InputLabel>직위</InputLabel>
                <Select
                  bordercolor="gray"
                  outlinecolor="primary"
                  register={register('jobPosition')}
                >
                  {jobPositionList.map((item) => (
                    <option value={`${item}`} key={`${item}`}>
                      {item}
                    </option>
                  ))}
                </Select>
              </List>
              <List>
                <InputLabel>입사일</InputLabel>
                <SignupInputBox
                  type="date"
                  required
                  placeholder="입사일을 선택하세요"
                  register={register('joiningDate')}
                  message={errors.joiningDate?.message}
                />
              </List>
              <List>
                <InputLabel>E-mail</InputLabel>
                <SignupInputBox
                  type="email"
                  required
                  placeholder="이메일을 입력하세요"
                  register={register('email')}
                  message={errors.email?.message}
                />
              </List>
            </OptionList>
            <Button size="xlarge" color="primary" type="submit">
              등록
            </Button>
          </Form>
        )}
      </Col>
    </Layout>
  );
}

export default Signup;

const Layout = styled.div`
  width: 100vw;
  height: 100%;
  background-color: ${(props) => props.theme.color.pureWhite};
  overflow: scroll;
`;

const Col = styled.div`
  width: 28.438vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.389vh;
`;

const Logo = styled.span`
  padding: 2.5vh 0;
  font-size: ${(props) => props.theme.fontSize.title1};
  color: ${(props) => props.theme.color.primary};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const OptionList = styled.ul`
  padding: ${(props) => props.theme.fontSize.title2} 0;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.fontSize.body1};
  border-top: 1px solid ${(props) => props.theme.color.black};
  border-bottom: 1px solid ${(props) => props.theme.color.black};
`;

const List = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  margin-bottom: 8px 0;
  font-size: ${(props) => props.theme.fontSize.body1};
  color: ${(props) => props.theme.color.black};
  font-weight: ${(props) => props.theme.fontWeight.medium};
`;

const Form = styled.form`
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.fontSize.title1};
`;
