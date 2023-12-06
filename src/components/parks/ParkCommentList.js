import React, { useEffect, useState } from 'react';
import '../../style/parks/ParkCommentList.css';
import { fetchComments, editComment, deleteComment } from '../../API/parkApi';

const ParkCommentList = ({ parkId }) => {
    const [comments, setComments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleFetchComments = async (page) => {
        try {
            const result = await fetchComments(parkId, page);
            setComments(result.data.content);
            setTotalPages(result.data.totalPages);
        } catch (error) {
            console.error('댓글 불러오는 중 오류 발생:', error);
        }
    };

    const handleEditComment = async (id, content) => {
        try {
            await editComment(id, content);
            handleFetchComments(page);
        } catch (error) {
            console.error('댓글 수정 중 오류 발생:', error);
        }
    };

    const handleDeleteComment = async (id) => {
        try {
            await deleteComment(id);
            handleFetchComments(page);
        } catch (error) {
            console.error('댓글 삭제 중 오류 발생:', error);
        }
    };

    const handleEditChange = (e) => {
        setEditContent(e.target.value);
    };

    const handleEditSubmit = (e, id) => {
        e.preventDefault();
        handleEditComment(id, editContent);
        setIsEditing(false);
    };

    const handleEditClick = (content, id) => {
        setIsEditing(true);
        setEditContent(content);
        setEditingId(id);
    };

    useEffect(() => {
        handleFetchComments(page);
    }, [page]);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="parkComment-list-container">
            {comments.map((comment) => (
                <div key={comment.id}>
                    <div className="parkComment-username">{comment.username}</div>
                    <div className="parkComment-item">
                        {!isEditing || comment.id !== editingId ? (
                            <div className="parkComment-content">
                                {comment.isDeleted ? '삭제된 게시글입니다.' : comment.content}
                            </div>
                        ) : (
                            <form onSubmit={(e) => handleEditSubmit(e, comment.id)}>
                                <input type="text" value={editContent} onChange={handleEditChange} />
                                <button type="submit">저장</button>
                            </form>
                        )}
                        {!comment.isDeleted && comment.username === localStorage.getItem('username') && (
                            <div>
                                {!isEditing || comment.id !== editingId ? (
                                    <button className="editBtn" onClick={() => handleEditClick(comment.content, comment.id)}>수정</button>
                                ) : (
                                    <button className="cancelBtn" onClick={() => setIsEditing(false)}>취소</button>
                                )}
                                <button className="deleteBtn" onClick={() => handleDeleteComment(comment.id)}>삭제</button>

                            </div>
                        )}
                    </div>
                </div>
            ))}
            <div className="ParkPagination">
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

export default ParkCommentList;
