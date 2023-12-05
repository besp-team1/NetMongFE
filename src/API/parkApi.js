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

export const addParkComment = (parkId, content, updateComments) =>
  api
    .post(`/comments/${parkId}`, { content }, { 
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      updateComments();
      return response.data.data;
    })
    .catch((error) => console.error("There was an error!", error));

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

export const updateParkComment = async (commentId, content) => {
  try {
    const response = await api.patch(`/comments/${commentId}`, { content });
    return response.data;
  } catch (error) {
    console.error('댓글 수정 중 오류 발생:', error.response);
    throw error;
  }
};

export const deleteParkComment = async (commentId) => {
  try {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error.response);
    throw error;
  }
};

export const getPark = async (parkId) => {
  try {
    const response = await api.get(`/${parkId}`);
    return response.data;
  } catch (error) {
    console.error('공원 정보 불러오는 중 오류 발생:', error);
    return null;
  }
};

export const getLikesCountByPark = async (parkId) => {
  try {
    const response = await api.get(`/likes/${parkId}`);
    return response.data;
  } catch (error) {
    console.error('좋아요 수 불러오는 중 오류 발생:', error);
    return null;
  }
};

export const addLikeToPark = async (parkId) => {
  try {
    const response = await api.post(`/likes/${parkId}`);
    return response.data;
  } catch (error) {
    console.error('좋아요 추가 중 오류 발생:', error);
    return null;
  }
};

export const removeLikeFromPark = async (parkId) => {
  try {
    const response = await api.delete(`/likes/${parkId}`);
    return response.data;
  } catch (error) {
    console.error('좋아요 삭제 중 오류 발생:', error);
    return null;
  }
};
