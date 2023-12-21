import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import Statistics from '../mypage/Statistics';
import Posts from '../mypage/Posts';
import FollowButton from '../mypage/FollowButton';
import showMemberAPI from '../../API/showMemberAPI';
import ImageProfile from './ImageProfile';
import Username from './Username';
import '../../style/memberDetail/MemberDetail.css';
import '../../style/mypage/Profile.css';

const MemberDetail = () => {
  const { username } = useParams();
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
        <div className="left-side">
          <ImageProfile />
          <FollowButton
            className="followButton" username={username} isFollowing={isFollowing} onFollowChange={fetchUser} />
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

export default MemberDetail;