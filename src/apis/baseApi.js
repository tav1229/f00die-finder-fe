import axios from 'axios';
import { baseUrl } from '../config';
const baseApi = async (method, path, data) => {
  const url = `${baseUrl}/${path}`; // Thay thế bằng URL API của bạn
  const token = localStorage.getItem('access-token'); // Lấy access token từ localStorage
  console.log("hello: ", token)

  const options = {
    method: method,
    url: url,
    headers: {
      'Authorization': `Bearer ${token}`, // Thêm access token vào headers
    },
  };

  if (data instanceof FormData) {
    // Nếu data là instance của FormData, không cần đặt 'Content-Type'
    options.data = data;
  } else if (data) {
    // Nếu data không phải là FormData, đặt 'Content-Type' là 'application/json'
    options.headers['Content-Type'] = 'application/json';
    options.data = data;
  }

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${url}: ${error.message}`);
    throw error;
  }
};

export default baseApi;
