import axios from "axios";

async function loginAPI(username, password) {
  const login = await axios.post('http://localhost:9000/api/v1/members/login', {
    username: username,
    password: password
  })
    .then((response) => {
      let rsData = response.data;
      if (rsData.fail === true) {
        alert(rsData.data);
        return 'fail';
      }
      return rsData.data.access_token;
    })
    .catch((error) => {
      alert('잘못된 로그인 접근입니다.');
      return 'fail';
    });
  return login;
}

export default loginAPI;