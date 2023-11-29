import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createGlobalStyle } from 'styled-components';
import GmarketSansTTFMedium from './fonts/GmarketSansTTFMedium.ttf';
import Main from './components/layout/Main';
import Navbar from './components/layout/Navbar';
import Map from './components/parks/Map';
import Footer from './components/layout/Footer';
import PostForm from './components/posts/PostForm';
import PostDetail from './components/posts/PostDetail';
import MyPage from './components/members/Mypage';
import LoginForm from './components/members/LoginForm';
import PostUpdateForm from './components/posts/PostUpdateForm';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSansTTFMedium';
    src: url(${GmarketSansTTFMedium}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  body {
    font-family: 'GmarketSansTTFMedium', sans-serif;
    width:100%;
    // margin-top: 50px;
    padding: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/park" element={<Map />} />
              <Route path="/api/v1/post/upload" element={<PostForm />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/post/update/:id" element={<PostUpdateForm />} />
              <Route path="/mypage" element={<MyPage/>} />
              <Route path="/login" element={<LoginForm/>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;

