import baseApi from '../baseApi';

export const getAdditionalService = async () => {
    try {
        const response = await baseApi('GET', 'AdditionalService');
        return response;
    } catch (error) {
        console.error(`Error in getCusineType request: ${error.message}`);
        throw error;
    }
}
