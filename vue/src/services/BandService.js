import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_REMOTE_API
});

export default {

    createFollow(user, band) {
        return http.post('/follows', user, band);
    },

    deleteFollow(user, band) {
        return http.delete('/follows/${id}', user, band);
    },

    fetchFollows() {
        return http.get('/follows');
    }

    // fetchBandsById(id) {
    //     return http.get(`/bands/${id}`);
    // }

}