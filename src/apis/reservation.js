import baseApi from './baseApi';

export const createRevervation = async (data) => {
    try {
        const response = await baseApi('POST', 'Reservation', data);
        return response;
    } catch (error) {
        console.error(`Error in createRevervation request: ${error.message}`);
        throw error;
    }
}

export const getReservationMyRestaurant = async (pageSize = 10, pageNumber = 1, ReservationStatus, SearchValue) => {
    let queryParams = `pageSize=${pageSize}&pageNumber=${pageNumber}`;
    if (ReservationStatus >= 0) {
        queryParams += `&ReservationStatus=${ReservationStatus}`;
    }
    if (SearchValue) {
        queryParams += `&SearchValue=${SearchValue}`;
    }
    return await baseApi('GET', `Reservation/my-restaurant?${queryParams}`);
    // return await baseApi('GET', 'Reservation/my-restaurant');
}

export const getMyReservation = async (pageSize = 10,  pageNumber = 1, ReservationStatus) => {
    let queryParams = `pageSize=${pageSize}&pageNumber=${pageNumber}`;
    if (ReservationStatus >= 0) {
        queryParams += `&ReservationStatus=${ReservationStatus}`;
    }
    return await baseApi('GET', `Reservation/my-reservations?${queryParams}`);
}

export const updateReservationStatus = async (reservationId, reservationStatus) => {
    return await baseApi('PUT', `Reservation?reservationId=${reservationId}&reservationStatus=${reservationStatus}`);
}

export const getReservation = async (reservationId) => {
    return await baseApi('GET', `Reservation/${reservationId}`);
}