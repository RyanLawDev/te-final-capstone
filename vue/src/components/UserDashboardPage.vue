<template>
  <div class="full-viewport">
    <button v-on:click="displayBands">VIEW {{ follows.length }} FOLLOWED ARTISTS</button>
  <div id="bandItem">
    <band-item v-bind:band="band" v-for="band in bands" v-bind:key="band.bandId"> </band-item>
  </div>
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
      follows: [],
      artist: {},
      bands: []
    };
  },

  computed: {
    filterBands() {
      return this.$store.state.bands.filter((band) => {
        return this.$store.state.follows.includes(band.id);
      });
    },
  },
  methods: {
    displayBands() {
      for(let i = 0; i < this.follows.length; i++) {
      const spotify_token = this.$store.state.spotifyToken;
      console.log(this.follows[i].bandId);
      console.log(spotify_token);
      MusicSearchService.getArtistById(this.follows[i].bandId, spotify_token).then(response => {
        this.artist = (response)
        this.artistUrl = (response.images[0].url)
        this.artistSpotifyUrl = (response.external_urls.spotify)
        this.bands.push(this.artist)
    }
    )
    }
  }
},

  beforeCreate() {
    BandService.fetchFollows().then(response => {
      console.log(response);
      this.follows = response.data;
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