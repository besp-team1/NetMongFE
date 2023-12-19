import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import Statistics from './Statistics';
import Posts from './Posts';
import { useParams } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import FollowButton from '../mypage/FollowButton';
import showMemberAPI from '../../API/showMemberAPI';
import '../../style/memberDetail/MemberDetail.css';
import '../../style/mypage/Profile.css';
import ImageProfile from '../memberDetail/ImageProfile';
import Username from '../memberDetail/Username';

const MyPage = ({ onImageChange, onPasswordChange}) => {
  const username = localStorage.getItem("username");
  const [followerCount, setFollowerCount] = useState(0);
  const [followeeCount, setFolloweeCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [postCount, setPostCount] = useState(0);


  const fetchUser = async () => {
    try {
      const data = await showMemberAPI(username);
      setFollowerCount(data.followerCount);
      setFolloweeCount(data.followeeCount);
      setIsFollowing(data.following);
      setPostCount(data.postCount);
      return data;
    } catch (error) {
      console.error('회원 정보 조회 에러:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username]);
  
  return (
    <div className="MemberDetail">
      <div className="leftRight">
        <div className="MyPage">
          <Profile username={username} onImageChange={onImageChange} onPasswordChange={onPasswordChange} />
        </div>
        <div className="right-side">
          <Username username={username} />
          <Statistics 
            followerCount={followerCount} 
            followeeCount={followeeCount}
            postCount = {postCount} />
        </div>
      </div>
      <Posts username={username}/>
    </div>
  );
};

export default MyPage;
