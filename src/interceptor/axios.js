import axios from "axios";

import { refreshToken } from "../apis";
import { setToken } from "../helper";

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401) {
        const response = await refreshToken()
        if (response.data.status === 200) {
            const { data: { refreshToken, accessToken } } = response;
            setToken(accessToken, refreshToken)
            return axios(error.config);
        }
    }
    return error
});
