import { InputHTMLAttributes, createElement } from 'react';
import styled, { css } from 'styled-components';
import { UseFormRegisterReturn } from 'react-hook-form';
import sb from '../../utils/styledBranch';

type PlaceholderColor = 'primary' | 'black' | 'gray';
type OutlineColor = 'primary' | 'black' | 'red' | 'gray';
type BorderColor = 'primary' | 'black' | 'red' | 'gray';

interface InputStyleProps {
  placeholdercolor: PlaceholderColor;
  bordercolor: BorderColor;
  outlinecolor: OutlineColor;
  register: UseFormRegisterReturn;
}

type InputProps<T extends object = Record<never, never>> =
  InputHTMLAttributes<HTMLInputElement> & Partial<InputStyleProps> & T;

function Input<T extends object>({
  placeholdercolor = 'black',
  bordercolor = 'gray',
  outlinecolor = 'primary',
  type = 'text',
  register,
  ...props
}: InputProps<T>) {
  const { onChange, onBlur, name, ref } = register || {};
  return createElement(InputLayout, {
    placeholdercolor,
    bordercolor,
    outlinecolor,
    ...props,
    type,
    onChange,
    onBlur,
    name,
    ref,
  });
}

export default Input;

const InputLayout = styled.input<InputStyleProps>`
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  height: 50px;
  padding: 0 ${(props) => props.theme.fontSize.title2};
  font-size: ${(props) => props.theme.fontSize.body1};

  ${(props) =>
    sb(props.placeholdercolor, {
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
      primary: css`
        &::placeholder {
          color: ${props.theme.color.primary};
        }
      `,
    })}

  ${(props) =>
    sb(props.bordercolor, {
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

  ${(props) =>
    sb(props.outlinecolor, {
      primary: css`
        outline-color: ${props.theme.color.primary};
      `,
      black: css`
        outline-color: ${props.theme.color.black};
      `,
      red: css`
        outline-color: ${props.theme.color.red};
      `,
      gray: css`
        outline-color: ${props.theme.color.gray};
      `,
    })}
`;
