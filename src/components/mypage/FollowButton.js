import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import followAPI from '../../API/followAPI';
import unfollowAPI from '../../API/unfollowAPI';

const FollowButton = ({ username, isFollowing, onFollowChange}) => {
  
  const isf = isFollowing;
  const follow = (async () =>{
    try {
      const followResponse = await followAPI(username);
      if(followResponse === "follow 성공"){
        console.log("follow sungong");
      }
      onFollowChange();
    } catch (error) {
      console.error('팔로우 에러:', error);
    }
  });

  const unfollow = (async () =>{
    try {
      const followResponse = await unfollowAPI(username);
      if(followResponse === "unfollow 성공"){
        console.log("unfollow 성공");
      }
      onFollowChange();
    } catch (error) {
      console.error('언팔로우 에러:', error);
    }
  });

  const onToggleFollow = () => {
    isFollowing ? unfollow() : follow();
  };

  return (
    <Button className="followButton" onClick={onToggleFollow}>
      {isFollowing ? 'UnFollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;