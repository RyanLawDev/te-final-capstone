<template>
  <div class="backgroundImage"></div>
  <div class="bandPage">
   
      <div class="leftSide">
        <div id="eventTitle">
              <p>Events</p>
            </div>
        <div id="eventList">
            
              <div  id="eventCards">

                <div class="card" id="eventItems" v-for="event in sortedEvents" v-bind:key="event">
                  <div class="card-body">
                    <h3 class="card-title">{{ event.name }}</h3>
                    <p>Date: {{ event['life-span'].begin }}</p>
                  </div>
                </div>

              </div>
        </div>
      </div>

    <div class="rightSide">
      <div id="bandName" type="text">{{ artist.name }}</div>

      <div id="bandImage">
        <img v-bind:src="artistImageUrl !== '' ? artistImageUrl : this.$store.state.altImage2
          " alt="Band Image" class="img-fluid" />
        <div class="genres">
          <small v-for="genre in artist.genres" v-bind:key="genre" class="genre-chip">
            {{ genre }}
          </small>
        </div>
      </div>

      <div>
        <button id="followButton" class="btn btn-dark" v-if="!followed" v-on:click.stop="followBand"
          v-bind:disabled="this.$store.state.token == ''">
          Follow
        </button>
        <button id="unfollowButton" class="btn btn-dark" v-else v-on:click.stop="unFollowBand"
          v-bind:disabled="this.$store.state.token == ''">
          Unfollow
        </button>
      </div>

      <div>
        <button id="spotify" class="btn btn-success" v-on:click.stop="openLink(link)" v-bind:href="link"
          target="_blank" v-for="link in artist.external_urls" v-bind:key="link">
          Spotify
        </button>
      </div>
      <!-- 
    <div id="discography">
        <p> Discography</p>
      </div> -->

      <!-- <div id="discography">
        <p> Discography</p>
      </div> -->
    </div>
    
    <div class="middleArea" id="middleArea">
      <p id="backstage">Backstage</p>
      <!-- <p id="backstage">Backstage</p> -->
      <div id="linkList">
          <!-- <div id="linkTitle">
            Resources
          </div> -->
        <div id="dropdown" v-if="this.urls[1] != undefined">
          <div>
            <ul id="resourceList">
              <p id="resourceCard" class="card" v-for="url in urls" v-bind:key="url.index">
                <a class="card-title" v-on:click.stop="openLink(url.href)" target="_blank">
                  {{ url.hostname.replace("www.", "") }}
                </a>
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>


    <div id="bottomPart">
      <div id="discography">
        Discography
      </div>
    <div id="flexAlbums">
      <div id="Albums" v-if="album1.name != null"></div>

      <div id="Singles" v-else>
        <p>Singles</p>
      </div>

      <div class="accordion" id="accordionOne" v-if="album1.name != null">
        <h2 class="accordion-header" id="headingOne">
          <img id="cover1" :src="album1Cover" class="img-fluid" />

          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
            aria-expanded="false" aria-controls="collapseOne">
            {{ album1.name }}
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
          data-bs-parent="#accordionOne">
          <div class="accordion-body-one" v-if="albumTracks1.items != null">
            <div v-for="item in albumTracks1.items" :key="item">
              <button id="trackSpotify" class="btn btn-light" v-on:click.stop="openLink(link)" v-bind:href="link"
                target="_blank" v-for="link in item.external_urls" v-bind:key="link">
                {{ item.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="accordion" id="accordionTwo" v-if="album2.name != null">
        <h2 class="accordion-header" id="headingTwo">
          <img :src="album2Cover" class="img-fluid" />

          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
            aria-expanded="false" aria-controls="collapseTwo">
            {{ album2.name }}
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
          data-bs-parent="#accordionTwo">
          <div class="accordion-body" v-if="albumTracks2.items != null">
            <div v-for="item in albumTracks2.items" :key="item">
              <button id="trackSpotify" class="btn btn-light" v-on:click.stop="openLink(link)" v-bind:href="link"
                target="_blank" v-for="link in item.external_urls" v-bind:key="link">
                {{ item.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="accordion" id="accordionThree" v-if="album3.name != null">
        <h2 class="accordion-header" id="headingThree">
          <img :src="album3Cover" class="img-fluid" />
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            {{ album3.name }}
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
          data-bs-parent="#accordionThree">
          <div class="accordion-body" v-if="albumTracks3.items != null">
            <div v-for="item in albumTracks3.items" :key="item">
              <button id="trackSpotify" class="btn btn-light" v-on:click.stop="openLink(link)" v-bind:href="link"
                target="_blank" v-for="link in item.external_urls" v-bind:key="link">
                {{ item.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="accordion" id="accordionFour" v-if="album4.name != null">
        <h2 class="accordion-header" id="headingFour">
          <img :src="album4Cover" class="img-fluid" />
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            {{ album4.name }}
          </button>
        </h2>
        <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
          data-bs-parent="#accordionFour">
          <div class="accordion-body" v-if="albumTracks4.items != null">
            <div v-for="item in albumTracks4.items" :key="item">
              <button id="trackSpotify" class="btn btn-light" v-on:click.stop="openLink(link)" v-bind:href="link"
                target="_blank" v-for="link in item.external_urls" v-bind:key="link">
                {{ item.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="accordion" id="accordionFive" v-if="album5.name != null">
        <h2 class="accordion-header" id="headingFive">
          <img :src="album5Cover" class="img-fluid" />
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
            {{ album5.name }}
          </button>
        </h2>
        <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
          data-bs-parent="#accordion">
          <div class="accordion-body" v-if="albumTracks5.items != null">
            <div v-for="item in albumTracks5.items" :key="item">
              <button id="trackSpotify" class="btn btn-light" v-on:click.stop="openLink(link)" v-bind:href="link"
                target="_blank" v-for="link in item.external_urls" v-bind:key="link">
                {{ item.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="singlesList" v-else>
        <div v-for="single in singles" :key="single">
          <button id="trackSingle" class="btn btn-outline-success" v-on:click.stop="openLink(link)" v-bind:href="link"
            target="_blank" v-for="link in single.external_urls" v-bind:key="link">
            {{ single.name }}
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import MusicSearchService from "../services/MusicSearchService";
import BandService from "../services/BandService.js";

export default {
  data() {
    return {
      follows: [],
      artistSpotifyUrl: "",
      artist: {},
      album: [],
      artistImageUrl: "",
      album1: {},
      albumTracks1: {},
      album1Cover: "",
      album2: {},
      albumTracks2: {},
      album2Cover: "",
      album3: {},
      albumTracks3: {},
      album3Cover: "",
      album4: {},
      albumTracks4: {},
      album4Cover: "",
      album5: {},
      albumTracks5: {},
      album5Cover: "",
      events: [],
      mbId: "",
      singles: [],
      urls: [],
    };
  },
  computed: {
    followed() {
      let isFollowed = false;
      for (let i = 0; i < this.$store.state.follows.length; i++) {
        if (this.$store.state.follows[i].bandId === this.$route.params.id) {
          isFollowed = true;
        }
      }
      return isFollowed;
    },
    followId() {
      let theFollowId = 0;
      console.log(
        "follows array in vuex store is: " + this.$store.state.follows.length
      );
      for (let i = 0; i < this.$store.state.follows.length; i++) {
        if (this.$store.state.follows[i].bandId === this.$route.params.id) {
          theFollowId = this.$store.state.follows[i].id;
        }
      }
      return theFollowId;
    },
    sortedEvents() {
      return this.events.slice().sort((a, b) => {
        const dateA = new Date(a['life-span'].begin);
        const dateB = new Date(b['life-span'].begin);
        return dateB - dateA;
      });
    }
  },
  methods: {
    // toggleFollow(bandId) {
    //   this.$store.commit("TOGGLE_FOLLOW", bandId)
    // },
    concertLocation(event) {
      let ret = event.relations.find(e => e.type === 'held at')
      if (ret != '') {
        return ret.place.name
      } else {
        return 'Not Provided'
      }
    },
    openLink(url) {
      window.open(url, "_blank");
    },
    followBand() {
      BandService.createFollow(this.$route.params.id)
        .then((response) => {
          console.log("Created!");
          console.log(response.data);
          BandService.fetchFollows()
            .then((response) => {
              console.log("fetched after follow created!");
              console.log(response.data);
              this.$store.commit("SET_USER_FOLLOWS", response.data);
              console.log("data set in store");
              console.log(this.$store.state.follows);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    unFollowBand() {
      BandService.deleteFollow(this.followId)
        .then((response) => {
          console.log("Deleted!");
          console.log(response.status);
          BandService.fetchFollows()
            .then((response) => {
              console.log("fetched after follow deleted!");
              console.log(response.data);
              this.$store.commit("SET_USER_FOLLOWS", response.data);
              console.log("data set in store");
              console.log(this.$store.state.follows);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    const bandId = this.$route.params.id;
    const spotify_token = this.$store.state.spotifyToken;
    console.log(bandId);
    console.log(spotify_token);
    MusicSearchService.getArtistById(bandId, spotify_token).then((response) => {
      this.artist = response;
      this.artistImageUrl = response.images[0].url;
      this.artistSpotifyUrl = response.external_urls.spotify;
      MusicSearchService.getAlbumByArtist(bandId, spotify_token).then(
        (response) => {
          this.album = [];
          this.album.push(response.items);

          if (response.items != null) {
            this.album1 = response.items[0];
          }
          if (response.items != null) {
            this.album2 = response.items[1];
          }
          if (response.items[0] != null) {
            this.album3 = response.items[2];
          }
          if (response.items[0] != null) {
            this.album4 = response.items[3];
          }
          if (response.items[0] != null) {
            this.album5 = response.items[4];
          }
          this.album1Cover = this.album1.images[1].url;
          this.album2Cover = this.album2.images[1].url;
          this.album3Cover = this.album3.images[1].url;
          this.album4Cover = this.album4.images[1].url;
          this.album5Cover = this.album5.images[1].url;

          MusicSearchService.getTracksByAlbum(
            this.album1.id,
            spotify_token
          ).then((response) => {
            this.albumTracks1 = response.albums[0].tracks;
          });
          MusicSearchService.getTracksByAlbum(
            this.album2.id,
            spotify_token
          ).then((response) => {
            this.albumTracks2 = response.albums[0].tracks;
          });
          MusicSearchService.getTracksByAlbum(
            this.album3.id,
            spotify_token
          ).then((response) => {
            this.albumTracks3 = response.albums[0].tracks;
          });
          MusicSearchService.getTracksByAlbum(
            this.album4.id,
            spotify_token
          ).then((response) => {
            this.albumTracks4 = response.albums[0].tracks;
          });
          MusicSearchService.getTracksByAlbum(
            this.album5.id,
            spotify_token
          ).then((response) => {
            this.albumTracks5 = response.albums[0].tracks;
          });
        }
      );
    });
    MusicSearchService.getSingles(bandId, spotify_token).then((response) => {
      console.log(response);
      for (let i = 0; i < response.tracks.items.length; i++) {
        this.singles.push((this.single = response.tracks.items[i]));
      }
      console.log(this.singles);
    });
    MusicSearchService.getMBID(bandId).then((response) => {
      this.mbId = response.urls[0]["relation-list"][0].relations[0].artist.id;
      console.log(this.mbId);
      MusicSearchService.getLinks(this.mbId).then((response) => {
        for (let i = 0; i < response.urls.length; i++) {
          this.urls.push((this.url = new URL(response.urls[i].resource)));
        }
        console.log(this.urls);
      });
      let loop = 4
      for (let i = 0; i < loop; i++) {
        let offset = (i * 25)
        MusicSearchService.getEvents(this.mbId, offset).then(response => {
          console.log(response)
          loop = (response.count)
          for (let i = 0; i < response.events.length; i++) {
            this.events.push(
              this.event = (response.events[i])
            )
          }
        });
      }
      console.log(this.events)
    });
  },
  beforeCreate() {
    if (this.$store.state.token != "") {
      BandService.fetchFollows().then((response) => {
        console.log(response);
        this.follows = response.data;
      });
    }
  },
  props: ["band"],
};
</script>

<style scoped>
.accordion-header:hover{
transform: scale(1.05);
border-radius: 10px;
box-shadow: 0 0 20px #0b4251(206 0% 0% / 0.3);  


}
#backstage{
  color: #EEEDF2;
  font-family: fantasy;
  font-size: 45px;
  margin-top:4%;
  text-shadow: 2px 2px 2px #333;
}
.card{
  position: relative;
  background-color: #fff; 
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);  
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    transition: transform 0.3s ease;
    margin-left: 3%;
}
#eventList{
  flex-direction: column;
  flex: 1;
  display: flex;
  overflow: auto;
  margin-top:0% ;
  max-height: 75vh;
}
#eventTitle{
  
  margin-bottom: auto;
  color: #EEEDF2;
  font-family: fantasy;
  font-size: 45px;
  text-shadow: 2px 2px 2px #333;

}

.leftSide{
height:auto;
margin-left:1% ;
overflow: auto;


}
#eventItems {
  margin-bottom: 3%;
  margin-right:5%;

}


.leftSide,
.rightSide,
.middleArea {
flex-direction: column;
  flex: 1;
  display: flex;
  /* overflow: auto; */
  margin-top:3% ;
}

/* #discography {
  color: black;
  font-family: fantasy;
  font-size: 45px;
  margin-left: auto;
  /* margin-right: auto;
} */

.rightSide {
  display: block;
  justify-content: center;
  position: static;
  margin-left: 13%;
  /* size: 80%; */
  flex-basis: 15%;
  
}

#bandName {
  display: block;
  justify-content: center;
  margin-right: auto;
  color: #EEEDF2;
  font-family: fantasy;
  font-size: 45px;
  text-decoration-color: black;
  max-width: 60%;
  text-shadow: 2px 2px 2px #333;
}


.bandPage {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  column-gap: 2em;
  column-width: 40%;
  margin-left: auto;
  margin-right: auto;
  
  
}

/* .rightSide {
  margin-right:2;
  margin-left: auto;
  margin-top: .4%;
  color: #FCF5E5;
  width: 16%;
  } */

.bandContainer {
  /* display: flex;
  align-items: center;
  font-size: 45px;
  font-family: fantasy;
  margin-left: 7%;
  margin-top:1%;
  color: black;
  text-decoration-line:underline ;
  text-decoration-color: black; */
}

#spotify {
  display: block;
  margin-top: 0.5%;
  margin-bottom: 0.5%;
  margin-right: auto;
  margin-top: 2%;
  width: 60%;
}

#linkTitle {
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  color: black;
  font-family: fantasy;
  font-size: 45px;
}

#linkList {
  display: flex;
  margin-top: 2%;
  margin-left: 5%;
  margin-right: 5%;
  align-self: center;
  align-items: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

#resourceList {
  width: 100%;
}

#resourceCard {
  width: 100%;
}

#trackSpotify {
  display: block;
  margin-bottom: 1%;
  margin-left: auto;
  margin-right: auto;
  width: 80%;

}

#trackSingle {
  display: block;
  margin-bottom: 1%;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  font-family: fantasy;
  color: black;
}

#followButton,
#unfollowButton {
  display: block;
  margin-bottom: 0.5%;
  margin-top: 3%;
  margin-right: auto;
  width: 60%;
}

#bandImage {
  display: block;
  justify-content: center;
  margin-right: auto;
  margin-top: 2%;
  width: 60%;
  
  /* box-shadow: 0 4px 8px rgba(15, 15, 15, 0.695);
  overflow: hidden; */
}

#Albums {
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  color: black;
  font-family: fantasy;
  font-size: 45px;
  text-decoration-color: black;
}

#Singles {
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  color: black;
  font-family: fantasy;
  font-size: 45px;
  text-decoration-line: underline;
  text-decoration-color: black;
}

#events {
  display: flex;
  justify-content: end;
  margin-top: 9%;
  color: black;
  font-family: fantasy;
  font-size: 45px;
  text-decoration-color: black;
}

#links {
  display: flex;
  margin-right: auto;
  margin-left: 3%;
  color: black;
  font-family: fantasy;
  font-size: 45px;
  text-decoration-line: underline;
  text-decoration-color: black;
}

.genres {
  margin-right: 0.1%;
  margin-left: auto;
  margin-top: 2%;
  margin-bottom: 2%;
}

.middleArea {
  
  
  margin-top:2% ;
}

.dropdown {
  flex-direction: column;
  flex: 1;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  margin-top:9% ;
}

.genre-chip {
  display: inline-block;
  background-color: #e0e0e0;
  border-radius: 8px;
  padding: 3px 6px;
  margin-right: 3%;
  margin-left: auto;
  font-size: 0.875rem;
  color: #333;
  display: inline-block;
  background-color: #e0e0e0;
  border-radius: 12px;
  padding: 5px 10px;
  margin: 2px;
  font-size: 0.875rem;
  color: black;
}

.accordion-header {
  max-width: 90%;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.accordion-body {
  font-size: 50px;
  color: black;
  width: 90%;
}

#flexAlbums {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
  margin-bottom: 2%;
  width: 90%;
  
}

#accordionOne {
  margin-right: 3%;
  max-width: 90%;
}

#accordionTwo {
  margin-right: 3%;
  max-width: 90%;
}

#accordionThree {
  margin-right: 3%;
  max-width: 90%;
}

#accordionFour {
  margin-right: 3%;
  max-width: 90%;
}

#accordionFive {
  max-width: 90%;
}

#discography {
  
  margin-top: auto;
  margin-bottom: auto;
  color:#EEEDF2;
  font-family: fantasy;
  font-size: 45px;
  text-shadow: 2px 2px 3px #333;
}

.backgroundImage {
  background-image: url('https://res.cloudinary.com/dhimvb83p/image/upload/v1723730639/hondcgwxxbcw1h06rgb3.jpg');
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.6; 
  background-repeat: no-repeat;
  background-attachment: scroll;
  filter: grayscale();
  z-index: -1;
}

#bottomPart {
  margin-right: auto;
  margin-left: auto;
}
</style>
