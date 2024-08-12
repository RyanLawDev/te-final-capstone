<template>
  <div id="capstone-app">
    <the-header if="header" />
    <router-view id="viewport" v-if="showView"/>
    <the-footer id="footer" />
    
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import authService from "./services/AuthService";


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

};
#viewport{
 
  

}

</style>