<template>
    <div class="bandContainer">
        <div id="bandName" type="text"> {{ artist.name }}
        </div>
    </div>


  
    <div id="bandImage">
      <img v-bind:src="artistUrl" alt="Band Image" class="img-fluid rounded">
    </div>

 
    <div id="album1Cover">
    <img v-bind:src="album1cover">
    </div>

    <div id="album2Cover">
        <img v-bind:src="album2cover">
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







  <!-- <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        {{ album1.name }}
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"> {{ tracks1 }} </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        {{ album2.name }}
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"> {{ tracks2 }} </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        {{ album3.name }}
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"> {{ tracks3 }} </div>
    </div>
  </div>
  </div> -->








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
      track: [],
      album1: {},
      album1cover: {},
      albumTracks1: {},
      tracks1: [],
      album2: {},
      album2cover:[],
      albumTracks2: {},
      tracks2: [],
      album3: {},
      album3cover:[],
      albumTracks3: {},
      tracks3: [],
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
      let albumId = album;
      const spotify_token = this.$store.state.spotifyToken;
      MusicSearchService.getTrackByAlbum(albumId, spotify_token).then(response => {
        this.track = [];
        for (let i = 0; i < response.tracks.items.length; i++) {
          this.track.push(
            response.tracks.items[i]
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
      MusicSearchService.getAlbumByArtist(bandId, spotify_token).then((response) => {
      this.album = [];
      this.album.push(
          response.items
        );
      this.album1 = (response.items[0]);
      this.album1cover=this.album1.images[1].url
      MusicSearchService.getTrackByAlbum(this.album1.id, spotify_token).then((response) => {
      this.albumTracks1 = (response.albums[0].tracks)
      for (let i = 0; i < this.albumTracks1.length; i++) {
        this.tracks1.push(
          this.albumTracks1.items[i].name
        )
      }
      })
      this.album2 = (response.items[1]);
      this.album1cover=this.album2.images[1].url
      MusicSearchService.getTrackByAlbum(this.album2.id, spotify_token).then((response) => {
      this.albumTracks2 = (response.albums[0].tracks)
      for (let i = 0; i < this.albumTracks2.length; i++) {
        this.tracks2.push(
          this.albumTracks2.items[i].name
        )
      }
      })
      this.album3 = (response.items[2]);
      MusicSearchService.getTrackByAlbum(this.album3.id, spotify_token).then((response) => {
      this.albumTracks3 = (response.albums[0].tracks)
      for (let i = 0; i < this.albumTracks3.length; i++) {
        this.tracks3.push(
          this.albumTracks3.items[i].name
        )
      }
      })
    })
    })
  },
  props: [
    'band'
  ]
}
</script>

<style scoped>
#album1Cover{
display:flex;
margin-right:auto;
margin-left: auto;

}
.bandContainer {
  display: flex;
  align-items: center;
  font-size: 50px;
  font-family:fantasy;
  margin-left:.5%;
}

#spotify {
  display: block;
  margin-top: .5%;
  margin-bottom:.5%;
  margin-right: auto;
  margin-left: .5%;
  width: 30%;
 
}


#followButton {
  display: block;
  margin-bottom: .5%;
  margin-top: .5%;
  margin-left: .5%;
  margin-right: auto;
  width: 30%;
}

#bandImage {
  display: block;
  margin-left: .5%;
  margin-right: auto;
  width: 30%;
}





</style>
