<template>
  <div class="bandContainer">

    <div id="bandName" type="text"> {{ band.name }} <button v-on:click="toggleFollow(band.id)"
        v-bind:disabled="this.$store.state.token == ''"> {{ this.$store.state.follows.includes(band.id) ? 'Unfollow' :
          'Follow' }}
      </button></div>
    <ul id="theUL">
      <div id="bandMembers" v-bind:band=band v-for="member in band.members" v-bind:key="member"> {{ member }} </div>
    </ul>
    <div id="bandDescription"> {{ band.external_urls.spotify }} {{ band.images[1] }}</div>


  </div>
</template>

<script>

import MusicSearchService from '../services/MusicSearchService';

export default {
  // data() {
  //   return {
  //     artist: []
  //   }
  // },
  methods: {
    toggleFollow(bandId) {
      this.$store.commit("TOGGLE_FOLLOW", bandId)
    }
  },
  // created() {
  //     console.log(this.artist.id)
  //     this.artist = [];
  //     const spotify_token = this.$store.state.spotifyToken;
  //     console.log(spotify_token);
  //     MusicSearchService.getArtistById(this.band.id, spotify_token).then(response => {
  //       this.artist.push(response.band.items)
  //     }
  //   )
  // },
  props: [
        'band'
    ]
}
</script>

<style scoped>
.bandContainer {
  display: flex;


}

;

#bandName {
  font-size: 300px;
}

;

#bandMembers {}

;

#theUL {
  display: flex;


}

/* #bandDescription {
  
} */</style>