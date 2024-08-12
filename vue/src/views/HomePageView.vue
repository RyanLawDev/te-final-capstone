<template>
  <div class="page">
    <div class="background-image"></div>
    <div class="content">
      <cycling-word />

      <div id="login">
        <p>
          <router-link id="loginButton" class="btn btn-outline-dark" v-bind:to="{ name: 'login' }"
            v-if="this.$store.state.token == ''">Login.</router-link>
        </p>

        <p>
          <router-link id="registerButton" class="btn btn-outline-dark" v-bind:to="{ name: 'register' }"
            v-if="this.$store.state.token == ''">Need an account? Sign up.</router-link>
        </p>
      </div>

      <div id="features">FEATURED ARTISTS</div>
      <div id="bandCardLoginContainer">
        <band-card id="bandCardLogin" v-bind:band="band" v-for="band in bands" v-bind:key="band.id"> </band-card>
      </div>

      <div id="events">EVENTS</div>
      <div id="audio">AUDIO</div>
    </div>
  </div>
</template>

  
  <script>
  import authService from "../services/AuthService";
  import BandCard from "../components/BandCard.vue";
  import CyclingWord from '../components/CyclingWord.vue';
  
  
  export default {
    components: {
      BandCard,
      CyclingWord
      
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

      waitForSpotify() {

        
        
      }


    },
    
    beforeCreate() {
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
.page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://res.cloudinary.com/dhimvb83p/image/upload/v1723057687/lgghhapemdvkbeld2bmp.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.5; /* Adjust opacity here */
  background-repeat: no-repeat;
  background-attachment: scroll;
  z-index: -1; /* Ensures background is behind the content */
}

.content {
  position: relative;
  z-index: 1; /* Ensures content is above the background */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

#login,
#bandCardLoginContainer {
  display:flex;
  flex-direction: row;
  justify-content:space-evenly;
  flex-wrap: wrap;

}
#bandCardLogin {
  display: flex;
  flex-direction: column;
  
}
#features{
  
}
#events,
#audio {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

#loginButton{
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
}
#registerButton {
  margin-right: 10px;
  background-color: #F2C864;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
}

</style>