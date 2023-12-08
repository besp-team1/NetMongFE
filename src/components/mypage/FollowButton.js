import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import followAPI from '../../API/followAPI';

const FollowButton = ({ username }, isFollowed) => {
  const [isFollowing, setIsFollowing] = useState(isFollowed);

  const onToggleFollow = async () => {
    try {
      const followResponse = await followAPI(username);
      if(followResponse === "follow 성공"){
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.error('팔로우 에러:', error);
    }
  };

  return (
    <Button onClick={onToggleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;