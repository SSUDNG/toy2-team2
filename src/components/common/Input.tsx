import { InputHTMLAttributes, createElement } from 'react';
import styled, { css } from 'styled-components';
import sb from '../../utils/styledBranch';

type PlaceholderColor = 'black' | 'gray';
type BorderColor = 'primary' | 'black' | 'red' | 'gray';

interface InputStyleProps {
  placeHolderColor: PlaceholderColor;
  borderColor: BorderColor;
}

type InputProps<T extends object = Record<never, never>> =
  InputHTMLAttributes<HTMLInputElement> & InputStyleProps & T;

function Input<T extends object>({
  color = 'black',
  borderColor = 'black',
  type = 'text',
  ...props
}: InputProps<T>) {
  return createElement(InputLayout, {
    color,
    borderColor,
    ...props,
    type,
  });
}

export default Input;

const InputLayout = styled.input<InputStyleProps>`
  ${(props) =>
    sb(props.placeHolderColor, {
      black: css`
        &::placeholder {
          color: ${props.theme.color.black};
        }
      `,
      gray: css`
        &::placeholder {
          color: ${props.theme.color.gray};
        }
      `,
    })}
  ${(props) =>
    sb(props.borderColor, {
      primary: css`
        border-color: ${props.theme.color.primary};
      `,
      black: css`
        border-color: ${props.theme.color.black};
      `,
      red: css`
        border-color: ${props.theme.color.red};
      `,
      gray: css`
        border-color: ${props.theme.color.gray};
      `,
    })}
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  height: 50px;
`;
