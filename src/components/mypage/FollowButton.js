import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import followAPI from '../../API/followAPI';
import unfollowAPI from '../../API/unfollowAPI';

const FollowButton = ({ username, isFollowing, onFollowChange}) => {

  const follow = (async () =>{
    try {
      const followResponse = await followAPI(username);
      if(followResponse.resultCode === "S-1"){
      } else if (followResponse.resultCode === "F-1") {
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
    //TODO: 토스트ui적용
      <Button className="followButton" onClick={onToggleFollow}>
        {isFollowing ? 'UnFollow' : 'Follow'}
      </Button>
   
  );
};

export default FollowButton;