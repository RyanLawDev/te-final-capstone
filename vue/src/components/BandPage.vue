<template>
  <div class="bandPage">
    <div class="leftSide">
      <div class="bandContainer">
        <div id="bandName" type="text"> {{ artist.name }}</div>
      </div>

      <div id="bandImage">
        <img v-bind:src="artistUrl" alt="Band Image" class="img-fluid rounded">
      </div>

      <div>
        <button id="followButton" class="btn btn-outline-dark" v-on:click="toggleFollow(artist.id)"
          v-bind:disabled="this.$store.state.token == ''"> {{ this.$store.state.follows.includes(artist.id) ?
            'Unfollow' : 'Follow' }}
        </button>
      </div>

      <div>
        <button id="spotify" class="btn btn-outline-success" v-on:click.stop="openLink(link)" v-bind:href="link"
          target="_blank" v-for="link in artist.external_urls" v-bind:key="link">Spotify</button>
      </div>
    </div>


    <div class="rightSide">
      <div class="accordion" id="accordionAlbums">
        <div id="accordionOne">
          <h2 class="accordion-header" id="headingOne">
            <img id="cover1" :src="album1Cover"  class="album-cover" />

            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
              {{ album1.name }}
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
            data-bs-parent="#accordionAlbums">
            <div class="accordion-body" v-if="albumTracks1.items != null">
              <div v-for="item in albumTracks1.items" :key="item">
                <button id="trackSpotify" class="btn btn-outline-success" v-on:click.stop="openLink(link)"
                  v-bind:href="link" target="_blank" v-for="link in item.external_urls" v-bind:key="link">{{ item.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="accordionTwo">
          <h2 class="accordion-header" id="headingTwo">
            <img :src="album2Cover"  class="album-cover" />

            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              {{ album2.name }}
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
            data-bs-parent="#accordionAlbums">
            <div class="accordion-body" v-if="albumTracks2.items != null">
              <div v-for="item in albumTracks2.items" :key="item">
                <button id="trackSpotify" class="btn btn-outline-success" v-on:click.stop="openLink(link)"
                  v-bind:href="link" target="_blank" v-for="link in item.external_urls" v-bind:key="link">{{ item.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="accordionThree">
          <h2 class="accordion-header" id="headingThree">
            <img :src="album3Cover"  class="album-cover" />

            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">

              {{ album3.name }}
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
            data-bs-parent="#accordionAlbums">
            <div class="accordion-body" v-if="albumTracks3.items != null">
              <div v-for="item in albumTracks3.items" :key="item">
                <button id="trackSpotify" class="btn btn-outline-success" v-on:click.stop="openLink(link)"
                  v-bind:href="link" target="_blank" v-for="link in item.external_urls" v-bind:key="link">{{ item.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="accordionFour">
          <h2 class="accordion-header" id="headingFour">
            <img :src="album4Cover"  class="album-cover" />
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">

              {{ album4.name }}
            </button>
          </h2>
          <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
            data-bs-parent="#accordionAlbums">
            <div class="accordion-body" v-if="albumTracks4.items != null">
              <div v-for="item in albumTracks4.items" :key="item">
                <button id="trackSpotify" class="btn btn-outline-success" v-on:click.stop="openLink(link)"
                  v-bind:href="link" target="_blank" v-for="link in item.external_urls" v-bind:key="link">{{ item.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div id="accordionFive">
          <h2 class="accordion-header" id="headingFive">
            <img :src="album5Cover"  class="album-cover" />
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
              {{ album5.name }}
            </button>
          </h2>
          <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
            data-bs-parent="#accordionAlbums">
            <div class="accordion-body" v-if="albumTracks5.items != null">
              <div v-for="item in albumTracks5.items" :key="item">
                <button id="trackSpotify" class="btn btn-outline-success" v-on:click.stop="openLink(link)"
                  v-bind:href="link" target="_blank" v-for="link in item.external_urls" v-bind:key="link">{{ item.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
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
      album1: {},
      albumTracks1: {},
      album1Cover:'',
      album2: {},
      albumTracks2: {},
      album2Cover:'',
      album3: {},
      albumTracks3: {},
      album3Cover:'',
      album4: {},
      albumTracks4: {},
      album4Cover:'',
      album5: {},
      albumTracks5: {},
      album5Cover:'',
      mbId: '',
      urls: []
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
      MusicSearchService.getAlbumByArtist(bandId, spotify_token).then((response) => {
        this.album = [];
        this.album.push(
          response.items
        );

        this.album1 = (response.items[0]);
        this.album2 = (response.items[1]);
        this.album3 = (response.items[2]);
        this.album4 = (response.items[3]);
        this.album5 = (response.items[4]);
        this.album1Cover= this.album1.images[1].url;
        this.album2Cover= this.album2.images[1].url;
        this.album3Cover= this.album3.images[1].url;
        this.album4Cover= this.album4.images[1].url;
        this.album5Cover= this.album5.images[1].url;

        MusicSearchService.getTracksByAlbum(this.album1.id, spotify_token).then((response) => {
          this.albumTracks1 = (response.albums[0].tracks)
        })
        MusicSearchService.getTracksByAlbum(this.album2.id, spotify_token).then((response) => {
          this.albumTracks2 = (response.albums[0].tracks)
        })
        MusicSearchService.getTracksByAlbum(this.album3.id, spotify_token).then((response) => {
          this.albumTracks3 = (response.albums[0].tracks)
        })
        MusicSearchService.getTracksByAlbum(this.album4.id, spotify_token).then((response) => {
          this.albumTracks4 = (response.albums[0].tracks)
        })
        MusicSearchService.getTracksByAlbum(this.album5.id, spotify_token).then((response) => {
          this.albumTracks5 = (response.albums[0].tracks)
        })
      })
    });
    MusicSearchService.getMBID(bandId).then(response => {
      console.log(response)
      this.mbId = (response.urls[0]["relation-list"][0].relations[0].artist.id)
      console.log(this.mbId)
      MusicSearchService.getLinks(this.mbId).then(response => {
        for (let i = 0; i < response.urls.length; i++) {
                    this.urls.push(
                        this.url = response.urls[i].resource,
                    )
                }
        console.log(this.urls)
      });
    });
  },
  props: [
    'band'
  ]
}
</script>

<style scoped>
.rightSide{
  display: flex;
  margin-left:;
  margin-right: auto;
}
.bandPage {
  display: flex;
  flex-wrap: wrap;
  column-gap: 2em;
  column-width: 40%;
  margin-left: auto;
  margin-right: auto;
}

.rightSide {
  display: flex;
  justify-content: center;
  align-items: center;
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

#trackSpotify {
  display: block;
  margin-bottom: 1%;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
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
