<template>
  <div class="bandContainer">
    <div id="bandName" type="text"> {{ artist.name }}
    </div>
  </div>



  <div id="bandImage">
    <img v-bind:src="artistUrl" alt="Band Image" class="img-fluid rounded-start">
  </div>



  <div class="overlay">
    <div class="text"> </div>
  </div>


  <div id="followButton">
    <button class="btn btn-outline-dark" v-on:click="toggleFollow(artist.id)"
      v-bind:disabled="this.$store.state.token == ''"> {{ this.$store.state.follows.includes(artist.id) ? 'Unfollow' :
        'Follow' }}
    </button>
    <div>
      <button id="spotify" class="btn btn-outline-success" v-on:click.stop="openLink(link)" v-bind:href="link"
        target="_blank" v-for="link in artist.external_urls" v-bind:key="link">Spotify</button>
    </div>
    

  </div>
  <div class="albumsAccordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
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
  display: flex;
  justify-content: center;
  align-items: center;
}

#spotify {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}

#bandName {
  display: flex;
  font-size: 3000;
  font-family: monospace;
  color: black;
  justify-content: baseline;
  align-content: end;
}

;

#followButton {
  display: flex;
  justify-content: center;
  align-items: center;
}

#bandImage {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}

;

#followButton {
  text-decoration: none;
  margin-right: 16px;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);

}</style>