import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/parks/ParkList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { getPark, addLikeToPark, removeLikeFromPark, getLikesCountByPark, getParksWithPetAllowed } from '../../API/parkApi';

const ParkList = ({ parks, selectedPark, setSelectedPark, setParks }) => {
  const navigate = useNavigate();
  const [likesCount, setLikesCount] = useState(0);
  const [likedParks, setLikedParks] = useState({});
  const authToken = localStorage.getItem('token');

  const handleParkClick = (park) => {
    setSelectedPark(park);
    navigate(`/parks/${park.id}`);
  };

  useEffect(() => {
    if (authToken) {
      parks.forEach(async (park) => {
        const response = await getPark(park.id);
        if (response) {
          setLikedParks(prev => ({
            ...prev,
            [park.id]: response.data.isLiked,
          }));
          fetchLikesCount(park.id);
        }
      });
    } else {
      setLikedParks({});
    }
  }, [authToken, parks]);

  const fetchLikesCount = async (parkId) => { 
    const response = await getLikesCountByPark(parkId); 
    if (response) {
        setLikesCount(prev => ({
          ...prev,
          [parkId]: response.data.likedCount,
        }));
    }
  };

  const handleLike = async (parkId, event) => {
    event.stopPropagation();
  
    if (likedParks[parkId]) {
      const response = await removeLikeFromPark(parkId);
      if (response !== null) {
        setLikedParks(prev => ({
          ...prev,
          [parkId]: false,
        }));
        fetchLikesCount(parkId);
        setSelectedPark(null); 
        setParks((prev) => prev.filter((park) => park.id !== parkId)); 
      }
    } else {
      const response = await addLikeToPark(parkId);
      if (response !== null) {
        setLikedParks(prev => ({
          ...prev,
          [parkId]: true,
        }));
        fetchLikesCount(parkId);
      }
    }
  };
  
  const sortedParks = [...parks].sort((a, b) => {
    if (selectedPark && selectedPark.parkNm === a.parkNm) {
      return -1;
    }
    if (selectedPark && selectedPark.parkNm === b.parkNm) {
      return 1;
    }
    return (likesCount[b.id] || 0) - (likesCount[a.id] || 0);
  });

  return (
    <div className="park-list">
      <ul>
        {sortedParks.map((park, index) => (
          <li
            key={index}
            onClick={() => handleParkClick(park)}
            style={
              (selectedPark && selectedPark.parkNm) === park.parkNm
                ? { backgroundColor: '#74A3FF', color: 'white' }
                : {}
            }
          >
            <p className="park-name">
              <strong>공원명:</strong> {park.parkNm}
            </p>
            <p className="park-address">
              <strong>주소:</strong> {park.lnmadr}
            </p>
            <p className="park-phone">
              <strong>번호:</strong> {park.phoneNumber}
            </p>
            <div className="likePark-container">
              <button className="btn-likePark" onClick={(event) => handleLike(park.id, event)}>
                {likedParks[park.id] ? <FontAwesomeIcon icon={solidHeart} /> : <FontAwesomeIcon icon={regularHeart} />}
              </button>
              <p>{likesCount[park.id] || 0}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkList;
