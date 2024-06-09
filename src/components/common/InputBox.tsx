import type { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import Input from './Input';

interface IProps {
  readonly type: string;
  readonly required: boolean;
  readonly placeholder: string;
  readonly placeholdercolor: 'black' | 'gray' | 'primary';
  readonly bordercolor: 'primary' | 'black' | 'red' | 'gray';
  readonly outlinecolor: 'primary' | 'black' | 'red' | 'gray';
  readonly message?: string;
  readonly register: UseFormRegisterReturn;
}

function InputBox({
  type,
  required,
  placeholder,
  placeholdercolor,
  bordercolor,
  outlinecolor,
  register,
  message,
}: IProps) {
  return (
    <Col>
      <Input
        type={type}
        required={required}
        placeholder={placeholder}
        placeholdercolor={placeholdercolor}
        bordercolor={bordercolor}
        outlinecolor={outlinecolor}
        register={register}
      />
      {message && <ErrorMessageBox> {message}</ErrorMessageBox>}
    </Col>
  );
}
export default InputBox;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
const ErrorMessageBox = styled.span`
  padding-top: 0.3rem;
  color: ${(props) => props.theme.color.red};
  font-size: ${(props) => props.theme.fontSize.body1};
`;
