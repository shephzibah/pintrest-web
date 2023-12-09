import axios from 'axios';

export const PINTEREST_API_URL = 'http://localhost:8000';
export const IMAGES_API = `${PINTEREST_API_URL}/images`;
export const USERS_API = `${PINTEREST_API_URL}/users`;

export const getCategoryImages = async (term) => {
    try {
        const response = await axios.get(`${IMAGES_API}/getCategoryImages`, {
            params: {
                term
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error.response);
        throw error.response.data;
    }
}

export const imageUploadUnsplash = async (image) => {
    try {
        console.log(image)
        const response = await axios.post(`${IMAGES_API}/imageUploadUnsplash`, image);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response);
        throw error.response.data;
    }
}

export const getAllPosts = async () => {
    try {
        const response = await axios.get(`${USERS_API}/get-posts`);
        return response.data;
    } catch (error) {
        console.error('Error:', error.response);
        throw error.response.data;
    }
}