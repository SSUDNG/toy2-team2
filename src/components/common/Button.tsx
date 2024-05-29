import { ButtonHTMLAttributes, ReactNode, createElement } from 'react';
import styled from 'styled-components';
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

// const ButtonLayout = styled.button<ButtonStyleProps>`
//   border: none;
//   border-radius: 10px;
//   box-sizing: border-box;
//   cursor: pointer;
//   ${(props) =>
//     sb(props.size, {
//       basic: `
//         padding: 8px 20px;
//         font-size: ${props.theme.fontSize.body2};
//         font-weight: ${props.theme.fontWeight.medium};
//     `,
//       large: `
//         padding: 10px 30px;
//         font-size: ${props.theme.fontSize.body1};
//         font-weight: ${props.theme.fontWeight.bold};
//     `,
//       xlarge: `
//         width: 100%;
//         padding: 10px 30px;
//         font-size: ${props.theme.fontSize.title3};
//         font-weight: ${props.theme.fontWeight.bold};
//     `,
//     })}
//   ${(props) =>
//     sb(props.color, {
//       primary: `
//         background-color: ${props.theme.color.primary};
//         color: ${props.theme.color.white};
//         border: 1px solid ${props.theme.color.primary};
//       `,
//       white: `
//         background-color: ${props.theme.color.background};
//         color: ${props.theme.color.primary};
//         border: 1px solid ${props.theme.color.primary};
//       `,
//     })}
// `;

const ButtonLayout = styled.button<ButtonStyleProps>`
  padding: ${(props) =>
    sb(props.size, {
      basic: '8px 20px',
      large: '10px 30px',
      xlarge: '10px 30px',
    })};
  font-size: ${(props) =>
    sb(props.size, {
      basic: props.theme.fontSize.body2,
      large: props.theme.fontSize.body1,
      xlarge: props.theme.fontSize.title3,
    })};
  font-weight: ${(props) =>
    sb(props.size, {
      basic: props.theme.fontWeight.medium,
      large: props.theme.fontWeight.bold,
      xlarge: props.theme.fontWeight.bold,
    })};
  background-color: ${(props) =>
    sb(props.color, {
      primary: props.theme.color.primary,
      white: props.theme.color.background,
    })};
  color: ${(props) =>
    sb(props.color, {
      primary: props.theme.color.white,
      white: props.theme.color.primary,
    })};
  border: 1px solid ${(props) => props.theme.color.primary};
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
`;
