import axios from 'axios';

const authToken = localStorage.getItem('token'); 

const api = axios.create({
    baseURL: 'http://localhost:9000/api/v1/parks',
    headers: {
        Authorization: `Bearer ${authToken}`
    },
});

export const getParksStates = (setStates) =>
  api
    .get("/states")
    .then((response) => setStates(response.data.data))
    .catch((error) => console.error("There was an error!", error));

export const getParksCities = (selectedState, setCities) => {
  if (selectedState) {
    api
      .get(`/states/${selectedState}`)
      .then((response) => setCities(response.data.data))
      .catch((error) => console.error("There was an error!", error));
  }};

export const getParksInCity = (selectedState, selectedCity, setParks) => {
  if (selectedState && selectedCity) {
    api
      .get(`/states/${selectedState}/${selectedCity}`)
      .then((response) => {
        const parkSet = new Set();
        const nonDuplicateParks = response.data.data.filter((park) => {
          const duplicate = parkSet.has(park.parkNm);
          parkSet.add(park.parkNm);
          return !duplicate;
        });
        console.log(nonDuplicateParks);
        setParks(nonDuplicateParks);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  } else {
    setParks([]);
  }};  

// POST 선택한 공원의 댓글 작성 기능 
export const addParkComment = (parkId, comment, setComment) =>
  api
    .post(`/comments/${parkId}`, comment)
    .then((response) => setComment(response.data.data))
    .catch((error) => console.error("There was an error!", error));

// GET 선택한 공원의 댓글 조회
export const getCommentsOfPark = (parkId, page, setComments, setPageInfo) =>
  api
    .get(`/comments/${parkId}?page=${page}`)
    .then((response) => {
        setComments(response.data.data.content);
        setPageInfo({
            totalPages: response.data.data.totalPages,
            totalElements: response.data.data.totalElements
        });
    })
    .catch((error) => console.error("There was an error!", error));

