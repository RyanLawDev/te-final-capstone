<template>
  <div class="bandContainer">

      <div id="bandName" type="text"> {{ artist.name }}
      </div>
          <div>
            <button id="followButton" class="btn btn-outline-dark" v-on:click="toggleFollow(artist.id)"
              v-bind:disabled="this.$store.state.token == ''"> {{ this.$store.state.follows.includes(artist.id) ? 'Unfollow' :
                'Follow' }}
            </button>
            <button id="spotifyLink" class="btn btn-outline-success" v-on:click.stop="openLink(link)"
      v-bind:href="link" target="_blank" v-for="link in artist.external_urls" v-bind:key="link">Spotify</button>
          </div>
     
  </div>
  <div>
    
  </div>


<div id="UL">
   <ul id="theUL">
     <!-- <div id="bandMembers" v-bind:band=band v-for="member in band.members" v-bind:key="member"> {{ member }} </div> -->
    </ul>
    <div id ="bandImage">
      <img v-bind:src="artistUrl" alt="Band Image" class="img-fluid rounded-start" >
    </div>
    </div>

    <!-- <div id="bandDescription"> {{ artistSpotifyUrl }} {{ artistUrl }}</div> -->



</template>

<script>

import MusicSearchService from '../services/MusicSearchService';

export default {
  data() {
    return {
      artistSpotifyUrl:"",
      artist: {},
      artistUrl: ''
    }
  },
  methods: {
    toggleFollow(bandId) {
      this.$store.commit("TOGGLE_FOLLOW", bandId)
    },
    openLink(url) {
      window.open(url, '_blank');
     }
  },
  created() {
      const bandId = this.$route.params.id;
      const spotify_token = this.$store.state.spotifyToken;
      console.log(bandId);
      console.log(spotify_token);
      MusicSearchService.getArtistById(bandId, spotify_token).then(response => {
        this.artist = (response)
        this.artistUrl = (response.images[0].url)
        this.artistSpotifyUrl = (response.external_urls.spotify)
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

#followButton{
  text-decoration: none;
  margin-right:16px;
  border-radius:10px;
  box-shadow: 0px 0px 2px 2px rgb(0,0,0);
  
}

</style>