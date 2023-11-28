import axios from "axios";

async function loginAPI(username, token) {
    try {
        const logout = await axios.post('http://localhost:9000/api/v1/members/logout', {
            username: username,
            token: token
        })
            .then((response) => {
                localStorage.removeItem('token');
            })
            .catch((error) => console.log(error));
        return logout;

    } catch (e) {
        console.log(e);
    }
}

export default loginAPI;