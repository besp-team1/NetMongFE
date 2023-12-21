import axios from "axios";

async function logoutAPI(username, token) {
    try {
        const logout = await axios.post(`${process.env.REACT_APP_HOST_URL}/api/v1/members/logout`,{}, {
            headers:{
              'Authorization': `Bearer ${token}`
            },
        })
        .then((response) => {
          localStorage.removeItem('username');
          localStorage.removeItem('token');
        })
        .catch((error) => console.log(error));
        return logout;

    } catch (e) {
        console.log(e);
    }
}

export default logoutAPI;