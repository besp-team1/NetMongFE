import React, { useEffect, useState } from 'react';
import { getCommentsOfPark, updateParkComment, deleteParkComment } from '../../API/parkApi';
import '../../style/parks/ParkCommentList.css';

const ParkCommentList = ({ parkId, comments, setComments, page, setPage, pageInfo, setPageInfo, updateComments }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        getCommentsOfPark(parkId, page, setComments, setPageInfo, updateComments);
    }, [parkId, page]);

    const pageNumbers = [];
    for (let i = 1; i <= pageInfo.totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleEditChange = (e) => {
        setEditContent(e.target.value);
      };

      const handleEditClick = (content, id) => {
        setIsEditing(true);
        setEditContent(content);
        setEditingId(id);
      };

      const handleEditSubmit = (e, id) => {
        e.preventDefault();
        updateParkComment(id, editContent)
          .then(() => {
            updateComments();
            setIsEditing(false);
          })
          .catch((error) => console.error('댓글 수정 중 오류 발생:', error));
    };
    
    const handleDeleteClick = (id) => {
        deleteParkComment(id)
          .then(() => {
            updateComments();
          })
          .catch((error) => console.error('댓글 삭제 중 오류 발생:', error));
    };
    
    return (
        <div>
            <div className="parkComment-list-container">
            {comments.map((comment) => (
                <div key={comment.id}>
                    <div className="parkComment-username">{comment.username}</div>
                    <div className="parkComment-item">
                        {!isEditing || comment.id !== editingId ? (
                        <div className="parkComment-content">{comment.content}</div>
                        ) : (
                        <form onSubmit={(e) => handleEditSubmit(e, comment.id)}>
                            <input type="text" value={editContent} onChange={handleEditChange} />
                            <button type="submit">저장</button>
                        </form>
                        )}
                        {!comment.isEditing || comment.id !== editingId ? (
                        <button className="editBtn" onClick={() => handleEditClick(comment.content, comment.id)}>수정</button>
                        ) : (
                        <button className="cancelBtn" onClick={() => setIsEditing(false)}>취소</button>
                        )}
                        <button className="deleteBtn" onClick={() => handleDeleteClick(comment.id)}>삭제</button>
                    </div>
                </div>
            ))}
            </div>

            <div className="ParkPagination">
                <button onClick={() => setPage(Math.max(page - 1, 1))}>{"<"}</button>
                {pageNumbers.map((number) => (
                    <button 
                        key={number} 
                        onClick={() => setPage(number)}
                        className={page === number ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}
                <button onClick={() => setPage(Math.min(page + 1, pageInfo.totalPages))}>{">"}</button>
            </div>
        </div>
    );
    
};

export default ParkCommentList;
