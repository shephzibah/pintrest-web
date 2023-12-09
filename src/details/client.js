import axios from "axios";
import {USERS_API} from "../UserProfile/client";

export const getImageDetails = async (docId, userId, postId) => {
    try {
        const response = await axios.get(`${USERS_API}/details`, {
            params: {
                docId,
                userId,
                postId
            }
        });
        return response.data ? response.data.postDetails : response.data;
    } catch (error) {
        console.error('Error:', error.response);
        throw error.response.data;
    }
}

export const saveComment = async (comment) => {
    try {
        const response = await axios.post(`${USERS_API}/comment`, comment);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response);
        throw error.response.data;
    }
}

export const savePost = async (post) => {
    try {
        const response = await axios.post(`${USERS_API}/savePost`, post);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response);
        throw error.response.data;
    }
}