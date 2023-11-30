import React, { useState } from 'react';
import { addParkComment } from '../../API/parkApi';
import '../../style/parks/ParkCommentForm.css';

const ParkCommentForm = ({ parkId, updateComments }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        addParkComment(parkId, { content }, updateComments);
        setContent('');
        window.location.reload();
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <div className="comment-input-container">
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    required 
                    className="comment-input"
                />
                <button type="submit" className="submit-button">작성</button>
            </div>
        </form>
    );
};

export default ParkCommentForm;