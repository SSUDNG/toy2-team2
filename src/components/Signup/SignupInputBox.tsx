import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

interface ILogin {
  readonly type: string;
  readonly required: boolean;
  readonly placeholder: string;
  readonly message?: string;
  readonly register: UseFormRegisterReturn;
}

interface InputProps {
  message?: string;
}

function SignupInputBox({
  type,
  placeholder,
  message,
  required,
  register,
}: ILogin) {
  const { onChange, onBlur, name, ref } = register || {};
  return (
    <Col>
      <Input
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
        message={message}
      />
      {message && <ErrorMessageBox>{message}</ErrorMessageBox>}
    </Col>
  );
}

export default SignupInputBox;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input<InputProps>`
  width: 28.438vw;
  height: 50px;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.message ? props.theme.color.red : props.theme.color.gray};
  font-size: ${(props) => props.theme.fontSize.body1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  &::placeholder {
    color: ${(props) => props.theme.color.gray};
  }
`;

const ErrorMessageBox = styled.span`
  padding-top: 0.3rem;
  color: ${(props) => props.theme.color.red};
  font-size: ${(props) => props.theme.fontSize.body1};
`;
