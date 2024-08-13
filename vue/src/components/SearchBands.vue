<template>
 <div class="background-image"></div>
 <div class="page">
  <div>
    <div>
      <div class="full-viewport">
        <div class="form-floating mb-3">
        <h1>
          <div id="search">Search: </div>
        <input  class="form-control" id="floatingInput" type="text" name="bandName" placeholder="Search for bands .." v-model="this.$store.state.bandFilter" v-on:keyup="updateArtist">
        </h1>
        </div>
        <div id="band-items">
            <band-item v-bind:band=band v-for="band in sortedArray" v-bind:key="band.id" > </band-item>
            </div>
            
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

.page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

  .background-image {
  position: fixed;
  top: 3rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://res.cloudinary.com/dhimvb83p/image/upload/v1723498762/n0pphepygu7hcpa9d5m8.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.6; 
  background-repeat: no-repeat;
  background-attachment: scroll;
  filter: grayscale();
}

#band-items{
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  
  
  
}
@media (max-width: 1200px) {
  #band-items {
  grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 576px) {
  #band-items {
  grid-template-columns: repeat(1, 1fr);
  }
}
h1 {
  margin-left: .5em;
}
#search {
  display: flex;
}
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

background-image: url('https://res.cloudinary.com/dhimvb83p/image/upload/v1723498762/mwry1vetlxbfku5nu3qw.jpg')
  