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

    addNotification(notification) {
        return axios.post('/notifications', notification);
    }

    // fetchBandsById(id) {
    //     return http.get(`/bands/${id}`);
    // }

}