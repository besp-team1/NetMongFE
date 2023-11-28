import React, { useState, useEffect } from 'react';
import { getParksStates, getParksCities, getParksInCity } from '../../API/parkApi';
import '../../style/parks/Park.css';

const Park = ({ setParks }) => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [parks, setLocalParks] = useState([]);

  useEffect(() => {
    getParksStates(setStates)
  }, []);

  useEffect(() => {
    getParksCities(selectedState, setCities)
  }, [selectedState]);

  const handleSearch = () => {
    getParksInCity(selectedState, selectedCity, setParks);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity('');
    setParks([]);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setParks([]);
  };

  useEffect(() => {
    if (!selectedState || !selectedCity) {
      setParks([]);
    }
  }, [selectedState, selectedCity]);

  return (
    <div className="park-container">
      <h2>내 근처 멍멍 산책 공원</h2>
      <h6>우리 집 근처에 이런 산책로가?!</h6>
      <div className="select-container">
        <select className="select-first" value={selectedState} onChange={handleStateChange}>
        <option value="">시도 선택</option>
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
