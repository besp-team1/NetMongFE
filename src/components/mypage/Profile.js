import React, { useState, useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
import sprite1 from "../../assets/images/logo.png"
import '../../style/mypage/Profile.css';
import PasswordChangeButton from './PasswordChangeButton';
import UsernameChangeButton from './UsernameChangeButton';

const Profile = ({onImageChange }) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    const updateUsername = () => {
      setUsername(localStorage.getItem('username') || '');
    };

    window.addEventListener('storage', updateUsername);

    return () => {
      window.removeEventListener('storage', updateUsername);
    };
  }, []);

  return (
    <div className="Profile">
      <Image src={sprite1} roundedCircle />
      <div className="profileButtonContainer">
        <Button className="profileImageBtn" onClick={onImageChange}>프로필 이미지 변경</Button>
        <PasswordChangeButton />
        <UsernameChangeButton />
      </div>
    </div>
  );
};

export default Profile;
