import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_HOST_URL}/api/v1/members`; 
const authToken = localStorage.getItem('token');

const api = axios.create({
  headers: {
      Authorization: `Bearer ${authToken}`
  },
});

async function showMemberAPI(username) {

  try {
    const response = await api.get(`${API_BASE_URL}/${username}`);
    return response.data.data;
  } catch (error) {
    console.error('회원 정보 조회 에러:', error);
    throw error;
  }
};

export default showMemberAPI;