import axios from "axios";

import { PINTEREST_API_URL } from "../UserProfile/client";

export const IMAGE_API = `${PINTEREST_API_URL}/images`;

export const uploadImage = async (userId, formData) => {
    try {
        const response = await axios.post(`${IMAGE_API}/uploadImage`, formData, {
            params: { userId },
            // headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error.response);
        throw error.response.data;
    }
};
