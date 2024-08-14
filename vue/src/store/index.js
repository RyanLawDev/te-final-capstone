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
      bandId: '',
      follows: [],
      notifications: [],
      altImage: 'https://res.cloudinary.com/dhimvb83p/image/upload/v1723565607/zokpawboke8ywbys6z5r.png',
      backgrounds: [ {
        img: 'https://res.cloudinary.com/dhimvb83p/image/upload/v1723058869/vke7ibqhh9oxrrrsm1vt.jpg',
        id: 1, },
        { 
         img: 'https://res.cloudinary.com/dhimvb83p/image/upload/v1723058869/vfvmrdy6fohg4eu79onk.jpg',
         id: 2,},
         {
          img: 'https://res.cloudinary.com/dhimvb83p/image/upload/v1723058869/vblzxcgaqb7d0ionebgw.jpg',
          id:3, },
          {
            img:'https://res.cloudinary.com/dhimvb83p/image/upload/v1723057687/lgghhapemdvkbeld2bmp.jpg',
            id: 4, },
            {
              img: 'https://res.cloudinary.com/dhimvb83p/image/upload/v1723057524/tshrlsesbwjos4rygik2.jpg',
            id: 5, },
            { 
              img: 'https://res.cloudinary.com/dhimvb83p/image/upload/v1723498762/ghoyyy42mgt51y1efrpn.jpg',
              id: 6, }],
            

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
      // TOGGLE_FOLLOW(state, bandId) {
      //   const index = state.follows.indexOf(bandId);
      //   if (index !== -1) {
      //     // state.follows[index] = !state.follows[index];
      //     console.log(index);
      //     state.follows.splice(index, 1);

      //   } else {
      //     console.log(index);
      //     state.follows.push(bandId);
      //   }
      // },
      // SET_BAND_TO_FEATURED(state, band) {
      //   state.bands.push(band);
      // },
      SET_USER_FOLLOWS(state, userFollows) {
        state.follows = userFollows;
      },
      CLEAR_BAND_FILTER(state) {
        state.bandFilter = '';
      }
    }
  });
  return store;
}
