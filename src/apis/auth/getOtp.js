import axios from 'axios';
import { baseUrl } from '../../config';

export const getOtp = async (mail, type) => {
    const url = `${baseUrl}/Auth/get-otp`;
    try {
        const response = await axios.post(url, {
            email: mail,
            otpType: type
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error in POST request to ${url}: ${error.message}`);
        throw error;
    }
}