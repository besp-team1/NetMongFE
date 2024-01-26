import axios from 'axios';

const authToken = localStorage.getItem('token'); 

const api = axios.create({
    baseURL: `${process.env.REACT_APP_HOST_URL}/api/v1/parks`,
});

// 매번 요청을 보낼 때 토큰을 새롭게 가져오도록 axios 인터셉터 활용
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
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

// 댓글 조회 GET 요청
export const fetchComments = async (parkId, page) => {
  try {
      const response = await api.get(`/comments/${parkId}?page=${page}`);
      return response.data;
  } catch (error) {
      console.error('댓글 불러오는 중 오류 발생:', error.response.data);
  }
};

// 댓글 수정 PATCH 요청
export const editComment = async (id, content) => {
  try {
      const response = await api.patch(`/comments/${id}`, { content });
      return response.data;
  } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error.response.data);
  }
};

// 댓글 삭제 DELETE 요청
export const deleteComment = async (id) => {
  try {
      const response = await api.delete(`/comments/${id}`);
      return response.data;
  } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error.response.data);
  }
};

// 댓글 작성 POST 요청
export const postComment = async (parkId, comment) => {
  try {
      const response = await api.post(`/comments/${parkId}`, { content: comment });
      return response.data;
  } catch (error) {
      console.error('댓글 작성 중 오류 발생:', error.response.data);
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
    if (error.response) {
      if (error.response.status === 400) {
        alert('이미 좋아요를 누른 공원입니다.');
      } else if (error.response.status === 409) {
        alert('다른 사용자가 동시에 좋아요를 눌렀습니다. 다시 시도해주세요.');
      }
      window.location.reload();
    } else {
      console.error('좋아요 추가 중 오류 발생:', error);
    }
    return null;
  }
};

export const removeLikeFromPark = async (parkId) => {
  try {
    const response = await api.delete(`/likes/${parkId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      alert('다른 사용자가 동시에 좋아요를 삭제했습니다. 다시 시도해주세요.');
      window.location.reload();
    } else {
      console.error('좋아요 삭제 중 오류 발생:', error);
    }
    return null;
  }
};

export const getLikedParksByUser = (setParks) =>
  api
    .get("/likes")
    .then((response) => setParks(response.data.data))
    .catch((error) => console.error("There was an error!", error));
