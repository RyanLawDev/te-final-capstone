<template>
    <body>
  
      <h1 id="tagline">Echo is music</h1>
      <div id="login">
        <p>
            <router-link id="loginButton" class="btn btn-outline-dark" v-bind:to="{ name: 'login' }" v-if="this.$store.state.token == ''">Login Here.</router-link>
          </p>

          <p>
            <router-link id="registerButton" class="btn btn-outline-dark" v-bind:to="{ name: 'register' }" v-if="this.$store.state.token == ''">Need an account? Sign up.</router-link>
          </p>
      </div>
      <div id="features">FEATURED ARTISTS </div>
      <div id="bandCardLoginContainer">
        <band-card id="bandCardLogin" v-bind:band=band v-for="band in bands" v-bind:key="band.id"> </band-card> 
      </div>
  
      <div id="events">EVENTS</div>
      <div id="audio">AUDIO</div>
  
    </body>
  </template>
  
  
  
  
  
  
  <script>
  import authService from "../services/AuthService";
  import BandCard from "../components/BandCard.vue";
  
  export default {
    components: {
      BandCard,
      
    },
    data() {
      return {
        bands: [
        {
          id: '0fgYKF9Avljex0L9Wt5b8Z'
        },
        {
                id: '7muzHifhMdnfN1xncRLOqk'
            },
            {
                id: '0oKv9YcpakBc9vNXGpEKIY'
            }, 
            {
                id: '3aQeKQSyrW4qWr35idm0cy'
            } 
      ],
        user: {
          username: "",
          password: ""
        },
        invalidCredentials: false
      };
    },
    methods: {
      login() {
        authService
          .login(this.user)
          .then(response => {
            if (response.status == 200) {
              this.$store.commit("SET_AUTH_TOKEN", response.data.token);
              this.$store.commit("SET_USER", response.data.user);
              this.$router.push("/dashboard");
            }
          })
          .catch(error => {
            const response = error.response;
  
            if (response.status === 401) {
              this.invalidCredentials = true;
            }
          });
      },
    },
    computed: {
    },
    
    created() {
      authService.getSpotifyToken().then((response) => response.json())
        .then((result) => {
          console.log(result.access_token)
          this.$store.commit("SET_SPOTIFY_TOKEN", result.access_token)
          console.log(this.$store.state.spotifyToken)
  
        })
        .catch((error) => console.error(error))
    }
  
  };
  </script>
  
  <style scoped>
  .form-input-group {
    margin-bottom: 1rem;
  }
  
  label {
    margin-right: 0.5rem;
  }
  
  #login {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100vh;
  }
  
  #tagline {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
  }
  
  #bandCardLoginContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #bandCardLogin {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #features {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #events {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #audio {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  body {
  
    height: 90vh;
    background-image: url('https://res.cloudinary.com/dhimvb83p/image/upload/v1723057687/lgghhapemdvkbeld2bmp.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  
  }
  
  #loginButton {
    margin-right: 10px;
    background-color: #F2C864;
;
  }
  #registerButton {
    background-color: #F2C864;
  }





  </style>