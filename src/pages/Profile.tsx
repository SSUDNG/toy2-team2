import styled from 'styled-components';
import ProfileImage from '../components/ProfileImage';
import ProfileInfo from '../components/ProfileInfo';
import NavClock from '../components/NavClock';
import PersonalInfo from '../components/PersonalInfo';

function Profile() {
  return (
    <ProfileStyle>
      <section className="topLayout">
        <ProfileImage />
        <ProfileInfo />
      </section>
      <section className="underLayout">
        <NavClock />
        <PersonalInfo />
      </section>
    </ProfileStyle>
  );
}

export default Profile;

const ProfileStyle = styled.header`
  .topLayout {
    display: flex;
    justify-content: space-around;
  }
  .underLayout {
    display: flex;
    justify-content: space-around;
    margin-top: 2em;
  }
`;
