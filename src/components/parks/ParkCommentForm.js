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
        <form onSubmit={handleSubmit} className="parkComment-form">
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