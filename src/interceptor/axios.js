import axios from "axios";

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401) {
        const data = JSON.stringify({
            "refreshToken": localStorage.getItem("refresh-token"),
        });

        const config = {
            method: 'post',
            url: 'http://localhost:9000/api/user/refresh-token',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const response = await axios(config)
        if (response.data.status === 200) {
            localStorage.setItem("refresh-token", response.data.refreshToken);
            localStorage.setItem("access-token", response.data.accessToken);

            return axios(error.config);
        }
    }
    return error.response.data;
});
