import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../style/posts/SearchPost.css';

function SearchPost({ setIsSearching }) {
  const authToken = localStorage.getItem('token');
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('작성자');
  const [searchWord, setSearchWord] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSearchResults();
  }, [location]);

  const fetchSearchResults = async () => {
    try {
      const params = new URLSearchParams(location.search);
      const categoryParam = params.get('category');
      const searchWordParam = params.get('searchWord');

      const response = await axios.get(`http://localhost:9000/api/v1/post/search?category=${categoryParam}&searchWord=${searchWordParam}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = response.data.data;
      setPosts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchWord(event.target.value);
  };

  const handleSearch = () => {
    setIsSearching && setIsSearching(true);
    navigate(`/post/search?category=${encodeURIComponent(category)}&searchWord=${encodeURIComponent(searchWord)}`);
  };

  return (
    <div>
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
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <div className="post" key={post.postId}>
            <img src={post.imageUrl} alt="post image" />
            <Link to={`/post/${post.postId}`}>
              <h2>{post.title}</h2>
            </Link>
            <h3>{post.writer}</h3>
            <p>{post.content}</p>
            <p>{post.createDate}</p>
          </div>
        ))
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default SearchPost;
