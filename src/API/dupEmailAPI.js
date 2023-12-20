import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_HOST_URL}/api/v1/members`; 

async function dupEmailAPI(email) {
  try {
    console.log('username:', email);
    const response = await axios.post(`${API_BASE_URL}/dup-email`, {"email": email});
    return response.data;
  } catch (error) {
    console.error('이메일 중복체크 에러:', error);
    throw error;
  }
};

export default dupEmailAPI;