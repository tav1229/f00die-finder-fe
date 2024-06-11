import axios from 'axios';
import { baseUrl } from '../../config';

export const login = async (data) => {
    const url = `${baseUrl}/Auth/login`;

    try {
        const response = await axios.post(url, data);
        return response.data.data;
    } catch (error) {
        if (error.response) {
            const errorMessage = error.response.data.Error[0].Message;
            console.error('Lỗi1:', error.response.data.Error);
            return { status: error.response.status, message: errorMessage };
        } else {
            // Lỗi khác, không phải từ server
            console.error('Lỗi2:', error.message);
            return error.message; // Trả về message để có thể sử dụng ở nơi khác nếu cần
        }
    }
}
