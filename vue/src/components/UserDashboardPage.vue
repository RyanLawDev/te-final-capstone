<template>
  <div class="full-viewport">
    
  </div>
  <div id="bandItem">
    <band-item :band="band" v-for="band in bands" v-bind:key="band.bandId"> </band-item>
  </div>
  

</template>

<script>
import BandItem from "./BandItem.vue";

export default {
  props: [
    'bands',
    'artist'
],
  components: {
    BandItem,
  },
  data() {
    return {
      

    };
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