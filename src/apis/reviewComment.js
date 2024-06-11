import baseApi from './baseApi';

export const getReviewComments = (restaurantId) => {
    return baseApi('GET', `ReviewComment/restaurant/${restaurantId}`);
}

export const createReviewComment = (data) => {
    return baseApi('POST', 'ReviewComment/restaurant', data);
}