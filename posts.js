import axios from "axios";
import {URL} from "./config.js";

export async function createPost(body, headers) {
    try {
        const token = headers.authorization;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const newPostData = (await axios.post(URL + '/posts', body, config,)).data;

        return {
            error: false,
            data: newPostData
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

export async function updatePostImage(id, formData, headers){
    try{
        const token = headers.authorization;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const data = (await axios.put(
            URL + '/posts/upload/' + id,
            formData,
            config,
        )).data;

        return {
            error: false,
            data
        }
    }catch (err){
        return {
            error: true,
            data: {
                data: err.response?.data,
                status: err.response?.status
            }
        }
    }
}

export async function getAllPosts({ skip, search }) {
    try {
        let res;
        if (search) {
            res = (
                await axios.get(
                    URL +
                    '/posts/' +
                    `?skip=${skip}&search=${search}`,
                )
            ).data;
        }

        else {
            res = (await axios.get(
                    URL + '/posts/' + `?skip=${skip}`,
                )).data;
        }

        return {
            data: res,
            error: false
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

export async function getPostWithComments(id) {
    try {
        const post = (
    await axios.get(
        URL + '/posts/' + id,
    )
).data;

const comments = (
    await axios.get(
        URL + '/comments/post/' + id,
    )
).data;

return {
    error: false,
    data: {
        ...post,
        comments,
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

export async function deletePost(id, headers) {
    try {
        const token = headers.authorization;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const data = (
            await axios.delete(
            URL + '/posts/' + id,
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

export async function updatePost(id, body, headers) {
    try {
        const token = headers.authorization;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const data = (await axios.patch(
            URL + '/posts/' + id,
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

export async function setPostLike(id, headers) {
    try {
        const token = headers.authorization;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const data = (
            await axios.put(
            URL + '/posts/like/' + id,
            {},
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