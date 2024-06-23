import baseApi from './baseApi';

export const getRecommendedRestaurants = async (pageNumber=1, pageSize=10) => {
    try {
        const response = await baseApi('GET', `Restaurant/recommended?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response;
    } catch (error) {
        console.error(`Error in getRecommendedRestaurants request: ${error.message}`);
        throw error;
    }
}

export const getPublicRecommendedRestaurants = async (pageNumber=1, pageSize=10) => {
    try {
        const response = await baseApi('GET', `Restaurant/public-recommended?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response;
    } catch (error) {
        console.error(`Error in getPublicRecommendedRestaurants request: ${error.message}`);
        throw error;
    }
}

export const getRestaurant = async (restaurantId) => {
    try {
        const response = await baseApi('GET', `Restaurant/${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error(`Error in getRestaurant request: ${error.message}`);
        throw error;
    }
}

export const getRestaurants = async (filters, pageNumber=1) => {
    const queryParams = new URLSearchParams();
    if (filters) {   
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                queryParams.append(key, value);
            }
        });
    }

    try {
        const response = await baseApi('GET', `Restaurant?${queryParams}&pageNumber=${pageNumber}`);
        return response;
    } catch (error) {
        console.error(`Error in getRestaurants request: ${error.message}`);
        throw error;
    }
};

export const createRestaurant = async (data) => {
    try {
        const response = await baseApi('POST', 'Restaurant', data);
        return response.data;
    } catch (error) {
        console.error(`Error in createRestaurant request: ${error.message}`);
        throw error;
    }
}

export const updateRestaurant = async (data) => {
    try {
        const response = await baseApi('PUT', 'Restaurant', data);
        return response.data;
    } catch (error) {
        console.error(`Error in updateRestaurant request: ${error.message}`);
        throw error;
    }
}

export const getMyRestaurant = async () => {
    try {
        const response = await baseApi('GET', 'Restaurant/my-restaurant');
        return response.data;
    }
    catch (error) {
        console.error(`Error in getMyRestaurant request: ${error.message}`);
        throw error;
    }
}

export const uploadImage = async (data) => {
    try {
        const response = await baseApi('POST', 'Restaurant/images', data);
        return response.data;
    } catch (error) {
        console.error(`Error in uploadImage request: ${error.message}`);
        throw error;
    }
}

export const deleteImage = async (imageId) => {
    try {
        const data= [imageId]
        const response = await baseApi('DELETE', `Restaurant/images`, data);
        return response.data;
    } catch (error) {
        console.error(`Error in deleteImage request: ${error.message}`);
        throw error;
    }
}

export const getMySavedRestaurant = async (pageNumber=1, pageSize=10) => {
    try {
        const response = await baseApi('GET', `Restaurant/my-saved-restaurants?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response;
    } catch (error) {
        console.error(`Error in getMySavedRestaurant request: ${error.message}`);
        throw error;
    }
}

export const saveRestaurant = async (restaurantId) => {
    return await baseApi('POST', `Restaurant/save`, restaurantId);
}

export const unsaveRestaurant = async (restaurantId) => {
    return await baseApi('POST', `Restaurant/unsave`, restaurantId);
}