import { createStore as _createStore } from 'vuex';
import axios from 'axios';

export function createStore(currentToken, currentUser) {
  let store = _createStore({
    state: {
      token: currentToken || '',
      user: currentUser || {},
      bandFilter: '',

      bands: [
        {
            id: 1001,
            name: 'echo',
            album: 'wow guys',
            members: ['josh', 'kari', 'ryan', 'maddie', 'eric'],
            img_url: ['stuff'],
            genre: ['music genre', 'rock', 'hard'],
            socials: ['insta', 'twitter', 'facebook']
        },
        {
            id: 1002,
            name: 'brian',
            album: 'wow guys',
            members: ['josh', 'kari', 'ryan', 'maddie', 'eric'],
            img_url: ['stuff'],
            genre: ['music genre', 'rock', 'hard'],
            socials: ['insta', 'twitter', 'facebook']
        },
        {
            id: 1003,
            name: 'echo and the bunnymen',
            album: 'wow guys',
            members: ['josh', 'kari', 'ryan', 'maddie', 'eric'],
            img_url: ['stuff'],
            genre: ['music genre', 'rock', 'hard'],
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
      LOGOUT(state) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        state.token = '';
        state.user = {};
        axios.defaults.headers.common = {};
      }
    },
  });
  return store;
}
