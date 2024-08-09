<template>
  <div class="bandContainer">

    <div id="bandName" type="text"> {{ artist.name }}
    </div>
  </div>

  <div id="UL">
    <ul id="theUL">
      <!-- <div id="bandMembers" v-bind:band=band v-for="member in band.members" v-bind:key="member"> {{ member }} </div> -->
    </ul>
    
    
    <div class="container">
      <div class=" image">       
      <img v-bind:src="artistUrl" alt="Band Image" class="img-fluid rounded-start">
    </div>


  <div class="overlay">
    <div class="text"> </div>
  </div>
</div>

    <div id="followButton">
    <button  class="btn btn-outline-dark" v-on:click="toggleFollow(artist.id)"
        v-bind:disabled="this.$store.state.token == ''"> {{ this.$store.state.follows.includes(artist.id) ? 'Unfollow' :
          'Follow' }}
      </button>
    <div>
      <button id="spotify" class="btn btn-outline-success" v-on:click.stop="openLink(link)" v-bind:href="link"
        target="_blank" v-for="link in artist.external_urls" v-bind:key="link">Spotify</button>
    </div>
 
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
  display:flex;
  justify-content:center;
  align-items: center;
}

#spotify{
  display:block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}

#bandName {
  display: flex;
  font-size: 3000;
  font-family:monospace;
  color:black;
  justify-content: baseline;
  align-content: end;
};

#followButton{
  display:flex;
  justify-content:center;
  align-items: center;
}

#bandImage{
  display:block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}
.container {
  position: relative;
  width: 50%;
}

.image {
  display:block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 25%;
  right: 0%;
  height: 100%;
  width: 50%;
  opacity: 0;
  transition: .5s ease;
  background-color:black;
}

.container:hover .overlay {
  opacity: 1;
}

.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>