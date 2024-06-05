import { ButtonHTMLAttributes, ReactNode, createElement } from 'react';
import styled, { css } from 'styled-components';
import sb from '../../utils/styledBranch';

type ButtonSize = 'basic' | 'large' | 'xlarge';
type ButtonColor = 'primary' | 'white' | 'red';

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
  className = 'button',
  ...props
}: ButtonProps<T>) {
  return createElement(
    ButtonLayout,
    {
      size,
      color,
      type,
      className,
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
        width: 100%;
      `,
    })}
  ${(props) =>
    sb(props.color, {
      primary: css`
        background-color: ${props.theme.color.primary};
        color: ${props.theme.color.white};
        border: 1px solid ${props.theme.color.primary};
        &:hover {
          filter: brightness(110%);
        }
      `,
      white: css`
        background-color: ${props.theme.color.white};
        color: ${props.theme.color.primary};
        border: 1px solid ${props.theme.color.primary};
        &:hover {
          filter: brightness(125%);
        }
      `,
      red: css`
        background-color: ${props.theme.color.red};
        color: ${props.theme.color.white};
        border: 1px solid ${props.theme.color.red};
        &:hover {
          filter: brightness(90%);
        }
      `,
    })}
  border-radius: 10px;
  box-sizing: border-box;
  font-size: ${(props) => props.theme.fontSize.body1};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  transition: filter 200ms;
  cursor: pointer;
`;
