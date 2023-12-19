import axios from 'axios';

const url = process.env.REACT_APP_HOST_URL;
const API_BASE_URL = `${url}/api/v1/members`;
const authToken = localStorage.getItem('token');

const api = axios.create({
    baseURL: API_BASE_URL,
  });
  
  api.interceptors.request.use(function (config) {
    const authToken = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  });

async function passwordChangeAPI(oldPassword, newPassword) {
  const req = { oldPassword, newPassword };
  console.log("req", req);
  try {
    const response = await api.patch(`/change-password`, req);
    return response.data;
  } catch (error) {
    console.error('비밀번호 변경 에러:', error);
    throw error;
  }
};

export default passwordChangeAPI;
