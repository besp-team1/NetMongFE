import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api/v1/members'; 

async function joinAPI(formData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/join`, formData);
    return response.data.data;
  } catch (error) {
    console.error('회원가입 에러:', error);
    throw error;
  }
};

export default joinAPI;