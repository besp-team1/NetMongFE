import React, { useState } from "react";
import loginAPI from "../../API/loginAPI";
import "../../style/members/LoginForm.css"
import { redirect, useNavigate } from 'react-router-dom';
import getUsernameAPI from "../../API/getUsernameAPI";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginAPI(email, password).then((res) => {
      if (res === 'fail') {
        navigate('/login');
      } else {
        localStorage.setItem('token', res);
        getUsernameAPI(res).then((res) => {
          localStorage.setItem('username', res);
          window.location.assign('/');
        })
      }
    });
  };
  const loginGoogle = () => {
    // 사용자를 구글 로그인 페이지로 리디렉션
    window.location.href = `${process.env.REACT_APP_HOST_URL}/oauth2/authorization/google`;
  };
  

  return (
    <div className="LoginForm-container">
      <form className="form-signin" onSubmit={handleSubmit}>
        <h2 className="form-signin-heading">로그인</h2>
        <label for="inputUsername" className="label">Email</label>
        <input type="text" id="inputUsername" className="form-control" placeholder="Email" value={email} onChange={handleUsernameChange} required autofocus />
        <label for="inputPassword" className="label">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} required />
        <button className="btn btn-lg btn-primary btn-block" type="submit">로그인</button>
      </form>

      <div className="separator">or</div>
      
      <button className="gooleBtn" onClick={loginGoogle}>Google 계정으로 가입</button>
    </div>
  );
};

export default LoginForm;