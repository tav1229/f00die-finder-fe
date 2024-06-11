import baseApi from './baseApi';

export const totalReservations = async () => {
    return await baseApi('GET', 'admin-dashboard/total-reservations');
}

export const totalRestaurants = async () => {
    return await baseApi('GET', 'admin-dashboard/total-restaurants');
}

export const totalUsers = async () => {
    return await baseApi('GET', 'admin-dashboard/total-users');
}

export const reservationsByMonth = async () => {
    return await baseApi('GET', 'admin-dashboard/reservations-by-month');
}

export const getRestaurants = async (pageNumber = 1, pageSize = 10, status) => {
    // return await baseApi('GET', 'Restaurant/admin');
    let url = `Restaurant/admin?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (status) {
        url += `&status=${status}`;
    }
    return await baseApi('GET', url);
}

export const updateRestaurantStatus = async (restaurantId, status) => {
    return await baseApi('PUT', `Restaurant/status/${restaurantId}`, status);
}

export const getUsers = async (pageNumber = 1, pageSize = 10, status) => {
    let url = `User/users?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (status) {
        url += `&status=${status}`;
    }
    return await baseApi('GET', url);
}

export const updateUserStatus = async (userId, status) => {
    return await baseApi('PUT', `User/status/${userId}?status=${status}`);
}