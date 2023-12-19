import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../style/postComments/PostCommentList.css';
import ReportCommentModal from '../reports/ReportCommentModal';
import ReplyForm from './ReplyForm';

const PostCommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [replyingCommentId, setReplyingCommentId] = useState(null);  // 대댓글 작성 폼을 표시할 댓글의 ID를 저장하는 상태
    const [showingRepliesId, setShowingRepliesId] = useState(null);
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

    const handleReplyClick = (commentId) => {
        if (replyingCommentId === commentId) {
          setReplyingCommentId(null);  // 이미 대댓글 작성 폼이 표시중인 경우, 폼을 숨깁니다.
        } else {
          setReplyingCommentId(commentId);  // 그렇지 않은 경우, 대댓글 작성 폼을 표시합니다.
        }
      };

    const handleShowRepliesClick = (commentId) => {
        setShowingRepliesId(commentId);  // "답글 더 보기" 버튼을 클릭하면 해당 댓글의 ID를 저장합니다.
      };
    
      const handleHideRepliesClick = () => {
        setShowingRepliesId(null);  // "답글 숨기기" 버튼을 클릭하면 대댓글 리스트를 숨깁니다.
      };

    return (
        <div>
            <div className="comment-list-container">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id}>
                            <div className="comment-header">
                            <p className="comment-username">{comment.username}</p>
                            {!comment.isDeleted && comment.username === localStorage.getItem('username') && (
                                    <div className="postCommentButton-container">
                                        {!isEditing || comment.id !== editingId ? (
                                            <button className="edit-delete-button" onClick={() => handleEditClick(comment.content, comment.id)}>수정</button>
                                        ) : (
                                            <button className="edit-delete-button" onClick={() => setIsEditing(false)}>취소</button>
                                        )}
                                        <button className="edit-delete-button" onClick={() => deleteComment(comment.id)}>삭제</button>
                                    </div>
                                )}
                            </div>
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
                                {comment.username !== localStorage.getItem('username') &&  // 현재 사용자가 댓글 작성자와 다른 경우에만 신고 버튼을 렌더링합니다.
                                    <ReportCommentModal commentId={comment.id} />
                                }
                                
                            </div>
                            <button className="reply-button" onClick={() => handleReplyClick(comment.id)}>
                                            {replyingCommentId === comment.id ? '답글 닫기' : '답글 달기'}
                                        </button>
                            {replyingCommentId === comment.id && <ReplyForm commentId={comment.id} />}
                            {showingRepliesId !== comment.id ? (
                                <button className="reply-button" onClick={() => handleShowRepliesClick(comment.id)}>답글 더 보기</button>
                            ) : (
                                <button className="reply-button" onClick={handleHideRepliesClick}>답글 숨기기</button>
                            )}
                            {comment.childCommentsIds.map((childComment) => (
                                    <div key={childComment.id} className="comment-reply-item">
                                        <p className="comment-username">{childComment.username}</p>
                                        <p className="comment-content">{childComment.content}</p>
                                        <button className="reply-button" onClick={() => handleReplyClick(childComment.id)}>
                                            {replyingCommentId === childComment.id ? '답글 닫기' : '답글 달기'}
                                        </button>
                                        {replyingCommentId === childComment.id && <ReplyForm commentId={childComment.id} />}
                                    </div>
                                ))}
                            
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