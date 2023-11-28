/* global kakao */
import React, { useEffect, useRef, useState } from 'react';
import Park from './Park';
import ParkList from './ParkList';
import '../../style/parks/Map.css';

const Map = () => {
  const [parks, setParks] = useState([]); // 공원 데이터를 저장할 상태
  const mapRef = useRef(null); // 지도 객체를 저장할 ref
  const [activeWindow, setActiveWindow] = useState(null); // 현재 활성화된 인포윈도우를 추적하는 상태
  const [selectedPark, setSelectedPark] = useState(null); // 선택된 공원을 관리하는 상태

  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };

    mapRef.current = new kakao.maps.Map(container, options); // 지도 객체를 ref에 저장

    var markerPosition = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(mapRef.current);

  }, []);

  useEffect(() => {
    let markers = [];
  
    let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
  
    parks.forEach(park => {
      var markerPosition = new kakao.maps.LatLng(park.latitude, park.longitude);
      var marker = new kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(mapRef.current);
    
      markers.push(marker);
    
      // 마커를 클릭했을 때의 이벤트 리스너를 설정
      kakao.maps.event.addListener(marker, 'click', function() {
        // 클릭한 마커에 해당하는 공원 정보를 보여주는 인포윈도우를 생성
        var iwContent = '<div style="padding:5px;">공원 이름: ' + park.parkNm + '<br>전화번호: ' + park.phoneNumber + '<br>주소: ' + park.lnmadr + '</div>';
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: true,
          zIndex: 1
        });
        
        // 이전에 열려 있던 인포윈도우가 있다면 닫아준다
        if (activeWindow) {
          activeWindow.close();
        }

        // 인포윈도우를 마커위에 표시
        infowindow.open(mapRef.current, marker);

        // 현재 열린 인포윈도우를 추적
        setActiveWindow(infowindow); 

        setSelectedPark(park); // 선택된 공원을 업데이트

        // 선택된 공원을 배열의 맨 앞으로 이동
        setParks((prevParks) => {
          const newParks = [...prevParks]; // 기존 공원 배열 복사
          const selectedParkIndex = newParks.findIndex((prevPark) => prevPark.parkNm === park.parkNm); // 선택된 공원의 인덱스 찾기
          newParks.splice(selectedParkIndex, 1); // 선택된 공원 제거
          newParks.unshift(park); // 배열의 맨 앞에 선택된 공원 추가

          return newParks;
        });
      });
    
      minLat = Math.min(minLat, park.latitude);
      maxLat = Math.max(maxLat, park.latitude);
      minLng = Math.min(minLng, park.longitude);
      maxLng = Math.max(maxLng, park.longitude);
    });
    
  
    if (parks.length > 0) {
      // 마커들의 범위를 나타내는 사각형 생성
      const bounds = new kakao.maps.LatLngBounds(
        new kakao.maps.LatLng(minLat, minLng),
        new kakao.maps.LatLng(maxLat, maxLng)
      );
  
      // 지도의 영역을 사각형의 영역으로 설정
      mapRef.current.setBounds(bounds);
    }
  
    return () => {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
    };
  }, [parks, activeWindow]);
  
  return (
    <div className="map-container">
      <Park setParks={setParks} /> {/* 상태 변경 함수를 Park 컴포넌트에 전달 */}
      <div className={`map-park-container ${parks.length > 0 ? "with-list" : ""}`}>
        <div id="map"></div>
        {parks.length > 0 && <ParkList parks={parks} selectedPark={selectedPark} setSelectedPark={setSelectedPark} />} {/* 상태 변경 함수를 ParkList 컴포넌트에 전달 */}
      </div>
    </div>
  );
};

export default Map;