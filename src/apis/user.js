import baseApi from './baseApi';

export const getMyInfo = async () => {
    try {
        const response = await baseApi('GET', 'User/my-info');
        return response.data;
    } catch (error) {
        console.error(`Error in getMyInfo request: ${error.message}`);
        throw error;
    }
}

export const updateMyInfo = async (data) => {
    try {
        const response = await baseApi('PUT', 'User', data);
        return response.data;
    } catch (error) {
        console.error(`Error in updateMyInfo request: ${error.message}`);
        throw error;
    }
}
