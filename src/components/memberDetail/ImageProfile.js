import React from 'react';
import { Image } from 'react-bootstrap';
import sprite1 from "../../assets/images/logo.png"
import '../../style/mypage/Profile.css';

const ImageProfile = () => {
  return (
    <div className="Profile">
      <Image src={sprite1} roundedCircle />
    </div>
  );
};

export default ImageProfile;
