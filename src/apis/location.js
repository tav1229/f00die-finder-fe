import baseApi from './baseApi';

export const getProvinceOrCity = async () => {
    try {
        const response = await baseApi('GET', 'Location/province-or-city');
        return response;
    } catch (error) {
        console.error(`Error in getProvinceOrCity request: ${error.message}`);
        throw error;
    }
}

export const getDistrict = async (provinceOrCityId) => {
    try {
        const response = await baseApi('GET', `Location/district/${provinceOrCityId}`);
        return response;
    }
    catch (error) {
        console.error(`Error in getDistrict request: ${error.message}`);
        throw error;
    }
}

export const getWard = async (districtId) => {
    try {
        const response = await baseApi('GET', `Location/ward-or-commune/${districtId}`);
        return response;
    }
    catch (error) {
        console.error(`Error in getWard request: ${error.message}`);
        throw error;
    }
}
