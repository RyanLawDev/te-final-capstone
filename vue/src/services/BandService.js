import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_REMOTE_API
});

export default {

    createFollow(bandId) {
        return http.post('/follows', bandId);
    },

    deleteFollow(followId) {
        return http.delete('/follows/${id}', followId);
    },

    fetchFollows() {
        return http.get('/follows');
    }

    // fetchBandsById(id) {
    //     return http.get(`/bands/${id}`);
    // }

}