import axios from "axios";
import {URL} from "./config.js";

export async function auth(request) {
    try {
        const token = (
            await axios.post(
                URL + '/auth',
                request,
            )
        ).data.token;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const userData = (
    await axios.get(
        URL + '/auth/user',
        config,
    )
).data;

return {
    error: false,
    data: {
        userData,
        token,
    }
};
} catch (err) {
    return {
        error: true,
        data: {
            data: err.response?.data,
            status: err.response?.status
        }
    }
}
}

export async function getUserByToken(headers) {
    const token = headers.authorization;
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
    };

    const userData = (await axios.get(URL + '/auth/user', config)).data;

    return {
        error: false,
        data: userData
    }
} catch (err) {
    return {
        error: true,
        data: {
            data: err.response?.data,
            status: err.response?.status
        }
    }
}
}