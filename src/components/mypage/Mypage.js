import React from 'react';
import Profile from './Profile';
import Statistics from './Statistics';
import Posts from './Posts';

const username = localStorage.getItem("username");

const MyPage = ({ user, onImageChange, onPasswordChange}) => {
  console.log(username);
  return (
    <div className="MyPage">
      <Profile username={username} onImageChange={onImageChange} onPasswordChange={onPasswordChange} />
    </div>
  );
};

export default MyPage;
