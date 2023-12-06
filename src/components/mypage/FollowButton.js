import React from 'react';
import { Button } from 'react-bootstrap';

const FollowButton = ({ isFollowing, onToggleFollow }) => {
  return (
    <Button onClick={onToggleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;