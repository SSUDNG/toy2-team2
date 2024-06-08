import React from 'react';
import styled from 'styled-components';
import { MdCheck } from 'react-icons/md';
import theme from '../../style/theme';

interface ColorOptionsProps {
  selectedColor?: string;
  onColorChange: (color: string) => void;
}

function ColorOptions({
  selectedColor = '',
  onColorChange,
}: ColorOptionsProps) {
  const $barColors = theme.barColor;

  return (
    <ColorOptionsWrapper>
      {Object.entries($barColors).map(([key, value]) => (
        <ColorOption
          key={key}
          $barColor={value}
          $isSelected={selectedColor === value}
        >
          {selectedColor === value && <Checked />}
          <input
            type="radio"
            value={value}
            onChange={() => onColorChange(value)}
          />
        </ColorOption>
      ))}
    </ColorOptionsWrapper>
  );
}

export default ColorOptions;

const ColorOptionsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
`;

const ColorOption = styled.label.attrs<{
  $barColor: string;
  $isSelected: boolean;
}>(({ $barColor }) => ({
  style: {
    backgroundColor: $barColor,
  },
}))`
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 2px solid transparent;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  input {
    display: none;
  }
`;

const Checked = styled(MdCheck)`
  color: ${(props) => props.theme.color.pureWhite};
  font-size: ${(props) => props.theme.fontSize.body1};
`;
