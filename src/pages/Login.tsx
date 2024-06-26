import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../components/common/Button';
import formSchema from '../schema/loginSchema';
import { firestore } from '../firebase/firebase';
import useCheckLogin from '../components/Login/useCheckLogin';
import { setUserInfo } from '../store/login';
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
      navigate('/');
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
  margin: 0 auto;
  width: 28.438vw;
  display: flex;
  flex-direction: column;
  gap: 6.296vh;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.fontSize.title2};
`;

const Logo = styled.span`
  margin: 9vh auto 0;
  padding: 0;
  color: ${(props) => props.theme.color.blue};
  font-size: ${(props) => props.theme.fontSize.title1};
  font-weight: ${(props) => props.theme.fontWeight.bold};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5.556vh;
  justify-content: space-between;
`;
