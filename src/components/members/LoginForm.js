import React, { useState } from "react";
import loginAPI from "../../API/loginAPI";
import "../../style/members/LoginForm.css"
import { redirect, useNavigate } from 'react-router-dom';

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
        navigate('/');
      }
    });
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
    </div>
  );
};

export default LoginForm;