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
  }, [inView, location]);

    const fetchSearchResults = async (pageNumber) => {
        try {
            setLoading(false);
            const res = await axios.get(`http://localhost:9000/api/v1/post/hashtagSearch?hashtag=${hashtag}&page=${pageNumber}`, {
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

    return (
        <div>
          {posts.map((post) => (
            <div className="post" key={post.postId}>
              <img src={post.imageUrl} alt="post image" />
              <Link to={`/post/${post.postId}`}>
                <h2>{post.title}</h2>
              </Link>
              <h3>{post.writer}</h3>
              <p>{post.content.split(/(#[^\s]+)/g).map((v, i) => {
                  if (v.match(/#[^\s]+/)) {
                    return <Link key={i} to={`/post/hashtagSearch?hashtag=${v.slice(1)}`}>{v}</Link>;
                  }
                  return v;
                })}</p>
              <p>{post.createDate}</p>
            </div>
          ))}
          <div ref={ref} style={{"marginTop":"200px"}}>포스트를 불러오는 중...</div>
          {loading && <p></p>}
        </div>
      );
}

export default HashtagSearch;