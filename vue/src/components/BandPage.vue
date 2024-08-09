<template>
    <div class="bandContainer">
        <div id="bandName" type="text"> {{ artist.name }}
        </div>
    </div>


  
    <div id="bandImage">
      <img v-bind:src="artistUrl" alt="Band Image" class="img-fluid rounded">
    </div>



  <div class="overlay">
    <div class="text"> </div>
  </div>


    <div>
        <button id="followButton" class="btn btn-outline-dark" v-on:click="toggleFollow(artist.id)"
            v-bind:disabled="this.$store.state.token == ''"> {{ this.$store.state.follows.includes(artist.id) ? 'Unfollow' :
              'Follow' }}
          </button>
    </div>

    <div>
      <button id="spotify" class="btn btn-outline-success" v-on:click.stop="openLink(link)" v-bind:href="link"
        target="_blank" v-for="link in artist.external_urls" v-bind:key="link">Spotify</button>
    </div>
 
  


  <!-- <div id="bandDescription"> {{ artistSpotifyUrl }} {{ artistUrl }}</div> -->
</template>

<script>

import MusicSearchService from '../services/MusicSearchService';

export default {
  data() {
    return {
      artistSpotifyUrl: "",
      artist: {},
      album: [],
      artistUrl: '',
      track: []
    }
  },
  methods: {
    toggleFollow(bandId) {
      this.$store.commit("TOGGLE_FOLLOW", bandId)
    },
    openLink(url) {
      window.open(url, '_blank');
    },
    getTracks(album) {
      let albumName = album;
      let artistId = this.$route.params.id;
      const spotify_token = this.$store.state.spotifyToken;
      MusicSearchService.getTrackByAlbum(albumName, artistId, spotify_token).then(response => {
        this.album = [];
          for (let i = 0; i < response.albums.items.length; i++) {
            this.album.push(
              response.albums.items[i]
            );
          }
    }
    )
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
    MusicSearchService.getAlbumByArtist(bandId, spotify_token).then((response) => {
          this.album = [];
          for (let i = 0; i < response.albums.items.length; i++) {
            this.album.push(
              response.albums.items[i]
            );
          }
        })
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
  font-size: 50px;
  font-family:fantasy;
}

#spotify{
  display:block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}



#followButton{
  display:block;
  margin-top: .5%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: .5%;
  width: 30%;
}

#bandImage{
  display:block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}
;


</style>