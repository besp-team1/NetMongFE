import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../style/layout/Navbar.css';
import logoImage from '../../assets/images/logo.png';
import logoutAPI from "../../API/logoutAPI";
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isLoggedIn = checkLoggedInStatus();
  const navigate = useNavigate();
  let username = '';

  if (isLoggedIn) {username = localStorage.getItem('username');}
  
  const [isAdmin, setIsAdmin] = useState(username === 'admin');

  useEffect(() => {
    setIsAdmin(username === 'admin');
  }, [isLoggedIn]);

  function checkLoggedInStatus() {
    const token = localStorage.getItem('token');
    if (token) {let username = localStorage.getItem('username');}
    return token ? true : false;
  }

  const handleLogout = async(e) => {
    e.preventDefault();
    await logoutAPI(localStorage.getItem('token')).then((res)=>{
        localStorage.removeItem('token');
        navigate('/');
      })
    };

  return (
    <nav className={`navbar ${isMainPage ? 'main-page' : ''}`}>
      <Link to="/" className="logo">
        <img src={logoImage} alt="로고" />
      </Link>
      <ul className="menu">
        <li className="nav-item">
          <Link to="/post/upload" className="nav-link">포스트</Link>
        </li>
        <li className="nav-item">
          <Link to="/api/v1/products" className="nav-link">마켓</Link>
        </li>
        <li className="nav-item">
          <Link to="/parks" className="nav-link">내근처</Link>
        </li>
        <li className="nav-item">
          {isAdmin ? (
            <Link to="/admin/reports" className="nav-link">
              신고 관리
            </Link>
          ) : (
            <Link to="/mypage" className="nav-link">
              마이페이지
            </Link>
          )}       
        </li>
        {isLoggedIn ? (
          <>
            <li className="nav-item" onClick={handleLogout}>
              <Link className="nav-link">로그아웃</Link>
            </li>
            <li className="nav-item">
              {username}님 환영합니다!
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">로그인</Link>
            </li>
            <li className="nav-item">
              <Link to="/join" className="nav-link">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );

}

export default Navbar;