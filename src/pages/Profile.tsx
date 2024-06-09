import styled from 'styled-components';
import ProfileImage from '../components/Profile/ProfileImage';
import ProfileInfo from '../components/Profile/ProfileInfo';
import NavClock from '../components/Profile/NavClock';
import PersonalInfo from '../components/Profile/PersonalInfo';

function Profile() {
  return (
    <ProfileStyle>
      <section className="leftLayout">
        <ProfileImage />
        <NavClock />
      </section>
      <section className="rightLayout">
        <ProfileInfo />
        <PersonalInfo />
      </section>
    </ProfileStyle>
  );
}

export default Profile;

const ProfileStyle = styled.header`
  display: flex;
  margin: 2rem 0;
  .leftLayout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .rightLayout {
    display: flex;
    flex-direction: column;
  }
`;
