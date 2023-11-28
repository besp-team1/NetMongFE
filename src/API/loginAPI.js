import axios from "axios";

async function loginAPI(username, password) {
    try {
        const getToken = await axios.post('http://localhost:9000/api/v1/members/login', {
            username: username,
            password: password
        })
            .then((response) => response.data.data.access_token)
            .catch((error) => console.log(error));
        return getToken;

    } catch (e) {
        console.log(e);
    }
}

export default loginAPI;