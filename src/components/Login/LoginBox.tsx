import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import styled from 'styled-components';

const ID_MAX_LENGTH = 30;
const PW_MIN_LENGTH = 8;
const PW_MAX_LENGTH = 30;
const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/;
const PW_REGEX_ERROR =
  '비밀번호는 대소문자, 특수기호(#?!@$%^&*-)를 포함해야 합니다.';

const formSchema = z.object({
  email: z.string().email().max(ID_MAX_LENGTH, { message: '최대 30자입니다.' }),
  password: z
    .string()
    .min(PW_MIN_LENGTH, { message: '최소 8자 이상이어야 합니다.' })
    .max(PW_MAX_LENGTH, { message: '최대 30자 입니다.' })
    .regex(PW_REGEX, PW_REGEX_ERROR),
});

interface ILogin {
  email: string;
  password: string;
}

function LoginBox() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILogin>({
    resolver: zodResolver(formSchema),
  });
  console.log(errors);

  return (
    <Form onSubmit={handleSubmit((e) => console.log(e))}>
      <InputBox>
        <Input type="email" required placeholder="ID" {...register('email')} />
        {errors.email && <span>{errors.email?.message}</span>}
      </InputBox>
      <InputBox>
        <Input
          type="password"
          required
          placeholder="PASSWORD"
          {...register('password')}
        />
        {errors.password && <span>{errors.password?.message}</span>}
      </InputBox>
      <ButtonBox>
        <button type="submit">로그인</button>
        <Link to="/signup">
          <button type="button">회원가입</button>
        </Link>
      </ButtonBox>
    </Form>
  );
}

export default LoginBox;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5.556vh;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonBox = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 1.563vw;
`;

const Input = styled.input`
  &::placeholder {
    color: ${(props) => props.theme.color.blue};
  }
  font-size: ${(props) => props.theme.fontSize.title4};
  height: 4.63vh;
  padding: 0 0.74vh;
  border: 1px solid ${(props) => props.theme.color.gray};
`;
