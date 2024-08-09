import axios from 'axios';

export default {

    createFollow(bandId) {
        return axios.post('/follows', bandId);
    },

    deleteFollow(followId) {
        return axios.delete('/follows/${id}', followId);
    },

    fetchFollows() {
        return axios.get('/follows');
    }

    // fetchBandsById(id) {
    //     return http.get(`/bands/${id}`);
    // }

}