import axios from 'axios';
import { baseUrl } from '../../config';

export const login = async (data) => {
    const url = `${baseUrl}/Auth/login`;

    try {
        const response = await axios.post(url, data);
        return response.data.data;
    } catch (error) {
        console.error(`Error in POST request to ${url}: ${error.message}`);
    }
}
