import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../style/layout/Navbar.css';
import logoImage from '../../assets/images/logo.png'; 

function Navbar() {

  const location = useLocation();
  const isMainPage = location.pathname === '/';

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
            <Link to="/market" className="nav-link">마켓</Link>
          </li>
          <li className="nav-item">
            <Link to="/api/v1/parks" className="nav-link">내근처</Link>
          </li>
          <li className="nav-item">
            <Link to="/mypage" className="nav-link">마이페이지</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">로그인/회원가입</Link>
          </li>
        </ul>
      </nav>
    );
    
  }

export default Navbar;
