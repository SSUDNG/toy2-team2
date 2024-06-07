import { useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import defaultImage from '../../../defaultImage.svg';

function ProfileImage(): JSX.Element {
  const [photo, setImageUrl] = useState<string>(defaultImage);

  useEffect(() => {
    const storedImageUrl = localStorage.getItem('profileImage');
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }
  }, []);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      const photoUrl = URL.createObjectURL(selectedImage);
      setImageUrl(photoUrl);
      localStorage.setItem('profileImage', photoUrl);
    }
  };

  const handleImageError = () => {
    setImageUrl(defaultImage);
  };

  return (
    <ProfileStyle>
      <div>
        <img
          className="profileImage"
          src={photo}
          alt="프로필 이미지"
          onError={handleImageError}
        />
        <Button size="basic" color="white" as="label" htmlFor="imageInput">
          이미지 선택
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </Button>
      </div>
    </ProfileStyle>
  );
}

const ProfileStyle = styled.div`
  .profileImage {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem 0 2rem;
    width: 280px;
    height: 280px;
    border-radius: 50%;
  }
  div {
    display: flex;
    width: 30vw;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .button {
    height: 2rem;
  }
`;

export default ProfileImage;
