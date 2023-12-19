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
    const [noResults, setNoResults] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        const searchWordParam = params.get('searchWord');

        if (category !== categoryParam || searchWord !== searchWordParam) {
            setCategory(categoryParam);
            setSearchWord(searchWordParam);
            setPosts([]);
            setCurrentPage(1);
            setTotalCnt(0);
            fetchSearchResults(1); 
        }
    }, [location.search]); 

    useEffect(() => {
        if (inView) {
            fetchSearchResults(currentPage);
        }
    }, [inView]);

    const fetchLikesCount = async (postId) => {
        const res = await axios.get(`${process.env.REACT_APP_HOST_URL}/api/v1/post/likes/${postId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
    
        return res.data.data.likedCount;
    };    

    const fetchSearchResults = async (pageNumber) => {
        try {
            const params = new URLSearchParams(location.search);
            const categoryParam = params.get('category');
            const searchWordParam = params.get('searchWord');
            
            setLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_HOST_URL}/api/v1/post/categorySearch?category=${categoryParam}&searchWord=${searchWordParam}&page=${pageNumber}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            
            const data = res.data.data;
    
            if (data.totalElements !== totalCnt || data.totalPages >= currentPage){
                const updatedPosts = await Promise.all(data.content.map(async (post) => {
                    const likedCount = await fetchLikesCount(post.postId);
    
                    return {
                        ...post,
                        likedCount,
                    };
                }));
    
                setPosts([...posts, ...updatedPosts]);
                setCurrentPage((currentPage) => currentPage + 1);
                setNoResults(false);
            } else if (data.totalElements === 0) {
                setNoResults(true);
            }
    
            setTotalCnt(data.totalElements);
            setLoading(false);
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
        setPosts([]);
        setCurrentPage(1);
        setTotalCnt(0);
        fetchSearchResults(pageNumber); 
        setCategory('작성자');
        setSearchWord('');
    };

    return (
        <div>
            <div className="search-container">
                <select className="searchCategory" value={category} onChange={handleCategoryChange}>
                    <option value="작성자">작성자</option>
                    <option value="내용">내용</option>
                </select>
                <input type="text" placeholder="검색어를 입력하세요" value={searchWord} onChange={handleSearchInputChange} />
                <button className="searchBtn" onClick={() => handleSearch(1)}>검색</button>
            </div>
            {posts.map((post) => (
                <div className="postItem" key={post.postId}>
                    <h3 className="postItem-username">{post.writer}</h3>
                    <img className="postItem-image" src={`http://localhost:9000/${post.imageUrl}`} alt="post image" />
                    <p className="postItem-likesCount">{post.likedCount}명이 좋아합니다.</p>
                    <Link to={`/post/${post.postId}`} className="postItem-title">
                        <h4 className="postItem-title-text">{post.title}</h4>
                    </Link>
                    <p className="postItem-content">{post.content.split(/(#[^\s]+)/g).map((v, i) => {
                        if (v.match(/#[^\s]+/)) {
                            return <Link key={i} to={`/post/hashtagSearch?hashtag=${v.slice(1)}`}>{v}</Link>;
                        }
                        return v;
                    })}</p>
                    <p className="postItem-date">{post.createDate}</p>
                </div>
            ))}
            <div className="searchResult">
                {noResults ? (
                    <div>작성된 내용이 없습니다.</div>
                ) : (
                    <div ref={ref} style={{ "marginTop": "200px" }}>포스트를 불러오는 중...</div>
                )}
            </div>
            {loading && <p></p>}
        </div>
    );
}

export default SearchPost;
