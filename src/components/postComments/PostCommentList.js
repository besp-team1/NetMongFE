import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/postComments/PostCommentList.css'

const PostCommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const authToken = localStorage.getItem('token');

    const fetchComments = async (page) => {
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/post/comment/${postId}?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setComments(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            console.error('댓글 불러오는 중 오류 발생:', error.response.data);
        }
    };

    useEffect(() => {
        fetchComments(page);
    }, [page]);

    // 페이지 번호를 표시하는 컴포넌트를 구성합니다.
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="comment-list-container">
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <p className="comment-username">{comment.username}</p>
                    <div className="comment-content">{comment.content}</div>
                </div>
            ))}
            <div className="pagination">
                <button onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}>{"<"}</button>
                {pageNumbers.map((number) => (
                    <button 
                        key={number} 
                        onClick={() => setPage(number)}
                        className={page === number ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}
                <button onClick={() => setPage((prevPage) => Math.min(prevPage + 1, totalPages))}>{">"}</button>
            </div>
        </div>
    );
};

export default PostCommentList;
