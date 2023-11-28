import React from 'react';
import '../../style/layout/Main.css';
import bannerImage from '../../assets/images/banner.jpg'; 

function Main() {
  return (
    <div className="main-container">
        <img src={bannerImage} />
    </div>
  );
}

export default Main;
