import { ButtonHTMLAttributes, ReactNode, createElement } from 'react';
import styled, { css } from 'styled-components';
import sb from '../../utils/styledBranch';

type ButtonSize = 'basic' | 'large' | 'xlarge';
type ButtonColor = 'primary' | 'white';

interface ButtonStyleProps {
  size: ButtonSize;
  color: ButtonColor;
}

type ButtonProps<T extends object = Record<never, never>> =
  ButtonHTMLAttributes<HTMLButtonElement> &
    ButtonStyleProps & {
      children: ReactNode;
    } & T;

function Button<T extends object>({
  children,
  size = 'basic',
  color = 'primary',
  type = 'button',
  ...props
}: ButtonProps<T>) {
  return createElement(
    ButtonLayout,
    {
      size,
      color,
      type,
      ...props,
    },
    children,
  );
}

export default Button;

const ButtonLayout = styled.button<ButtonStyleProps>`
  ${(props) =>
    sb(props.size, {
      basic: css`
        padding: 8px 20px;
        font-size: ${props.theme.fontSize.body2};
        font-weight: ${props.theme.fontWeight.medium};
      `,
      large: css`
        padding: 10px 30px;
        font-size: ${props.theme.fontSize.body1};
        font-weight: ${props.theme.fontWeight.bold};
      `,
      xlarge: css`
        padding: 10px 30px;
        font-size: ${props.theme.fontSize.title3};
        font-weight: ${props.theme.fontWeight.bold};
      `,
    })}
  ${(props) =>
    sb(props.color, {
      primary: css`
        background-color: ${props.theme.color.primary};
        color: ${props.theme.color.white};
      `,
      white: css`
        background-color: ${props.theme.color.background};
        color: ${props.theme.color.primary};
      `,
    })}
  border: 1px solid ${(props) => props.theme.color.primary};
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
`;
