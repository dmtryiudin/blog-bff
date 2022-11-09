import axios from "axios";
import {URL} from "./config.js";

export async function createUser(createUser) {
    try {
        const data = (await axios.post(URL + '/users', createUser,)).data;

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

export async function getAllUsers(substr) {
    try {
        let res;
        if (substr) {
            const fetchData = (
                await axios.get(
                    URL +
                    '/users/?limit=999999999999999999999999999',
                )
            ).data.data;

            res = fetchData.filter((e) => e.name?.toString().indexOf(substr) >= 0);
        }

        else {
            res = (
                await axios.get(
                    URL +
                    '/users/?limit=999999999999999999999999999',
                )).data.data;
        }

        return {
            error: false,
            data: res
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

export async function getUserWithPosts(id) {
    try {
        const user = (
    await axios.get(
        URL + '/users/' + id,
    )
).data;

const postsList = (
    await axios.get(
        URL + `/posts?postedBy=${id}`,
    )
).data;

return {
    error: false,
    data: {
        ...user,
        posts: postsList.data,
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

export async function deleteUser(id, headers) {
    try {
        const token = headers.authorization;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const data = (await axios.delete(
                URL + '/users/' + id,
                config,
            )).data

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

export async function updateUserData(id, data, headers){
    try {
        const token = headers.authorization;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const updateData = (
            await axios.patch(
                URL + '/users/' + id,
                data,
                config,
            )
        ).data;

        return {
            error: false,
            data: updateData
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

export async function updateUserAvatar(id, formData, headers){
    try{
        const token = headers.authorization;

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        const data = (
            await axios.put(
                URL + '/users/upload/' + id,
                formData,
                config,
            )
        ).data;

        return {
            error:false,
            data
        }

    }catch(err){
        return {
            error: true,
            data: {
                data: err.response?.data,
                status: err.response?.status
            }
        }
    }
}