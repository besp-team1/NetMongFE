import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Park.css';

const Park = ({ setParks }) => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [parks, setLocalParks] = useState([]);

  useEffect(() => {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VybmFtZTEyNiIsImF1dGgiOiJtZW1iZXIiLCJleHAiOjE3MDExMzI5MDh9.qjpHw8OINoVIL2Fm7XQ05rjwuwBC6t_SFYhFaH4YaPOqNB3ByRApGLE6AT_XryYeqEaiYyfzdttnKxBf0coc4g';

    axios.get('http://localhost:9000/api/v1/parks/states', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setStates(response.data.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  useEffect(() => {
    if (selectedState) {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VybmFtZTEyNiIsImF1dGgiOiJtZW1iZXIiLCJleHAiOjE3MDExMzI5MDh9.qjpHw8OINoVIL2Fm7XQ05rjwuwBC6t_SFYhFaH4YaPOqNB3ByRApGLE6AT_XryYeqEaiYyfzdttnKxBf0coc4g';

      axios.get(`http://localhost:9000/api/v1/parks/states/${selectedState}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          setCities(response.data.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  }, [selectedState]);
  
  
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    setParks([]);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setParks([]);
  };

  const handleSearch = () => {
    if (selectedState && selectedCity) {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VybmFtZTEyNiIsImF1dGgiOiJtZW1iZXIiLCJleHAiOjE3MDExMzI5MDh9.qjpHw8OINoVIL2Fm7XQ05rjwuwBC6t_SFYhFaH4YaPOqNB3ByRApGLE6AT_XryYeqEaiYyfzdttnKxBf0coc4g';
  
      axios.get(`http://localhost:9000/api/v1/parks/states/${selectedState}/${selectedCity}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          const parkSet = new Set(); // 중복 공원을 제거하기 위한 Set 객체 생성
          const nonDuplicateParks = response.data.data.filter(park => {
            const duplicate = parkSet.has(park.parkNm);
            parkSet.add(park.parkNm);
            return !duplicate; // 중복되지 않은 공원만 남김
          });
  
          console.log(nonDuplicateParks); // 중복 제거 후의 데이터를 콘솔에 출력
          setParks(nonDuplicateParks);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    } else {
      setParks([]);
    }
  };
  
  
  useEffect(() => {
    if (!selectedState || !selectedCity) {
      setParks([]);
    }
  }, [selectedState, selectedCity]);
  

  return (
    <div className="park-container">
      <h1>내 근처 멍멍 산책 공원</h1>
      <h4>우리 집 근처에 이런 산책로가?!</h4>
      <div className="select-container">
        <select className="select-first" value={selectedState} onChange={handleStateChange}>
          <option>시도 선택</option>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
  
        <select value={selectedCity} onChange={handleCityChange}>
          <option>구군 선택</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
        <button className="search-button" onClick={handleSearch}>검색</button>
      </div>
    </div>
  );


};

export default Park;