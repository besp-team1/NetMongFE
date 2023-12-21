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

async function usernameChangeAPI(newUsername) {
  const req = { newUsername };
  try {
    const response = await api.patch(`/change-username`, req);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default usernameChangeAPI;
