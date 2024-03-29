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
import Product from './components/products/Product';
import ProductList from './components/products/AllProduct';
import ProductDetail from './components/products/ProductDetails';
import ProductEdit from './components/products/ProductEdit';
import PostForm from './components/posts/PostForm';
import PostDetail from './components/posts/PostDetail';
import Mypage from './components/mypage/Mypage';
import LoginForm from './components/members/LoginForm';
import Join from './components/members/Join';
import Welcome from './components/members/Welcome';
import PostUpdateForm from './components/posts/PostUpdateForm';
import ParkComment from './components/parks/ParkComment';
import ParkCommentForm from './components/parks/ParkCommentForm';
import SearchPost from './components/posts/SearchPost';
import HashtagSearch from './components/posts/HashtagSearch';
import ReportsPage from './components/reports/ReportsPage';
import ReportedComments from './components/reports/ReportedComments';
import ReportedPosts from './components/reports/ReportedPosts';
import MemberDetail from './components/memberDetail/MemberDetail';
import Carts from './components/carts/Carts';
import AddToCart from './components/carts/AddToCart';
import GoogleLoginRedirect from './components/members/GoogleLogin';

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
              <Route path="/product" element={<Product />} />
              <Route path="/api/v1/products" element={<ProductList />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="/api/v1/products/:productId/edit" element={<ProductEdit />} />
              <Route path="/products/update" element={<Product />} />
              <Route path="/park" element={<Map />} />
              <Route path="/parks" element={<Map />} />
              <Route path="/post/upload" element={<PostForm />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/post/update/:id" element={<PostUpdateForm />} />
              <Route path="/mypage" element={<Mypage/>} />
              <Route path="/login" element={<LoginForm/>} />
              <Route path="/join" element={<Join/>} />
              <Route path="/welcome" element={<Welcome/>} />
              <Route path="/parks/:parkId" element={<ParkComment />} />
              <Route path="/parks/:parkId/comment" element={<ParkCommentForm />} /> 
              <Route path="/parks/likes" element={<Map />} /> 
              <Route path="/parks/petAllowed" element={<Map />} /> 
              <Route path="/post/categorySearch" element={<SearchPost />} />
              <Route path="/post/hashtagSearch" element={<HashtagSearch />} />
              <Route path="/admin/reports" element={<ReportsPage />}>
                <Route path="posts" element={<ReportedPosts />} />
                <Route path="comments" element={<ReportedComments />} />
              </Route>              
              <Route path="/members/:username" element={<MemberDetail />} />
              <Route path="/members/:username" element={<MemberDetail />} />
              <Route path="/api/v1/products/cart" element={<Carts />} />
              <Route path="/api/v1/products/cart/:productId" element={<AddToCart />} />
              <Route path="/login/google/token/:token" element={<GoogleLoginRedirect />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
