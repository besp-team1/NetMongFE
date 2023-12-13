import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../style/posts/PostBoard.css';

function PostBoard() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [scrollTriggered, setScrollTriggered] = useState(false);
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_HOST_URL}/api/v1/post/view?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = response.data.data;
      if (pageNumber === 1) {
        setPosts(data.content);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data.content]);
      }
      setLoading(false);
      setScrollTriggered(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      setScrollTriggered(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading && !scrollTriggered) {
      setScrollTriggered(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
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
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default PostBoard;
