import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_REMOTE_API
});

export default {

    fetchBands() {
        return http.get('/bands');
    },

    fetchBandsById(id) {
        return http.get(`/bands/${id}`);
    }

}