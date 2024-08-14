import axios from 'axios';

export default {

    createFollow(bandId) {
        return axios.post('/follows', bandId, { headers: { "Content-Type": "text/plain" } });
    },

    deleteFollow(followId) {
        return axios.delete(`/follows/${followId}`);
    },

    fetchFollows() {
        return axios.get('/follows');
    },

    getNotifications() {
        return axios.get('/notifications');
    },

    addNotification(message) {
        return axios.post('/notifications', message, { headers: { "Content-Type": "text/plain" } });
    },

    getFeaturedBands() {
        return axios.get('/featuredBands');
    }

    // fetchBandsById(id) {
    //     return http.get(`/bands/${id}`);
    // }

}