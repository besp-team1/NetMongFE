import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../style/posts/SearchPost.css';
import { useInView } from 'react-intersection-observer';

function SearchPost({ setIsSearching }) {
    const authToken = localStorage.getItem('token');
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState('작성자');
    const [searchWord, setSearchWord] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ref, inView] = useInView();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
    if (inView) {
        fetchSearchResults(currentPage);
      }
    }, [inView]);

    const fetchSearchResults = async (pageNumber) => {
        try {
            const params = new URLSearchParams(location.search);
            const categoryParam = params.get('category');
            const searchWordParam = params.get('searchWord');
            
            setLoading(false);
            const res = await axios.get(`http://localhost:9000/api/v1/post/categorySearch?category=${categoryParam}&searchWord=${searchWordParam}&page=${pageNumber}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            
            const data = res.data.data;
            if (data.totalElements !== totalCnt || data.totalPages >= currentPage){
                setPosts([...posts, ...data.content]);
                setCurrentPage((currentPage) => currentPage + 1);
            }
            setTotalCnt(data.totalElements);
            setLoading(true);
        } catch (error) {
            console.error('포스트를 가져오는데 실패했습니다:', error);
            setLoading(false);
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
        navigate(`/post/categorySearch?category=${encodeURIComponent(category)}&searchWord=${encodeURIComponent(searchWord)}&page=${pageNumber}`);
    };

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
        {posts.map((post) => (
        <div className="post" key={post.postId}>
            <img src={post.imageUrl} alt="post image" />
            <Link to={`/post/${post.postId}`}>
                <h2>{post.title}</h2>
            </Link>
            <h3>{post.writer}</h3>
            <p>{post.content}</p>
            <p>{post.createDate}</p>
        </div>
        ))}
        <div ref={ref} style={{"marginTop":"200px"}}>포스트를 불러오는 중...</div>
        {loading && <p></p>}
    </div>
    );
}

export default SearchPost;
