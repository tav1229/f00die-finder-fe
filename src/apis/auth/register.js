import axios from 'axios';
import { baseUrl } from '../../config';


export const register = async (data) => {
    const url = `${baseUrl}/Auth/register`;

    try {
        const response = await axios.post(url, data);
        console.log("res: ", response.data)
        return response.data.data;
    } catch (error) {
        console.error(`Error in POST request to ${url}: ${error.message}`);
    }
}