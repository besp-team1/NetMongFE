import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_HOST_URL}/api/v1/members`; 
const authToken = localStorage.getItem('token'); 

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${authToken}`
    },
});

async function unfollowAPI(username) {
  const req = {"username": username};
  console.log("req", req);
  try {
    const response = await axios.post(`${API_BASE_URL}/unfollow`, req ,{
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('언팔로우 에러:', error);
    throw error;
  }
};

export default unfollowAPI;