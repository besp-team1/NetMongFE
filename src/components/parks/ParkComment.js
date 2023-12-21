import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchComments, getPark } from '../../API/parkApi';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

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
                 level: 5
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
        try {
            const result = await fetchComments(parkId, page);
            setComments(result.data.content);
            setPageInfo({
                totalPages: result.data.totalPages,
                totalElements: result.data.totalElements
            });
        } catch (error) {
            console.error('댓글 목록 불러오기에 실패했습니다:', error);
        }
    };

    const updatePark = async () => {
        try {
            const result = await getPark(parkId);
            console.log(result);
            setPark(result.data);
        } catch (error) {
            console.error('공원 정보 불러오기에 실패했습니다:', error);
        }
    };
    
    return (
        <div className="parkComment-container">
            <div>
                <h2>{park ? park.parkNm : 'Loading...'} 소개합니다</h2>
            </div>
            <h6>목줄, 배변봉투 지참! 펫티켓을 잘 지켜주세요:)</h6>
            <div className="main-content">
                <div className="left-section">
                <div className="park-info-container">
                    <p className="park-info1">기본 정보</p>
                    <div className="park-info-row">
                        <span className="park-info-label">공원명 </span>
                        <span className="park-info-value">{park ? park.parkNm : 'Loading...'}</span>
                    </div>
                    <div className="park-info-row">
                        <span className="park-info-label">주소 </span>
                        <span className="park-info-value">{park ? park.lnmadr : 'Loading...'}</span>
                    </div>
                    <div className="park-info-row">
                        <span className="park-info-label">전화번호 </span>
                        <span className="park-info-value">{park ? park.phoneNumber : 'Loading...'}</span>
                    </div>
                </div>
                    <div id="map" style={{ width: '100%', height: '300px' }}></div>
                </div>
                <div className="right-section">
                    <button className="parkCommentsButton" onClick={() => navigate(`/parks/${parkId}/comment`)}>
                        후기쓰기
                    </button>
                    {
                        comments && comments.length > 0 ?
                        <ParkCommentList parkId={parkId} comments={comments} updateComments={updateComments} pageInfo={pageInfo} setPage={setPage} page={page} />
                        :
                        <div className="message-box">
                            <p className="p3">아직 작성된 후기가 없어요!</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ParkComment;
