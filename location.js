import axios from "axios";

export async function getLocation(ip) {
    try {
        const data = (await axios.get(`http://ip-api.com/json/${ip}`)).data;

        return {
            error: false,
            data
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