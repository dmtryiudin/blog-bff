import {URL} from "./config.js";
import axios from "axios";

export async function addComment(id, body, headers,) {
    try {
        const token = headers.authorization;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const data = (
            await axios.post(
            URL + '/comments/post/' + id,
            body,
            config,
        )).data;

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

export async function deleteComment(id, headers) {
    try {
    const token = headers.authorization;

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

        const data = (
            await axios.delete(
            URL + '/comments/' + id,
            config)).data;

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

export async function updateComment(id, body, headers) {
    try {
        const token = headers.authorization;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const data = (
            await axios.patch(
            URL + '/comments/' + id,
            body,
            config,
        )).data;

        return {
            error: false,
            data
        }
} catch (err) {
        return{
            error: true,
            data: {
                data: err.response?.data,
                status: err.response?.status
            }
        }
}
}

export async function setCommentLike(id, headers) {
    try {
        const token = headers.authorization;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const data = (
            await axios.put(
            URL + '/comments/like/' + id,
            {},
            config)).data;

        return {
            error: false,
            data
        }
} catch (err) {
        return{
            error: true,
            data: {
                data: err.response?.data,
                status: err.response?.status
            }
        }
}
}