<template>
  <div class="full-viewport">
    <button v-on:click="displayBands" v-show="!clicked">VIEW FOLLOWED ARTISTS</button>
  </div>
  <div id="bandItem">
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
  // created() {
  //   for(let i = 0; i < this.follows.length; i++) {
  //   const spotify_token = this.$store.state.spotifyToken;
  //   console.log(this.follows[i].bandId);
  //   console.log(spotify_token);
  //   MusicSearchService.getArtistById(this.follows[i].bandId, spotify_token).then(response => {
  //     this.artist = (response)
  //     this.artistUrl = (response.images[0].url)
  //     this.artistSpotifyUrl = (response.external_urls.spotify)
  //     this.bands.push(this.artist)
  //   }
  //   )
  // }
//}
};

</script> 

<style scoped></style>