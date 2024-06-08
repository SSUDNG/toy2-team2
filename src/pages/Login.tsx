import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../components/common/Button';
import formSchema from '../components/Login/loginSchema';
import { firestore } from '../firebase/firebase';
import useCheckLogin from '../components/Login/useCheckLogin';
import { setUserInfo } from '../store/login/index';
import LoginInputBox from '../components/Login/LoginInputBox';

interface ILogin {
  id: string;
  password: string;
}

function Login() {
  useCheckLogin();
  const USER_COLLECTION = 'User';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkLogin = async (id: string, password: string): Promise<boolean> => {
    const userCollectionRef = collection(firestore, USER_COLLECTION);
    const userQuery = query(
      userCollectionRef,
      where('id', '==', id),
      where('password', '==', password),
    );

    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
      const info = querySnapshot.docs[0].data();
      sessionStorage.setItem('id', info.id);
      dispatch(
        setUserInfo({
          id: info.id,
          department: info.department,
          email: info.email,
          jobPosition: info.jobPosition,
          joiningDate: info.joiningDate,
          name: info.name,
        }),
      );
      
      return true;
    }
    return false;
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ILogin>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ILogin) => {
    const loggedIn = await checkLogin(data.id, data.password);
    if (loggedIn) {
      navigate('/profile');
    } else {
      setError('password', {
        type: 'manual',
        message: 'ID 혹은 비밀번호가 틀렸습니다.',
      });
    }
  };

  return (
    <Layout>
      <Col>
        <Logo>LOGO</Logo>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <LoginInputBox
            type="text"
            required
            placeholder="ID"
            message={errors.id?.message}
            register={register('id')}
          />
          <LoginInputBox
            type="password"
            required
            placeholder="PASSWORD"
            message={errors.password?.message}
            register={register('password')}
          />
          <ButtonBox>
            <Button size="basic" color="primary" type="submit">
              로그인
            </Button>
            <Link to="/signup">
              <Button size="basic" color="white" type="button">
                회원가입
              </Button>
            </Link>
          </ButtonBox>
        </Form>
      </Col>
    </Layout>
  );
}

export default Login;

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.color.background};
`;

const Col = styled.div`
  width: 28.438vw;
  margin: 0 auto;
  display: flex;
  gap: 6.296vh;
  flex-direction: column;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.fontSize.title2};
`;
const Logo = styled.span`
  padding: 9vh 0;
  margin: 0 auto;
  color: ${(props) => props.theme.color.blue};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  font-size: ${(props) => props.theme.fontSize.title1};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5.556vh;
`;
