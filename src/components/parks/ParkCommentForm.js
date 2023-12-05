import React, { useState } from 'react';
import { addParkComment } from '../../API/parkApi';
import '../../style/parks/ParkCommentForm.css';

const ParkCommentForm = ({ parkId, updateComments }) => {
    const [content, setContent] = useState('');
    
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        addParkComment(parkId, content, updateComments)
            .then(() => {
                setContent(''); 
            })
            .catch((error) => console.error("댓글 등록 중 오류 발생:", error));
    };
    
    return (
        <form onSubmit={handleCommentSubmit} className="parkComment-form">
            <div className="parkComment-input-container">
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required 
                    className="parkComment-input"
                />
                <button type="submit" className="parkSubmit-button">작성</button>
            </div>
        </form>
    );
};

export default ParkCommentForm;
