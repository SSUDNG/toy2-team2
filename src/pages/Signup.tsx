import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import InputBox from '../components/Login/InputBox';
import signUpSchema from '../components/SignUp/signupSchema';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import { firestore } from '../firebase/firebase';

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
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ISignUP>({
    resolver: zodResolver(signUpSchema),
  });
  const departmentList = ['인사부', '재무부', '마케팅부', '영업부', '기술부'];
  const jobPositionList = ['사원', '대리', '과장', '부장', '이사'];
  const enroll = async (userInfo: IuserInfo) => {
    const USER_COLLECTION = 'User';
    const userCollectionRef = collection(firestore, USER_COLLECTION);
    const idQuery = query(userCollectionRef, where('id', '==', userInfo.id));
    console.log(userInfo.id);
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
      await addDoc(userCollectionRef, {
        id: userInfo.id,
        password: userInfo.password,
        name: userInfo.name,
        department: userInfo.department,
        jobPosition: userInfo.jobPosition,
        joiningDate: userInfo.joiningDate,
        email: userInfo.email,
      });
    }
  };
  return (
    <Layout>
      <Col>
        <Logo>LOGO</Logo>
        <Form onSubmit={handleSubmit((data) => enroll(data))}>
          <OptionList>
            <List>
              <InputLabel>ID</InputLabel>
              <InputBox
                type="text"
                outlinecolor={errors.id ? 'red' : 'primary'}
                bordercolor={errors.id ? 'red' : 'gray'}
                required
                placeholder="아이디를 입력하세요"
                placeholdercolor="gray"
                register={register('id')}
                message={errors.id?.message}
                font-size="16px"
              />
            </List>
            <List>
              <InputLabel>비밀번호</InputLabel>
              <InputBox
                type="text"
                outlinecolor={errors.password ? 'red' : 'primary'}
                bordercolor={errors.password ? 'red' : 'gray'}
                required
                placeholder="비밀번호를 입력하세요"
                placeholdercolor="gray"
                register={register('password')}
                message={errors.password?.message}
              />
            </List>
            <List>
              <InputLabel>비밀번호 확인</InputLabel>
              <InputBox
                type="text"
                bordercolor="gray"
                outlinecolor="primary"
                required
                placeholder="비밀번호를 입력하세요"
                placeholdercolor="gray"
                register={register('confirmPassword')}
                message={errors.confirmPassword?.message}
              />
            </List>
            <List>
              <InputLabel>이름</InputLabel>
              <InputBox
                type="text"
                outlinecolor={errors.name ? 'red' : 'primary'}
                bordercolor={errors.name ? 'red' : 'gray'}
                required
                placeholder="이름을 입력하세요"
                placeholdercolor="gray"
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
              <InputBox
                type="date"
                bordercolor="gray"
                outlinecolor="primary"
                required
                placeholder="입사일을 선택하세요"
                placeholdercolor="gray"
                register={register('joiningDate')}
                message={errors.joiningDate?.message}
              />
            </List>
            <List>
              <InputLabel>E-mail</InputLabel>
              <InputBox
                type="email"
                bordercolor="gray"
                outlinecolor="primary"
                required
                placeholder="이메일을 입력하세요"
                placeholdercolor="gray"
                register={register('email')}
                message={errors.email?.message}
              />
            </List>
          </OptionList>
          <Button size="xlarge" color="primary" type="submit">
            등록
          </Button>
        </Form>
      </Col>
    </Layout>
  );
}

export default Signup;

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.color.white};
`;

const Col = styled.div`
  width: 28.438vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  gap: 1.389vh;
  flex-direction: column;
`;

const Logo = styled.span`
  font-size: ${(props) => props.theme.fontSize.title1};
  color: ${(props) => props.theme.color.primary};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  padding: 2.5vh 0;
`;
const OptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.fontSize.body1};
  padding: ${(props) => props.theme.fontSize.title2} 0;
  border-top: 1px solid ${(props) => props.theme.color.black};
  border-bottom: 1px solid ${(props) => props.theme.color.black};
`;
const List = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const InputLabel = styled.label`
  font-size: ${(props) => props.theme.fontSize.body1};
  color: ${(props) => props.theme.color.black};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin-bottom: 8px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.fontSize.title1};
`;
