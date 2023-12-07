import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchComments, getPark } from '../../API/parkApi';
import ParkCommentForm from './ParkCommentForm';
import ParkCommentList from './ParkCommentList';
import '../../style/parks/ParkComment.css';

const ParkComment = () => {
    const { parkId } = useParams();
    const [park, setPark] = useState(null);
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [flag, setFlag] = useState(false);
    const [pageInfo, setPageInfo] = useState({
        totalPages: 1,
        totalElements: 1
    });

    useEffect(() => {
         updateComments();
         updatePark();
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

    const updatePark = async () => {
        const result = await getPark(parkId);
        console.log(result);
        setPark(result.data);
    };
    
    return (
        <div className="parkComment-container">
            <h2>공원 추천하멍</h2>
            <h6>산책하기 좋은 공원으로 추천합니다!</h6>
            <p>공원명 : {park ? park.parkNm : 'Loading...'}</p> 
            <p>주소 : {park ? park.lnmadr : 'Loading...'}</p> 
            <p>전화번호 : {park ? park.phoneNumber : 'Loading...'}</p> 
            <div className="Parkcomment-container">
                <ParkCommentList parkId={parkId} comments={comments} updateComments={updateComments} pageInfo={pageInfo} setPage={setPage} page={page} />
                <ParkCommentForm parkId={parkId} register={register} updateComments={updateComments} />
            </div>
        </div>
    );
};

export default ParkComment;
