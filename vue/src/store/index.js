import { createStore as _createStore } from 'vuex';
import axios from 'axios';

export function createStore(currentToken, currentUser) {
  let store = _createStore({
    state: {
      client_id: '6dfbf87d4b674b47bb2a927ce31bf66a',
      client_secret: '7984cb02e8b44c6c9582e77d3a350882',
      token: currentToken || '',
      user: currentUser || {},
      spotifyToken: '',
      bandFilter: '',
      follows: [],

      bands: [
        {
          id: 1001,
          name: 'echo',
          album: 'wow guys',
          members: ['josh', 'kari', 'ryan', 'maddie', 'eric'],
          img_url: ['stuff'],
          genres: ['electronic'],
          socials: ['insta', 'twitter', 'facebook']
        },
        {
          id: 1002,
          name: 'brian',
          album: 'wow guys',
          members: ['josh', 'kari', 'ryan', 'maddie', 'eric'],
          img_url: ['stuff'],
          genres: ['pop'],
          socials: ['insta', 'twitter', 'facebook']
        },
        {
          id: 1003,
          name: 'echo and the bunnymen',
          album: 'wow guys',
          members: ['josh', 'kari', 'ryan', 'maddie', 'eric'],
          img_url: ['stuff'],
          genres: ['rock'],
          socials: ['insta', 'twitter', 'facebook']
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
      }
    }
  });
  return store;
}
