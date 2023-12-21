import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import '../../style/posts/HashtagSearch.css';

function HashtagSearch() {
    const authToken = localStorage.getItem('token');
    const [posts, setPosts] = useState([]);
    const [hashtag, setHashtag] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    const [loading, setLoading] = useState(false);
    const [ref, inView] = useInView();

    const location = useLocation();

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const hashtagParam = params.get('hashtag');
      if (hashtag !== hashtagParam) {
          setHashtag(hashtagParam);
          setPosts([]);
          setCurrentPage(1);
          setTotalCnt(0);
      }
      if (inView) {
          fetchSearchResults(currentPage);
      }
  }, [inView, location, currentPage]);

    const fetchSearchResults = async (pageNumber) => {
        try {
            setLoading(false);
            const res = await axios.get(`${process.env.REACT_APP_HOST_URL}/api/v1/post/hashtagSearch?hashtag=${hashtag}&page=${pageNumber}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            const data = res.data.data;
            if (data.totalElements !== totalCnt || data.totalPages >= currentPage){
                const updatedPosts = await Promise.all(data.content.map(async (post) => {
                  const likesCount = await fetchLikesCount(post.postId);
                  
                  return {
                    ...post,
                    likesCount,
                  };
                }));
                
                setPosts([...posts, ...updatedPosts]);
                setCurrentPage((currentPage) => currentPage + 1);
            }
            setTotalCnt(data.totalElements);
            setLoading(true);
        } catch (error) {
            console.error('포스트를 가져오는데 실패했습니다:', error);
            setLoading(false);
        }
    };

    const fetchLikesCount = async (postId) => {
        const res = await axios.get(`${process.env.REACT_APP_HOST_URL}/api/v1/post/likes/${postId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        return res.data.data.likedCount;
      };

    return (
      <div className="hashtag-search-page">
        <h1 className="search-title">"#{hashtag}" 검색 결과</h1>
        {posts.map((post) => (
          <div className="postItem" key={post.postId}>
            <Link to={`/members/${post.writer}`}>
              <h3 className="postItem-username">{post.writer}</h3>
            </Link> 
            {/* <h3 className="postItem-username">{post.writer}</h3> */}
            <img className="postItem-image" src={`${process.env.REACT_APP_IMAGE_URL}/${post.imageUrl}`} alt="post image" />
            <p className="postItem-likesCount">{post.likesCount}명이 좋아합니다.</p>
            <Link to={`/post/${post.postId}`} className="postItem-title">
              <h2 className="postItem-title-text">{post.title}</h2>
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
        <div ref={ref} style={{"marginTop":"200px"}} className="loading-message">포스트를 불러오는 중...</div>
        {loading && <p className="loading-indicator"></p>}
      </div>
  );
  
}

export default HashtagSearch;
