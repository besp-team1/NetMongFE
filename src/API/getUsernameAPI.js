import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_HOST_URL}/api/v1/members/username`; 
const authToken = localStorage.getItem('token'); 

async function getUsernameAPI(token) {
  const getUsername = await axios.get(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
    .then((response) => {
      let rsData = response.data;
      if (rsData.fail === true) {
        return 'fail';
      }
      return rsData.data;
    })
    .catch((error) => {
      alert('잘못된 접근입니다.');
      return 'fail';
    });
  return getUsername;
}

export default getUsernameAPI;