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
 
  
    

  <div id="albumsAccordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          <!-- {{ album.name[1] }} -->
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <!-- <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Collapsible Group Item #3
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div> -->
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
