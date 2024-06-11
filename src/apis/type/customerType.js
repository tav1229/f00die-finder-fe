import baseApi from '../baseApi';

export const getCustomerType = async () => {
    try {
        const response = await baseApi('GET', 'CustomerType');
        return response;
    } catch (error) {
        console.error(`Error in getCustomerType request: ${error.message}`);
        throw error;
    }
}