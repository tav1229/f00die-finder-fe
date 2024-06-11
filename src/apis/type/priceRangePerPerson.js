import baseApi from '../baseApi';

export const getPriceRangePerPerson = async () => {
    try {
        const response = await baseApi('GET', 'PriceRangePerPerson');
        return response;
    } catch (error) {
        console.error(`Error in getServingType request: ${error.message}`);
        throw error;
    }
}