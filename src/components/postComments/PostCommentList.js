import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/postComments/PostCommentList.css';

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

    const editComment = async (id, content) => {
        try {
            const response = await axios.patch(`http://localhost:9000/api/v1/post/comment/${id}`, { content }, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            fetchComments(page);
        } catch (error) {
            console.error('댓글 수정 중 오류 발생:', error.response.data);
        }
    };

    const deleteComment = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:9000/api/v1/post/comment/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            fetchComments(page);
        } catch (error) {
            console.error('댓글 삭제 중 오류 발생:', error.response.data);
        }
    };

    useEffect(() => {
        fetchComments(page);
    }, [page]);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="comment-list-container">
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <p className="comment-username">{comment.username}</p>
                    <div className="comment-content">{comment.isDeleted ? '삭제된 게시글입니다.' : comment.content}</div>
                    {!comment.isDeleted && comment.username === localStorage.getItem('username') && (
                        <div>
                            <button onClick={() => editComment(comment.id, '수정된 댓글')}>수정</button>
                            <button onClick={() => deleteComment(comment.id)}>삭제</button>
                        </div>
                    )}
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
