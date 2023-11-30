import React from 'react';
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
          <Link to="/api/v1/post/upload" className="nav-link">포스트</Link>
        </li>
        <li className="nav-item">
          <Link to="/product" className="nav-link">마켓</Link>
        </li>
        <li className="nav-item">
          <Link to="/park" className="nav-link">내근처</Link>
        </li>
        <li className="nav-item">
          <Link to="/mypage" className="nav-link">마이페이지</Link>
        </li>
        {/* 로그인 상태에 따라 다른 메뉴를 보여줍니다. */}
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
