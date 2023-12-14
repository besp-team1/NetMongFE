import React from 'react';
import '../../style/mypage/Profile.css';

const Username = ({ username }) => {
  return (
    <div className="Profile">
      <h2 className="Profile-username">{username}</h2>
    </div>
  );
};

export default Username;