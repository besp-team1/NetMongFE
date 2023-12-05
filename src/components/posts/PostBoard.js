import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../style/posts/PostBoard.css';

function PostBoard() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const authToken = localStorage.getItem('token');

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (pageNumber) => {
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/post/view?page=${pageNumber}`, {
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
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

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

export default PostBoard;