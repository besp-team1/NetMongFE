import React from 'react';
import "../../style/members/Welcome.css"

const welcome = ({ user }) => {
    const username = localStorage.getItem('username');
    const ment = `${username}님 환영합니다.`;

    return (
        <>
            <h1 className="welcomeMent">
                {ment}
            </h1>
            <p className="welcomeP">로그인 후 이용해주세요.</p>
        </>
    );
  };
export default welcome;