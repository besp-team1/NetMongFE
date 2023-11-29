import React from 'react';
import { Button, Image } from 'react-bootstrap';
import sprite1 from "../../assets/images/logo.png"
import '../../style/mypage/Profile.css';

const Profile = ({ user, onImageChange, onPasswordChange }) => {
  return (
    <div className="Profile">
      <Image src={sprite1} roundedCircle />
      <Button onClick={onImageChange}>프로필 이미지 변경</Button>
      <Button onClick={onPasswordChange}>비밀번호 변경</Button>
    </div>
  );
};

export default Profile;