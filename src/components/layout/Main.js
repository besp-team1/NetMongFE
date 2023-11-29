import React from 'react';
import '../../style/layout/Main.css';
import bannerImage from '../../assets/images/banner.jpg'; 

function Main() {
  const getRandomNumber = (min, max) => Math.random() * (max - min) + min;

  const snowflakes = Array.from({ length: 100 }).map((_, index) => (
    <div
      key={index}
      className="snowflake"
      style={{
        width: `${getRandomNumber(5, 15)}px`, // 눈송이 크기 랜덤 설정
        height: `${getRandomNumber(5, 15)}px`, // 눈송이 크기 랜덤 설정
        animationDuration: `${getRandomNumber(5, 15)}s`, // 눈송이 속도 랜덤 설정
        left: `${getRandomNumber(0, 100)}%`, // 눈송이 가로 위치 랜덤 설정
      }}
    ></div>
  ));

  return (
    <div className="main-container">
      <img src={bannerImage} alt="Banner" />
      {snowflakes}
    </div>
  );
}

export default Main;
