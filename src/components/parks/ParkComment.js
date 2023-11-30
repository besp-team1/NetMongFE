import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import ParkCommentForm from './ParkCommentForm';
import ParkCommentList from './ParkCommentList';
import '../../style/parks/ParkComment.css';

const ParkComment = () => {
    const { parkId } = useParams();
    const [comments, setComments] = useState([]);

    const updateComments = (newComment) => {
        setComments([...comments, newComment]);
    };

    return (
        <div className="parkComment-container">
            <h2>공원 추천하멍</h2>
            <h6>산책하기 좋은 공원으로 추천합니다!</h6>
            <div className="comment-container">
                <ParkCommentList parkId={parkId} comments={comments} setComments={setComments} />
                <ParkCommentForm parkId={parkId} updateComments={updateComments} />
            </div>
        </div>
    );
    
};

export default ParkComment;