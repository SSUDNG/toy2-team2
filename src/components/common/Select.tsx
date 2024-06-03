import { ReactNode, SelectHTMLAttributes, createElement } from 'react';
import styled, { css } from 'styled-components';
import { UseFormRegisterReturn } from 'react-hook-form';
import sb from '../../utils/styledBranch';

type OutlineColor = 'primary' | 'black' | 'red' | 'gray';
type BorderColor = 'primary' | 'black' | 'red' | 'gray';

interface SelectStyleProps {
  bordercolor: BorderColor;
  outlinecolor: OutlineColor;
  register: UseFormRegisterReturn;
}

type SelectProps<T extends object = Record<never, never>> =
  SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode } & T &
  SelectStyleProps;

function Select<T extends object>({
  children,
  bordercolor = 'gray',
  outlinecolor = 'primary',
  register,
  ...props
}: SelectProps<T>) {
  const { onChange, onBlur, name, ref } = register || {};
  // console.log(register);
  return createElement(
    SelectLayout,
    {
      bordercolor,
      outlinecolor,
      ...props,
      onChange,
      onBlur,
      name,
      ref,
    },
    children,
  );
}

export default Select;

const SelectLayout = styled.select<SelectStyleProps>`
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
  text-align: center;
  width: 100%;
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  height: 50px;
  padding: 0 ${(props) => props.theme.fontSize.title2};
  font-size: ${(props) => props.theme.fontSize.title4};
`;
