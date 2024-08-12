<template>
  <div>
    <div>
      <div class="full-viewport">
        <div class="form-floating mb-3">
        <h1>Search: 
        <input  class="form-control" id="floatingInput" type="text" name="bandName" placeholder="Search for bands .." v-model="this.$store.state.bandFilter" v-on:keyup="updateArtist">
        </h1>
        </div>
        <div>
            <band-item v-bind:band=band v-for="band in sortedArray" v-bind:key="band.id" > </band-item>
            </div>
            
           </div> 
        </div>
      </div>
</template>
  
<script>
import bandItem from "./BandItem.vue";
import MusicSearchService from "../services/MusicSearchService";

export default {
  data() {
    return {
      artist: [],
      checkSort: []
    };
  },
  components: {
    bandItem,
  },

  computed: {
  sortedArray: function() {
    function compare(a, b) {
      if (a.popularity < b.popularity)
        return 1;
      if (a.popularity > b.popularity)
        return -1;
      return 0;
    }

    return this.artist.sort(compare);
  }
    // filterBands() {
    //   this.refreshSearch

    //     return this.artist.filter((band) => {
    //         let filteredBand = false;
    //             // band.genres.forEach((genre) => {
    //             //         if (!filteredBand) {
    //             //             filteredBand = genre.includes(this.$store.state.bandFilter);
    //             //         }
    //             //     });
    //                     if (!filteredBand) {
    //                         filteredBand = band.name.includes(this.$store.state.bandFilter)
    //                     }
    //                     return filteredBand;
    //     });
    // }
  },
  methods: {
    clearSearch() {
      this.bandFilter = "";
    },

    updateArtist() {
      //if (this.$store.state.bandFilter != "") {
        // console.log(this.$store.state.bandFilter);

        // const spotify_token = this.$store.state.spotifyToken;
        // console.log(spotify_token);
        MusicSearchService.getArtistInfo(
          this.$store.state.bandFilter,
          this.$store.state.spotifyToken
        ).then((response) => {
          this.artist = [];
          for (let i = 0; i < response.artists.items.length; i++) {
            this.artist.push(
              response.artists.items[i]
            );
          }
        });

     // }
    
    }
  
  
},
  

  created() {
    // if (this.$store.state.bandFilter != "") {
    //   console.log(this.$store.state.bandFilter);
      this.artist = [];
      // const spotify_token = this.$store.state.spotifyToken;
      // console.log(spotify_token);
      MusicSearchService.getArtistInfo(
        this.$store.state.bandFilter,
        this.$store.state.spotifyToken
      ).then((response) => {
        for (let i = 0; i < response.artists.items.length; i++) {
          this.artist.push(
            response.artists.items[i]
          );
        }
      });
    //}
  }
};
</script>
<style scoped>
.form-control {
  width: 50%;
}
.full-viewport {
  width: 90vw;
   
  margin: 0; 
  padding: 0; 
  box-sizing: border-box;
}
</style>
  