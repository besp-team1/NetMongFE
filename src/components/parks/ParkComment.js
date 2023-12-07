import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchComments } from '../../API/parkApi';
import ParkCommentForm from './ParkCommentForm';
import ParkCommentList from './ParkCommentList';
import '../../style/parks/ParkComment.css';

const ParkComment = () => {
    const { parkId } = useParams();
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [flag, setFlag] = useState(false);
    const [pageInfo, setPageInfo] = useState({
        totalPages: 1,
        totalElements: 1
    });

    useEffect(() => {
         updateComments();
    }, [page, flag]);

    const register=()=>{
        setFlag(!flag);
    }

    const updateComments = async () => {
        const result = await fetchComments(parkId, page);
        setComments(result.data.content);
        setPageInfo({
            totalPages: result.data.totalPages,
            totalElements: result.data.totalElements
        });
    };

    return (
        <div className="parkComment-container">
            <h2>공원 추천하멍</h2>
            <h6>산책하기 좋은 공원으로 추천합니다!</h6>
            <div className="Parkcomment-container">
                <ParkCommentList parkId={parkId} comments={comments} updateComments={updateComments} pageInfo={pageInfo} setPage={setPage} page={page} />
                <ParkCommentForm parkId={parkId} register={register} updateComments={updateComments} />
            </div>
        </div>
    );
};

export default ParkComment;
