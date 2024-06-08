import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './common/Button';
import useCheckLogin from './Login/useCheckLogin';

function NavbarLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  useCheckLogin();
  const clickLogOut = () => {
    navigate('/login');
    sessionStorage.clear();
  };

  return (
    <NavbarLayoutStyle>
      {/* NavbarList */}
      <ul>
        {/* NavbarItem */}
        <li
          className={`titleLogo ${location.pathname === '/' ? 'active' : ''}`}
        >
          <h1>LOGO</h1>
        </li>
        {/* NavbarBox */}
        <div className="navbar">
          <div className="navEl">
            <Link to="/profile">
              <li className={location.pathname === '/profile' ? 'active' : ''}>
                내 인사정보
              </li>
            </Link>
            <Link to="/salary">
              <li className={location.pathname === '/salary' ? 'active' : ''}>
                급여 내역
              </li>
            </Link>
            <Link to="/correction">
              <li
                className={location.pathname === '/correction' ? 'active' : ''}
              >
                신청 내역
              </li>
            </Link>
            <Link to="/calendar">
              <li className={location.pathname === '/calendar' ? 'active' : ''}>
                캘린더
              </li>
            </Link>
          </div>
          <Button size="basic" color="white" onClick={clickLogOut}>
            로그아웃
          </Button>
        </div>
      </ul>
    </NavbarLayoutStyle>
  );
}

export default NavbarLayout;

const NavbarLayoutStyle = styled.header`
  ul {
    height: 5rem;
    display: flex;
    justify-content: space-between;
    color: ${(props) => props.theme.color.black};
    font-size: ${(props) => props.theme.fontSize.title3};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    background-color: ${(props) => props.theme.color.pureWhite};
    box-shadow: 0 1px 10px -5px;
    margin-bottom: 2em;
  }
  .titleLogo {
    font-size: ${(props) => props.theme.fontSize.title1};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    display: flex;
    align-items: center;
  }
  .navbar {
    display: flex;
    align-items: center;
  }
  .navEl {
    display: flex;
  }
  li {
    margin: 1rem;
    padding: 0 20px 0 20px;
  }
  .active {
    color: ${(props) => props.theme.color.primary};
  }
  button {
    margin: 0 3rem 0 3rem;
  }
`;
