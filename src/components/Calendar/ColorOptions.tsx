import React from 'react';
import styled from 'styled-components';
import { UseFormRegisterReturn } from 'react-hook-form';
import theme from '../../style/theme';

interface ColorOptionsProps {
  colorProps: UseFormRegisterReturn;
}

function ColorOptions({ colorProps }: ColorOptionsProps) {
  const barColors = theme.barColor;

  return (
    <ColorOptionsWrapper>
      {Object.entries(barColors).map(([key, value]) => (
        <ColorOption key={key} barColor={value}>
          <input
            type="radio"
            value={value}
            name={colorProps.name}
            onChange={colorProps.onChange}
            onBlur={colorProps.onBlur}
            ref={colorProps.ref}
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
  margin: 10px 0;
`;

const ColorOption = styled.label<{
  barColor: string;
}>`
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.barColor};
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  input {
    display: none;
  }
  &:hover,
  &:focus-within {
    border-color: #000;
  }
`;
