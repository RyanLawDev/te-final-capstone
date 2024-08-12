<template>
  <div class="bandPage">
    <div class="leftSide">
      <div class="frame">

</div>

      <div class="bandContainer">
        <div id="bandName" type="text"> {{ artist.name }}</div>
      </div>

      <div id="bandImage">
        <img v-bind:src="artistImageUrl" alt="Band Image" class="img-fluid rounded">
      </div>


      <div>
        <button id="followButton" class="btn btn-outline-dark" v-if="!followed"
        v-on:click.stop="followBand" v-bind:disabled="this.$store.state.token == ''"
     >FOLLOW
     </button>
     <button id="unfollowButton" class="btn btn-outline-dark" v-else
        v-on:click.stop="unFollowBand" v-bind:disabled="this.$store.state.token == ''"
     >UNFOLLOW
     </button>
      </div>

      <div>
        <button id="spotify" class="btn btn-outline-success" v-on:click.stop="openLink(link)" v-bind:href="link"
          target="_blank" v-for="link in artist.external_urls" v-bind:key="link">Spotify</button>
      </div>
    <div id="links">
          <p> Links for more</p>
    </div>
      <div id="resources" class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
          aria-expanded="false">Resources</button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li v-for="url in urls" v-bind:key="url.index">
            <a class="dropdown-item" v-on:click.stop="openLink(url.href)" v-bind:href="link" target="_blank">
            {{ url.hostname.replace('www.', '') }}
            </a>
          </li>
        </ul>
      </div>
    </div>



    <div class="rightSide">

      <div id="Albums">
      <p>Albums </p>
      </div>

      <div class="accordion" id="accordionAlbums">
        <div id="accordionOne">
          <h2 class="accordion-header" id="headingOne">
            <img id="cover1" :src="album1Cover" class="img-fluid rounded" />

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
            <img :src="album2Cover" class="img-fluid rounded" />

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
            <img :src="album3Cover" class="img-fluid rounded" />

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
            <img :src="album4Cover" class="img-fluid rounded" />
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
            <img :src="album5Cover" class="img-fluid rounded" />
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
import BandService from '../services/BandService.js';

export default {
  data() {
    return {
      follows: [],
      artistSpotifyUrl: "",
      artist: {},
      album: [],
      artistImageUrl: '',
      album1: {},
      albumTracks1: {},
      album1Cover: '',
      album2: {},
      albumTracks2: {},
      album2Cover: '',
      album3: {},
      albumTracks3: {},
      album3Cover: '',
      album4: {},
      albumTracks4: {},
      album4Cover: '',
      album5: {},
      albumTracks5: {},
      album5Cover: '',
      mbId: '',
      urls: []
    }
  },
  computed: {
    followed(){
      let isFollowed = false;
      for (let i = 0; i < this.$store.state.follows.length; i++) {
        if(this.$store.state.follows[i].bandId === this.$route.params.id) {
          isFollowed = true;
        }
      }
      return isFollowed;
    },
    followId() {
      let theFollowId = 0;
      console.log('follows array in vuex store is: ' + this.$store.state.follows.length);
      for (let i = 0; i < this.$store.state.follows.length; i++) {
        if(this.$store.state.follows[i].bandId === this.bandId) {
          theFollowId = this.$store.state.follows[i].id;
        }
      }
      return theFollowId;
    }
  },
  methods: {
    // toggleFollow(bandId) {
    //   this.$store.commit("TOGGLE_FOLLOW", bandId)
    // },
    openLink(url) {
      window.open(url, '_blank');
    },
    followBand() {
            
            BandService.createFollow(this.$route.params.id).then((response) => {

              console.log("Created!");
              console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
            });
        },
    unFollowBand() {
            
            BandService.deleteFollow(this.followId).then((response) => {

              console.log("Deleted!");
              console.log(response.status);
            })
            .catch((error) => {
                console.log(error)
            });
        }
  },
  created() {
    const bandId = this.$route.params.id;
    const spotify_token = this.$store.state.spotifyToken;
    console.log(bandId);
    console.log(spotify_token);
    MusicSearchService.getArtistById(bandId, spotify_token).then(response => {
      this.artist = (response)
      this.artistImageUrl = (response.images[0].url)
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
        this.album1Cover = this.album1.images[1].url;
        this.album2Cover = this.album2.images[1].url;
        this.album3Cover = this.album3.images[1].url;
        this.album4Cover = this.album4.images[1].url;
        this.album5Cover = this.album5.images[1].url;

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
            this.url = (new URL(response.urls[i].resource)),
          )
        }
        console.log(this.urls)
      });
    });
  },
  beforeCreate() {
    if (this.$store.state.token != '') {
      BandService.fetchFollows().then(response => {
        console.log(response);
        this.follows = response.data;
      });
    }
  },
  props: [
    'band'
  ]
}
</script>

<style scoped>
#leftSide {
  position: static;

}

#accordionOne {}

.bandPage {
  display: flex;
  flex-wrap: wrap;
  column-gap: 2em;
  column-width: 40%;
  margin-left: auto;
  margin-right: auto;
  background-color: #ebeddf;
}

.rightSide {
  display: flex;
  flex-direction: column;
  margin-right: .5%;
  margin-left: auto;
  margin-top: .4%;
  color: #ebeddf;
}

.bandContainer {
  display: flex;
  align-items: center;
  font-size: 50px;
  font-family: fantasy;
  margin-left: 3%;
  margin-top:.3%;
  text-decoration-line:underline ;
  text-decoration-color: black;

}

#spotify {
  display: block;
  margin-top: .5%;
  margin-bottom: .5%;
  margin-right: auto;
  margin-left: 3%;
  width: 60%;
}

#resources {
  display: block;
  margin-top: .5%;
  margin-bottom: .5%;
  margin-right: auto;
  margin-left: 3%;
  width: 60%;

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
  margin-left: 3%;
  margin-right: auto;
  width: 60%;
}

#youtube {
  display: block;
  margin-top: .5%;
  margin-bottom: .5%;
  margin-right: auto;
  margin-left: 3%;
  width: 60%;
}

#bandImage {
  display: block;
  margin-left: 3%;
  margin-right: auto;
  margin-top: 2%;
  width: 60%;
}

#Albums {
  display: flex;
  justify-content: center;
  margin-left:auto;
  margin-right:auto;
  color:black;
  font-family:fantasy;
  font-size: 45px;
  text-decoration-line:underline ;
  text-decoration-color: black;
}

#events{
  display:flex;
  justify-content: center;
  margin-left:1%;
  margin-right:auto;
  color:black;
  font-family:fantasy;
  font-size: 45px;
  text-decoration-line:underline ;
  text-decoration-color: black;
}

#links{
  display: flex;
  margin-right: auto;
  margin-left: 3%;
  color:black;
  font-family:fantasy;
  font-size: 45px;
  text-decoration-line:underline ;
  text-decoration-color: black;
}

#resources{
  display: flex;
  margin-right: auto;
  margin-left: 3%;
  color:black;
  font-family:fantasy;
  width: 30%;
}
</style>
