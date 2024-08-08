import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_REMOTE_API
});

export default {

  login(user) {
    return http.post('/login', user)
  },

  register(user) {
    return http.post('/register', user)
  },

  getSpotifyToken() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic NTVmYmE3OWNhOGY5NGEyM2I2OGI4OGZhMGFhMzMxMzA6M2M3YzlkNGJmMjkzNDllYTlmMDQ1MjU4YzJhZDVhMGM=");
    myHeaders.append("Cookie", "__Host-device_id=AQBAaAPigyqBUdEoOnynklbwPvsRHEbGarez1Aphm-thneHanC9Z2TtNSr_N72Zr9LwfahtqwT8rjbVUmS_q5mSrx8T9rANvgqQ; __Secure-TPASESSION=AQDUwjFw5e8Iqb2XzK4DdXoyz5BPZr5bisb62pQaf8hkIKgv9084kVLbF2DeS8ILhmlK2bpmT0ZxK9Y9IJa/GIpq/sNB9R4mFrQ=; sp_sso_csrf_token=013acda71940b38c93388246a1d6f59cede5d1e67f31373232393631393034343533; sp_tr=false");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    return fetch("https://accounts.spotify.com/api/token", requestOptions)
  }
}
