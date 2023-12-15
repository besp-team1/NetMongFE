import React from 'react';
import { Button, Image } from 'react-bootstrap';
import sprite1 from "../../assets/images/logo.png"
import '../../style/mypage/Profile.css';

const Profile = ({ username, onImageChange, onPasswordChange }) => {
  console.log(username);
  return (
    <div className="Profile">
      <h2>{username}</h2>
      <Image src={sprite1} roundedCircle />

      <div className="profileButtonContainer">
        <Button className="profileImageBtn" onClick={onImageChange}>프로필 이미지 변경</Button>
        <Button className="profilePasswordBtn" onClick={onPasswordChange}>비밀번호 변경</Button> 
      </div>

      {/* <Button onClick={onImageChange}>프로필 이미지 변경</Button>
      <Button onClick={onPasswordChange}>비밀번호 변경</Button> */}
    </div>
  );
};

export default Profile;
