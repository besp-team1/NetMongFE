import React from 'react';
import '../../style/mypage/statistics.css';

const statistics = ({ followerCount, followeeCount, postCount }) => {
  return (
<div className="Statistics">
  <p className="Statistics-p">포스트 <span className="Statistics-count">{postCount}</span></p>
  <p className="Statistics-p">팔로우 <span className="Statistics-count">{followerCount}</span></p>
  <p className="Statistics-p">팔로잉 <span className="Statistics-count">{followeeCount}</span></p>
</div>
  );
};

export default statistics;
