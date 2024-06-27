import axios from 'axios';
import { baseUrl } from '../config';


const baseApi = async (method, path, data) => {
  const url = `${baseUrl}/${path}`; // Thay thế bằng URL API của bạn
  const token = localStorage.getItem('access-token'); // Lấy access token từ localStorage

  const options = {
    method: method,
    url: url,
    headers: {
      'Authorization': `Bearer ${token}`, // Thêm access token vào headers
    },
  };

  if (data instanceof FormData && data !== 0) {
    // Nếu data là instance của FormData, không cần đặt 'Content-Type'
    options.data = data;
  } else if (data) {
    // Nếu data không phải là FormData, đặt 'Content-Type' là 'application/json'
    options.headers['Content-Type'] = 'application/json';
    options.data = data;
  }

  try {
    const response = await axios(options);
    return {...response.data, status: response.status};
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.Error[0].Message;
      return { status: error.response.status, message: errorMessage };
    } else {
      return error.message; // Trả về message để có thể sử dụng ở nơi khác nếu cần
    }
  }
};

export default baseApi;

