import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api/v1/members'; 

async function dupUsernameAPI(name) {
  try {
    console.log('username:', name);
    const response = await axios.post(`${API_BASE_URL}/dup-username`, {username: name});
    return response.data;
  } catch (error) {
    console.error('아이디 중복체크 에러:', error);
    throw error;
  }
};

export default dupUsernameAPI;