import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/layout/Main.css';
import bannerImage from '../../assets/images/banner.jpg'; 
import PostBoard from '../posts/PostBoard';
import SearchPost from '../posts/SearchPost';

function Main() {
  const getRandomNumber = (min, max) => Math.random() * (max - min) + min;
  const [category, setCategory] = useState('작성자');
  const [searchWord, setSearchWord] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchWord(event.target.value);
  };

  const handleSearch = () => {
    setIsSearching(true);
    navigate(`/post/search?category=${encodeURIComponent(category)}&searchWord=${encodeURIComponent(searchWord)}`); // 검색 결과 페이지로 이동
  };

  const snowflakes = Array.from({ length: 100 }).map((_, index) => (
    <div
      key={index}
      className="snowflake"
      style={{
        width: `${getRandomNumber(5, 15)}px`, // 눈송이 크기 랜덤 설정
        height: `${getRandomNumber(5, 15)}px`, // 눈송이 크기 랜덤 설정
        animationDuration: `${getRandomNumber(5, 15)}s`, // 눈송이 속도 랜덤 설정
        left: `${getRandomNumber(0, 100)}%`, // 눈송이 가로 위치 랜덤 설정
      }}
    ></div>
  ));

  return (
    <div className="main-container">
      <img src={bannerImage} alt="Banner" />
      {snowflakes}
      <div className="search-container">
        <select value={category} onChange={handleCategoryChange}>
          <option value="작성자">작성자</option>
          <option value="내용">내용</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchWord}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      {!isSearching && <PostBoard category={category} searchWord={searchWord} />}
      {isSearching && <SearchPost category={category} searchWord={searchWord} setIsSearching={setIsSearching} />}
    </div>
  );
}

export default Main;
