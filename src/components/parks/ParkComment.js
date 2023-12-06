import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchComments } from '../../API/parkApi';
import ParkCommentForm from './ParkCommentForm';
import ParkCommentList from './ParkCommentList';
import '../../style/parks/ParkComment.css';

const ParkComment = () => {
    const { parkId } = useParams();
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({
        totalPages: 1,
        totalElements: 1
    });

    const updateComments = async () => {
        await fetchComments(parkId, page, setComments, setPageInfo, updateComments);
    };
    
    return (
        <div className="parkComment-container">
            <h2>공원 추천하멍</h2>
            <h6>산책하기 좋은 공원으로 추천합니다!</h6>
            <div className="Parkcomment-container">
                <ParkCommentList parkId={parkId} comments={comments} setComments={setComments} page={page} setPage={setPage} pageInfo={pageInfo} setPageInfo={setPageInfo} updateComments={updateComments} />
                <ParkCommentForm parkId={parkId} updateComments={updateComments} />
            </div>
        </div>
    );
};

export default ParkComment;
