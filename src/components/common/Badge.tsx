import { createElement } from 'react';
import styled, { css } from 'styled-components';
import sb from '../../utils/styledBranch';

type BadgeSize = 'basic' | 'large';
type BadgeColor = 'yellow' | 'bluegreen';

interface BadgeStyleProps {
  size: BadgeSize;
  color: BadgeColor;
}

interface BadgeProps extends BadgeStyleProps {
  children: React.ReactNode;
}

function Badge({ children, size = 'basic', color = 'yellow' }: BadgeProps) {
  return createElement(BadgeLayout, { size, color }, children);
}

export default Badge;

const BadgeLayout = styled.span<BadgeStyleProps>`
  ${(props) =>
    sb(props.size, {
      basic: css`
        width: 8rem;
        padding: 8px 0;
        font-size: ${props.theme.fontSize.body2};
        font-weight: ${props.theme.fontWeight.medium};
      `,
      large: css`
        width: 10rem;
        padding: 16px;
        font-size: ${props.theme.fontSize.body1};
        font-weight: ${props.theme.fontWeight.bold};
      `,
    })}
  ${(props) =>
    sb(props.color, {
      yellow: css`
        background-color: ${props.theme.color.yellow};
      `,
      bluegreen: css`
        background-color: ${props.theme.color.bluegreen};
      `,
    })}
  text-align: center;
  border-radius: 4px;
  color: ${(props) => props.theme.color.white};
`;
