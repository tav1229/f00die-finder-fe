import baseApi from './baseApi';

export const totalReservations = async () => {
    return await baseApi('GET', 'RestaurantOwnerDashboard/total-reservations');
}

export const reservationsByMonth = async () => {
    return await baseApi('GET', 'RestaurantOwnerDashboard/reservations-by-month');
}

export const distinctUserCount = async () => {
    return await baseApi('GET', 'RestaurantOwnerDashboard/distinct-user-reservation-count');
}