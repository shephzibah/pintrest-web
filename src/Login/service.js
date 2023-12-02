import axios from 'axios';

export const PINTEREST_API_URL = 'http://localhost:8000';
export const USERS_API = `${PINTEREST_API_URL}/users`;


export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${USERS_API}/log-in`, credentials);
        return response.data;
    } catch (error) {
        console.error('Login Error:', error.response);
        throw error.response.data;
    }
};