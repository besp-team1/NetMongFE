import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api/v1/members'; 
const authToken = localStorage.getItem('token'); 

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${authToken}`
    },
});

async function followAPI(username) {
  const req = {"username": username};
  console.log("req", req);
  try {
    const response = await axios.post(`${API_BASE_URL}/follow`, req ,{
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('팔로우 에러:', error);
    throw error;
  }
};

export default followAPI;