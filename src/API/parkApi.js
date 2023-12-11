import axios from 'axios';

const authToken = localStorage.getItem('token'); 

const api = axios.create({
    baseURL: `${process.env.REACT_APP_HOST_URL}/api/v1/parks`,
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

  export const addParkComment = (parkId, comment, updateComments) =>
  api
    .post(`/comments/${parkId}`, comment)
    .then((response) => updateComments(response.data.data))
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

// TODO: DELETE 댓글 삭제
export const deleteParkComment = async (commentId) => {
  try {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error.response);
    throw error;
  }
};