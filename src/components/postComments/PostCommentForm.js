import React, { useState } from 'react';
import axios from 'axios';
import '../../style/postComments/PostCommentForm.css'

const PostCommentForm = ({ postId, onCommentSubmit }) => {
    const [comment, setComment] = useState('');
    const authToken = localStorage.getItem('token');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(
                `http://localhost:9000/api/v1/post/comment/${postId}`,
                { content: comment },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            console.log('댓글이 성공적으로 작성되었습니다:', response.data);
            setComment('');
    
            // 페이지 새로 고침
            window.location.reload();
        } catch (error) {
            console.error('댓글 작성 중 오류 발생:', error.message);
        }
    };        

    return (
        <div className="postCommemntForm-container">
            {/* <div className="chat-container"> */}
                <form onSubmit={handleCommentSubmit} className="PostCommentForm-container">
                    <div className="PostCommentFormtextarea-container">
                        <textarea className="PostCommentFormtextarea" value={comment} onChange={handleCommentChange} />
                        <button className="submitBtn" type="submit">작성</button>
                    </div>
                </form>
            {/* </div> */}
        </div>
    );
};

export default PostCommentForm;
