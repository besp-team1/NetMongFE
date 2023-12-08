import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api/v1/post/member'; 
const authToken = localStorage.getItem('token'); 

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${authToken}`
    },
});

async function getPostsByUsernameAPI(username, pageNumber) {
  try {
    const response = await api.get(`${API_BASE_URL}/${username}?page=${pageNumber}`);
    return response.data.data;
  } catch (error) {
    console.error('멤버 포스트 조회 에러:', error);
    throw error;
  }
};

export default getPostsByUsernameAPI;