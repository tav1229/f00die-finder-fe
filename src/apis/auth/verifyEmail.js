import axios from 'axios';
import { baseUrl } from '../../config';

export const verifyEmail = async (otp, token) => {
    const url = `${baseUrl}/Auth/verify-email?otp=${otp}`;
    console.log("ccc: ", otp, token);
    try {
        const response = await axios({
            method: 'post',
            url: url,
            headers: {
                'Authorization': `Bearer ${token}` // Thêm token vào header
            }
            // Không truyền body
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error in POST request to ${url}: ${error.message}`);
        throw error; // Nên throw error để có thể xử lý nó ở nơi gọi hàm này
    }
}
