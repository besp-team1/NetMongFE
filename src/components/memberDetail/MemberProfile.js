import React from 'react';
import { Button, Image } from 'react-bootstrap';
import sprite1 from "../../assets/images/logo.png"
import '../../style/mypage/Profile.css';

const Profile = ({ username }) => {
  return (
    <div className="Profile">
      <h2>{username}</h2>
      <Image src={sprite1} roundedCircle />
    </div>
  );
};

export default Profile;