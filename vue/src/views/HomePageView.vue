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
      <div id="bandCardLoginContainer" >
        <band-card id="bandCardLogin" v-bind:band="band"  v-for="band in bands" v-bind:key="band.id"> </band-card>
      </div>

    
    </div>
  </div>
</template>

  
  <script>
  import authService from "../services/AuthService";
  import BandCard from "../components/BandCard.vue";
  import CyclingWord from '../components/CyclingWord.vue';
import BandService from '../services/BandService';
  
  
  export default {
    components: {
      BandCard,
      CyclingWord
      
    },
    data() {
      return {
        bands: [],
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
    
    beforeCreate() {
      BandService.getFeaturedBands().then(response => {
        this.bands = response.data
      }).catch(error => {
            const response = error.response;
          });
    }
  
  };
  </script>
 
<style scoped>
.page {
  position: static;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: fantasy;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://res.cloudinary.com/dhimvb83p/image/upload/v1723057687/lgghhapemdvkbeld2bmp.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.6; 
  background-repeat: no-repeat;
  background-attachment: scroll;
  z-index: -1; 
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}

#login {}
#bandCardLoginContainer {
  display:flex;
  flex-direction: row;
  justify-content:space-evenly;
  flex-wrap: wrap;
  gap: 1rem;

}
#bandCardLogin {
  display: flex;
  flex-direction: column;
  
}
#features{
  font-size: 50px;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  
}

#loginButton{
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
  margin-right: 2em;
}
#registerButton {
  margin-right: 10px;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
}

</style>