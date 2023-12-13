import React from 'react';
import '../../style/mypage/statistics.css';

const statistics = ({ followerCount, followeeCount, postCount }) => {
  return (
    <div className="Statistics">
      <p>작성한 포스트 갯수: {postCount}</p>
      <p>팔로우 수: {followerCount}</p>
      <p>팔로잉 수: {followeeCount}</p>
    </div>
  );
};

export default statistics;
