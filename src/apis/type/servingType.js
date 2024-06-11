import baseApi from '../baseApi';

export const getServingType = async () => {
    try {
        const response = await baseApi('GET', 'ServingType');
        return response;
    } catch (error) {
        console.error(`Error in getServingType request: ${error.message}`);
        throw error;
    }
}