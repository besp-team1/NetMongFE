import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postComment, getPark } from '../../API/parkApi';
import '../../style/parks/ParkCommentForm.css';

const ParkCommentForm = () => {
    const [comment, setComment] = useState('');
    const [park, setPark] = useState(null);
    const [petAllowed, setPetAllowed] = useState(null); 
    const navigate = useNavigate();
    const { parkId } = useParams();

    useEffect(() => {
        const fetchPark = async () => {
            try {
                const result = await getPark(parkId);
                setPark(result.data);
            } catch (error) {
                console.error('공원 정보 불러오기에 실패했습니다:', error);
            }
        };
        fetchPark();
    }, [parkId]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handlePetAllowedChange = (e) => {
        setPetAllowed(e.target.value === 'true');  // 라디오 버튼의 값이 'true'이면 true, 아니면 false
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postComment(parkId, comment, petAllowed); 
            console.log('댓글이 성공적으로 작성되었습니다:', response);
            setComment('');
            navigate(`/parks/${parkId}`);
        } catch (error) {
            console.error('댓글 작성 중 오류 발생:', error.message);
        }
    };

    return (
        <div className="parkComment-container">
            <div>
                <h2>{park ? park.parkNm : 'Loading...'} 후기쓰기</h2>
            </div>
            <h6>공원 산책 후, 경험을 공유해 주세요!</h6>
            <form onSubmit={handleCommentSubmit} className="parkComment-form">
                <div className="parkComment-input-container">
                <div>
                        <label>
                            <input type="radio" value="true" checked={petAllowed === true} onChange={handlePetAllowedChange} />
                            출입 가능
                        </label>
                        <label>
                            <input type="radio" value="false" checked={petAllowed === false} onChange={handlePetAllowedChange} />
                            출입 불가능
                        </label>
                    </div>
                    <textarea id="comment" className="ParkCommentTextarea" placeholder="소중한 공원 후기를 댓글로 남겨주세요." value={comment} onChange={handleCommentChange} />
                </div>
                <button type="submit" className="parkSubmit-button">전송</button>
            </form>
        </div>
    );
};

export default ParkCommentForm;
