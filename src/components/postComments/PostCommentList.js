import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/postComments/PostCommentList.css';
import ReportCommentModal from '../reports/ReportCommentModal';

const PostCommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');
    const [editingId, setEditingId] = useState(null);
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

    const handleEditChange = (e) => {
        setEditContent(e.target.value);
    };

    const handleEditSubmit = (e, id) => {
        e.preventDefault();
        editComment(id, editContent);
        setIsEditing(false);
    };

    const handleEditClick = (content, id) => {
        setIsEditing(true);
        setEditContent(content);
        setEditingId(id);
    };

    useEffect(() => {
        fetchComments(page);
    }, [page]);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className="comment-list-container">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id}>
                            <p className="comment-username">{comment.username}</p>
                            <div className="comment-item">
                                {!isEditing || comment.id !== editingId ? (
                                    <div className="comment-content">
                                        {comment.isDeleted ? '삭제된 댓글입니다.' : comment.content}
                                    </div>
                                ) : (
                                    <form onSubmit={(e) => handleEditSubmit(e, comment.id)}>
                                        <input type="text" value={editContent} onChange={handleEditChange} />
                                        <button type="submit">저장</button>
                                    </form>
                                )}
                                {!comment.isDeleted && comment.username === localStorage.getItem('username') && (
                                    <div className="postCommentButton-container">
                                        {!isEditing || comment.id !== editingId ? (
                                            <button onClick={() => handleEditClick(comment.content, comment.id)}>수정</button>
                                        ) : (
                                            <button onClick={() => setIsEditing(false)}>취소</button>
                                        )}
                                        <button onClick={() => deleteComment(comment.id)}>삭제</button>
                                    </div>
                                )}
                                {comment.username !== localStorage.getItem('username') &&  // 현재 사용자가 댓글 작성자와 다른 경우에만 신고 버튼을 렌더링합니다.
                                    <ReportCommentModal commentId={comment.id} />
                                }
                            </div>
                        </div>
                    ))
                ) : (
                    <p>아직 아무도 댓글을 달지 않았어요. <br></br>반려동물에 대한 사랑을 나눠주세요!</p>
                )}
            </div>
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
