<template>
    <div class="bandContainer">
        <div id="bandName" type="text"> {{ artist.name }}
        </div>
    </div>


  
    <div id="bandImage">
      <img v-bind:src="artistUrl" alt="Band Image" class="img-fluid rounded">
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







  <div class="accordion accordion-flush" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        {{album1.name}}
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">This is the first item's accordion body.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        {{ album2.name }}
      </button>
    </h2>
    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        {{ album3.name }}
      </button>
    </h2>
    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
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
      artistSpotifyUrl: "",
      artist: {},
      // album: [],
      artistUrl: '',
      track: [],
      album1: {},
      album2: {},
      album3: {},
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
    }
    )
    MusicSearchService.getAlbumByArtist(bandId, spotify_token).then((response) => {
      this.album = [];
      this.album1 = (response.albums.items[0]);
      this.album2 = (response.albums.items[1]);
      this.album3 = (response.albums.items[2]);
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
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-family:fantasy;
}

#spotify {
  display: block;
  margin-top: .5%;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}


#followButton {
  display: block;
  margin-bottom: .5%;
  margin-top: .5%;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}

#bandImage {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
};




</style>
