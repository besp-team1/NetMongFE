import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../style/posts/SearchPost.css';

function SearchPost({ setIsSearching }) {
    const authToken = localStorage.getItem('token');
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState('작성자');
    const [searchWord, setSearchWord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
    fetchSearchResults(currentPage);
    }, [currentPage]);

    const fetchSearchResults = async (pageNumber) => {
        try {
            const params = new URLSearchParams(location.search);
            const categoryParam = params.get('category');
            const searchWordParam = params.get('searchWord');
            
            const response = await axios.get(`http://localhost:9000/api/v1/post/search?category=${categoryParam}&searchWord=${searchWordParam}&page=${pageNumber}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            const data = response.data.data;
            setPosts(data.content);
            setTotalPages(data.totalPages);
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

    const handleSearch = (pageNumber) => {
        setIsSearching && setIsSearching(true);
        navigate(`/post/search?category=${encodeURIComponent(category)}&searchWord=${encodeURIComponent(searchWord)}&page=${pageNumber}`);
    };

    const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
    <div>
        <div className="search-container">
            <select value={category} onChange={handleCategoryChange}>
                <option value="작성자">작성자</option>
                <option value="내용">내용</option>
            </select>
            <input type="text" placeholder="검색어를 입력하세요" value={searchWord} onChange={handleSearchInputChange} />
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
        <div className="pagination">
            <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}>{"<"}</button>
            {pageNumbers.map((number) => (
            <button 
            key={number} 
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
            >
            {number}
            </button>
            ))}
            <button onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}>{">"}</button>
            </div>
        </div>
    );
}

export default SearchPost;
