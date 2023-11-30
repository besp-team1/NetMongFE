import React from 'react';

const welcome = ({ user }) => {
    const username = localStorage.getItem('username');
    const ment = `${username}님 환영합니다.`;

    return (
      <h1>
        {ment}
      </h1>
    );
  };
export default welcome;