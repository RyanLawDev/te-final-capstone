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
    }

    // fetchBandsById(id) {
    //     return http.get(`/bands/${id}`);
    // }

}