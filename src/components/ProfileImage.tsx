import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './common/Button';

const ProfileStyle = styled.div`
  .profileImage {
    padding: 0 2rem 0 2rem;
    width: 280px;
    height: 280px;
    border-radius: 50%;
  }
`;

function ProfileImage() {
  const [photo, setImageUrl] = useState('');

  // 페이지가 로드될 때 로컬 스토리지에서 이미지 URL을 가져와서 상태에 설정
  useEffect(() => {
    const storedImageUrl = localStorage.getItem('profileImage');
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }
  }, []);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0]; // 선택한 이미지 파일
    const photo = URL.createObjectURL(selectedImage); // 이미지 URL 생성
    setImageUrl(photo); // 이미지 URL 상태 업데이트
    localStorage.setItem('profileImage', photo); // 로컬 스토리지에 이미지 URL 저장
  };

  return (
    <ProfileStyle>
      {' '}
      <Button size="basic" color="white" as="label" htmlFor="imageInput">
        이미지 선택
        <input
          id="imageInput"
          type="file"
          accept="image/*" // 이미지 파일만 선택할 수 있도록 설정
          style={{ display: 'none' }}
          onChange={handleImageChange} // 이미지 선택 시 handleImageChange 함수 호출
        />
      </Button>
      <img className="profileImage" src={photo} alt="" />
    </ProfileStyle>
  );
}

export default ProfileImage;
