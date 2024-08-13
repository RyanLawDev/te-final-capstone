<template>
  <div class="background-image"></div>
  <div class="full-viewport">
    <button id="followed-artists" v-on:click="displayBands" v-show="!clicked">VIEW FOLLOWED ARTISTS</button>
  </div>
  <div id="band-item">
    <band-item :band="band" v-for="band in bands" v-bind:key="band.bandId"> </band-item>
  </div>

</template>

<script>
import BandItem from "./BandItem.vue";
import BandService from "../services/BandService";
import MusicSearchService from "../services/MusicSearchService.js";

export default {
  components: {
    BandItem,
  },
  data() {
    return {
      clicked: false,
      artist: {},
      bands: []
    };
  },
  
  methods: {
    displayBands() {
      for(let i = 0; i < this.$store.state.follows.length; i++) {
      const spotify_token = this.$store.state.spotifyToken;
      MusicSearchService.getArtistById(this.$store.state.follows[i].bandId, spotify_token).then(response => {
        this.artist = (response)
        this.artistUrl = (response.images[0].url)
        this.artistSpotifyUrl = (response.external_urls.spotify)
        this.bands.push(this.artist)
    }
    )
    }
    this.clicked = true;
  }
},

  beforeCreate() {
    BandService.fetchFollows().then(response => {
      console.log(response.data);
      this.$store.commit("SET_USER_FOLLOWS", response.data);
    }).catch(error => {
      console.log(error)
    });
  },
  
};

</script> 

<style scoped>
#whole-card {
  width: 30vw;
}
 .background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://res.cloudinary.com/dhimvb83p/image/upload/v1723057524/tshrlsesbwjos4rygik2.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.6; 
  background-repeat: no-repeat;
  background-attachment: scroll;
  z-index: -1;
 }
</style>