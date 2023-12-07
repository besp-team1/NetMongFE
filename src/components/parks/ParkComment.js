import React, { useState, useEffect, useRef } from 'react';
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

    const mapRef = useRef(null);

    useEffect(() => {
         updateComments();
         updatePark();
    }, [page, flag]);

    useEffect(() => {
        const { kakao } = window;
         if(park) {
             var container = document.getElementById('map');
             var options = {
                 center: new kakao.maps.LatLng(park.latitude, park.longitude),
                 level: 3
             };

             mapRef.current = new kakao.maps.Map(container, options); // 지도 객체를 ref에 저장

             var markerPosition = new kakao.maps.LatLng(park.latitude, park.longitude); 
             var marker = new kakao.maps.Marker({
                 position: markerPosition
             });
             marker.setMap(mapRef.current);
             mapRef.current.setCenter(markerPosition);
         }
     }, [park]); // park가 변경될 때마다 useEffect를 실행

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
            <div className="park-info-container"> 
                <p className="park-info">공원명 : {park ? park.parkNm : 'Loading...'}</p> 
                <p className="park-info">주소 : {park ? park.lnmadr : 'Loading...'}</p> 
                <p className="park-info">전화번호 : {park ? park.phoneNumber : 'Loading...'}</p>
            </div> 
            <div id="map" style={{ width: '30%', height: '200px' }}></div>
            <div className="Parkcomment-container">
            <ParkCommentForm parkId={parkId} register={register} updateComments={updateComments} />
            <ParkCommentList parkId={parkId} comments={comments} updateComments={updateComments} pageInfo={pageInfo} setPage={setPage} page={page} />
            </div>
        </div>
    );
};

export default ParkComment;
