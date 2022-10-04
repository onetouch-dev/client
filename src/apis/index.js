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

export const changePassword = async (currentP, newP) => {
    const response = await axios({
        method: 'patch',
        url: 'http://localhost:9000/api/user/change-password',
        headers: {
            'Authorization': localStorage.getItem("access-token"),
            'Content-Type': 'application/json'
        },
        data: {
            currentPassword: currentP,
            newPassword: newP
        }
    });

    return response;
};

export const updateProfile = async (payload) => {
    Object.keys(payload).forEach(key => {
        if (payload[key] === null) {
            delete payload[key];
        }
    });
    const response = await axios({
        method: 'put',
        url: 'http://localhost:9000/api/user/update',
        headers: {
            'Authorization': localStorage.getItem("access-token"),
            'Content-Type': 'application/json'
        },
        data: payload
    });

    return response;
};
