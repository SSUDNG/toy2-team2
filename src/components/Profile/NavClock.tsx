import { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function NavClock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <NavClockStyled>
      <div className="leftUnder">
        <div className="clock">{time}</div>
      </div>
    </NavClockStyled>
  );
}

const NavClockStyled = styled.div`
  .leftUnder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 40vw;
    font-size: ${(props) => props.theme.fontSize.title1};
  }
  .clock {
    padding: 50px;
    background-color: ${(props) => props.theme.color.pureWhite};
    border-radius: 10px;
  }
`;
