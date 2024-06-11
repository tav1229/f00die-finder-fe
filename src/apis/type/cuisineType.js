import baseApi from '../baseApi';

export const getCuisineType = async () => {
    try {
        const response = await baseApi('GET', 'CuisineType');
        return response;
    } catch (error) {
        console.error(`Error in getCusineType request: ${error.message}`);
        throw error;
    }
}
