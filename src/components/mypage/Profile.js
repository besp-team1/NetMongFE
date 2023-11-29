import React from 'react';
import { Button, Image } from 'react-bootstrap';

const Profile = ({ user, onImageChange, onPasswordChange }) => {
  return (
    <div className="Profile">
      <Image src="../../public/logo192.png" roundedCircle />
      <Button onClick={onImageChange}>프로필 이미지 변경</Button>
      <Button onClick={onPasswordChange}>비밀번호 변경</Button>
    </div>
  );
};

export default Profile;