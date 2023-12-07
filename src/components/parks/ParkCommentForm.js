import React, { useState } from 'react';
import { postComment } from '../../API/parkApi';
import '../../style/parks/ParkCommentForm.css';

const ParkCommentForm = ({ parkId, register }) => {
    const [comment, setComment] = useState('');
    
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postComment(parkId, comment);
            console.log('댓글이 성공적으로 작성되었습니다:', response);
            register();
            setComment('');
        } catch (error) {
            console.error('댓글 작성 중 오류 발생:', error.message);
        }
    };

    return (
        <form onSubmit={handleCommentSubmit} className="parkComment-form">
            <div className="parkComment-input-container">
            <textarea className="textarea" value={comment} onChange={handleCommentChange} />
                <button type="submit" className="parkSubmit-button">작성</button>
            </div>
        </form>
    );

};

export default ParkCommentForm;
