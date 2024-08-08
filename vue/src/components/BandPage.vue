<template>
  <div class="bandContainer">

      <div id="bandName" type="text"> {{ artist.name }} 
      </div>
          <div>
            <button v-on:click="toggleFollow(artist.id)"
              v-bind:disabled="this.$store.state.token == ''"> {{ this.$store.state.follows.includes(artist.id) ? 'Unfollow' :
                'Follow' }}
            </button>
          </div>
  </div>


<div id="UL">
   <ul id="theUL">
     <!-- <div id="bandMembers" v-bind:band=band v-for="member in band.members" v-bind:key="member"> {{ member }} </div> -->
    </ul>
    <!-- <div id ="bandImage">
      <img v-bind:src="artist.image[0].url" alt="Band Image" class="img-fluid rounded-start" >
    </div> -->
    </div>

    <div id="bandDescription"> {{ artist.external_urls }} {{ artist.images }}</div> 

  <div id="spotifyLink">
    <button type="button" class="btn btn-outline-success">Spotify</button>
  </div>


</template>

<script>

import MusicSearchService from '../services/MusicSearchService';

export default {
  data() {
    return {
      artist: {}
    }
  },
  methods: {
    toggleFollow(bandId) {
      this.$store.commit("TOGGLE_FOLLOW", bandId)
    }
  },
  created() {
      const bandId = this.$route.params.id;
      const spotify_token = this.$store.state.spotifyToken;
      console.log(bandId);
      console.log(spotify_token);
      MusicSearchService.getArtistById(bandId, spotify_token).then(response => {
        this.artist = (response)
      }
    )
  },
  props: [
        'band'
    ]
}
</script>

<style scoped>
.bandContainer {
  display: flex;
  font-size: 30;
  color:coral;
  justify-content: baseline;
  align-content: end;
}
#spotify{
  display:flex;
  justify-content:center;
  align-items: center;
}


#bandName {
  font-size: 30px;
  justify-content:center;
  align-items: center;
};

#theUL {
  display: flex;


}
</style>