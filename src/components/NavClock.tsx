import { useState, useEffect } from 'react';
import styled from 'styled-components';

const NavClockStyled = styled.div`
  .leftUnder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    width: 100vh;
    font-size: ${(props) => props.theme.fontSize.title1};
    background-color: ${(props) => props.theme.color.pureWhite};
  }
`;

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
        <div>{time}</div>
        <div>else</div>
      </div>
    </NavClockStyled>
  );
}
