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
              <Route path="/api/v1/parks" element={<Map />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
