import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Profile from './Profile';
import Statistics from './Statistics';
import Posts from './Posts';
import FollowButton from './FollowButton';
import showMemberAPI from '../../API/showMemberAPI';

const MemberDetail = () => {
  const { username } = useParams();
  const [followerCount, setFollowerCount] = useState();
  const [followeeCount, setFolloweeCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {


    const fetchUser = async () => {
      try {
        const data = await showMemberAPI(username);
        console.log(data.followerCount);
        setFollowerCount(data.followerCount);
        setFolloweeCount(data.followeeCount);
        setIsFollowing(data.following);
        return data;
      } catch (error) {
        console.error('회원 정보 조회 에러:', error);
      }
    };

    fetchUser();
  }, [username]);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }
  
  return (
    <div className="MemberDetail">
      <Profile username={username}  />
      <Statistics followerCount={followerCount} 
          followeeCount={followeeCount} />
      <FollowButton isFollowing={isFollowing}  />
      <Posts username={username}/>
    </div>
  );
};

export default MemberDetail;