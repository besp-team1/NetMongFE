import React from 'react';
import Profile from './Profile';
import Statistics from './Statistics';
import Posts from './Posts';

const MyPage = ({ user, onImageChange, onPasswordChange, onToggleFollow }) => {
  return (
    <div className="MyPage">
      <Profile user={user} onImageChange={onImageChange} onPasswordChange={onPasswordChange} />
      <Statistics user={user} />
      <Posts/>
    </div>
  );
};

export default MyPage;