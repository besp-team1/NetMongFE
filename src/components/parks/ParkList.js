import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/parks/ParkList.css';

const ParkList = ({ parks, selectedPark, setSelectedPark }) => {
  
  const navigate = useNavigate();

  const handleParkClick = (park) => {
    setSelectedPark(park); // 공원을 클릭하면 선택된 공원을 업데이트
    console.log(park.id);
    navigate(`/comments/${park.id}`);
  }

  return (
    <div className="park-list">
      <ul>
        {parks.map((park, index) => (
            <li
            key={index}
            onClick={() => handleParkClick(park)}
            style={
              (selectedPark && selectedPark.parkNm) === park.parkNm
                ? { backgroundColor: '#74A3FF', color: 'white' }
                : {}
            }
          >
            <p className="park-name"><strong>공원명:</strong> {park.parkNm}</p>
            <p className="park-address"><strong>주소:</strong> {park.lnmadr}</p>
            <p className="park-phone"><strong>번호:</strong> {park.phoneNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ParkList;