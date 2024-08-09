import { createStore as _createStore } from 'vuex';
import axios from 'axios';
import MusicSearchService from "../services/MusicSearchService.js";


export function createStore(currentToken, currentUser) {
  let store = _createStore({
    state: {
      client_id: '6dfbf87d4b674b47bb2a927ce31bf66a',
      client_secret: '7984cb02e8b44c6c9582e77d3a350882',
      token: currentToken || '',
      user: currentUser || {},
      spotifyToken: '',
      bandFilter: '',
      bandId: '',
      follows: [],
      backgrounds: ['https://res.cloudinary.com/dhimvb83p/image/upload/v1723058869/vke7ibqhh9oxrrrsm1vt.jpg', 'https://res.cloudinary.com/dhimvb83p/image/upload/v1723058869/vfvmrdy6fohg4eu79onk.jpg', 'https://res.cloudinary.com/dhimvb83p/image/upload/v1723058869/vblzxcgaqb7d0ionebgw.jpg', 'https://res.cloudinary.com/dhimvb83p/image/upload/v1723057687/lgghhapemdvkbeld2bmp.jpg', 'https://res.cloudinary.com/dhimvb83p/image/upload/v1723057524/tshrlsesbwjos4rygik2.jpg'],

      bands: [
        {
          id: '0fgYKF9Avljex0L9Wt5b8Z'
        }
      ]
    },
    mutations: {
      SET_AUTH_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },
      SET_USER(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
      },
      SET_SPOTIFY_TOKEN(state, newSpotifyToken) {
        state.spotifyToken = newSpotifyToken;
        localStorage.setItem('newSpotifyToken', JSON.stringify(newSpotifyToken));
      },
      LOGOUT(state) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        state.token = '';
        state.user = {};
        axios.defaults.headers.common = {};
      },
      TOGGLE_FOLLOW(state, bandId) {
        const index = state.follows.indexOf(bandId);
        if (index !== -1) {
          // state.follows[index] = !state.follows[index];
          console.log(index);
          state.follows.splice(index, 1);

        } else {
          console.log(index);
          state.follows.push(bandId);
        }
      },
      SET_BAND_TO_FEATURED(state, band) {
        state.bands.push(band);
      }
    }
  });
  return store;
}
