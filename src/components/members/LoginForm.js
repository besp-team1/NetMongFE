import React, { useState } from "react";
import loginAPI from "../../API/loginAPI";
import "../../style/members/LoginForm.css"
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await loginAPI(username, password).then((token)=>{
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        navigate('/');
    });
    
  };

  return (
    <div className="container">
      <form className="form-signin" onSubmit={handleSubmit}>
        <h2 className="form-signin-heading">로그인</h2>
        <label for="inputUsername" className="label">Username</label>
        <input type="text" id="inputUsername" className="form-control" placeholder="Username" value={username} onChange={handleUsernameChange} required autofocus />
        <label for="inputPassword" className="label">Password</label>
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={password} onChange={handlePasswordChange} required />
        <button className="btn btn-lg btn-primary btn-block" type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;