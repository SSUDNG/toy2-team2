import { useState, useEffect } from 'react';
import styled from 'styled-components';

const NavClockStyled = styled.div`
  .clockWrapper {
    display: flex;
    /* background-color: ${(props) => props.theme.color.white}; */
  }
`;

export default function NavClock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <NavClockStyled>
      <div className="clockWrapper">{time}</div>
    </NavClockStyled>
  );
}
