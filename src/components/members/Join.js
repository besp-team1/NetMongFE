import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/members/Join.css';
import joinAPI from '../../API/joinAPI';
import { useNavigate } from 'react-router-dom';
import dupUsernameAPI from  "../../API/dupUsernameAPI";
import dupEmailAPI from '../../API/dupEmailAPI';

const Join = () => {
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    realname: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    joinAPI(formData).then((username)=>{
      localStorage.setItem('username', username);
      navigate('/welcome');
    })
    
  };

  const checkUsernameAvailability = async (e) => {
    e.preventDefault();
    
      const response = await dupUsernameAPI(
        formData.username
      );
      if (response.resultCode === 'S-1') {
        setIsUsernameAvailable(true);
        setUsernameMessage('사용가능한 아이디입니다.');
      } else {
        setIsUsernameAvailable(false);
        setUsernameMessage('이미 사용중인 아이디입니다.');
      }
    } 

    const checkEmailAvailability = async (e) => {
      e.preventDefault();
      
        const response = await dupEmailAPI(
          formData.email
        );
        if (response.resultCode === 'S-1') {
          setIsEmailAvailable(true);
          setEmailMessage('사용가능한 이메일입니다.');
        } else {
          setIsEmailAvailable(false);
          setEmailMessage('이미 사용중인 이메일입니다.');
        }
      } 

  return (
    <div className="join-container">
      <h1>회원가입</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Button
            variant="secondary"
            type="button"
            onClick={checkEmailAvailability}
            name='checkDupButton'
          >
            이메일 중복체크
          </Button>
          {emailMessage && (
            <p className={isEmailAvailable ? 'text-success' : 'text-danger'}>
              {emailMessage}
            </p>
          )}
        </Form.Group>
      <Form.Group controlId="formUsername">
          <Form.Label>Nickname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Nickname"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Button
            variant="secondary"
            type="button"
            onClick={checkUsernameAvailability}
            name='checkDupButton'
          >
            닉네임 중복체크
          </Button>
          {usernameMessage && (
            <p className={isUsernameAvailable ? 'text-success' : 'text-danger'}>
              {usernameMessage}
            </p>
          )}

        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRealname">
          <Form.Label>Real Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter real name"
            name="realname"
            value={formData.realname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary btn-block" type="submit" disabled={!isUsernameAvailable || !isEmailAvailable}>
          Join
        </Button>
      </Form>
    </div>
  );
};

export default Join;
