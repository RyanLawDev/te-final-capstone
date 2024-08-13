<template>
  <div id="capstone-app">
    <the-header id="header" />
    <router-view id="viewport" v-if="showView"/>
    <the-footer id="footer" />
    
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import authService from "./services/AuthService";
import BandService from './services/BandService';


export default {
  data() {
    return {
      showView : false
    }
  },
  components: {
    TheHeader,
    TheFooter,
    
  },

  beforeCreate() {
    if (this.$store.state.spotifyToken == '') {
      authService.getSpotifyToken().then((response) => response.json())
        .then((result) => {
          this.$store.commit("SET_SPOTIFY_TOKEN", result.access_token)
          console.log(this.$store.state.spotifyToken)
          this.showView = true;
        })
        .catch((error) => console.error(error))
    }
    console.log('here')
    if (this.$store.state.follows == '') {
BandService.fetchFollows().then(response => {
      console.log(response.data);
      this.$store.commit("SET_USER_FOLLOWS", response.data);
    }).catch(error => {
      console.log(error)
    });
    }
    }
    
}
</script>

<style>
#capstone-app {
  display: flex;
  flex-direction: column;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
}

#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

#viewport{
  

}
#footer {
 
  text-align: center;
}

</style>