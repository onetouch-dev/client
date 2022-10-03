import axios from "axios";

export const getAuthUser = async () => {
    const config = {
        method: 'get',
        url: 'http://localhost:9000/api/user/profile',
        headers: {
            'Authorization': localStorage.getItem("access-token")
        }
    };
    const response = await axios(config)
    return response;
};

export const login = async (username, password) => {
    const response = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASEURL}/login`,
        data: { username, password }
    });
    return response;
};

export const signup = async (name, email, password) => {
    const response = await axios({
        method: 'post',
        url: 'http://localhost:9000/api/user/signup',
        headers: {
            'Content-Type': 'application/json'
        },
        data: { email, name, password }
    });
    return response;
};

export const logout = async () => {
    const response = await axios({
        method: 'delete',
        url: 'http://localhost:9000/api/user/logout',
        headers: {
            'Content-Type': 'application/json'
        },
        data: { refreshToken: localStorage.getItem("refresh-token") }
    });
    return response;
};

export const refreshToken = async () => {
    const response = await axios({
        method: 'post',
        url: 'http://localhost:9000/api/user/refresh-token',
        headers: {
            'Content-Type': 'application/json'
        },
        data: { refreshToken: localStorage.getItem("refresh-token") }
    });
    return response;
};
