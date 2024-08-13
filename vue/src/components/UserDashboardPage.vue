<template>
  <div class="background-image"></div>
  <div class="full-viewport">
    <button id="followed-artists" v-on:click="displayBands" v-show="!clicked">VIEW FOLLOWED ARTISTS</button>
  </div>
  <div id="band-item">
    <band-item :band="band" v-for="band in bands" v-bind:key="band.bandId">
    </band-item>
  </div>
  <div>
    <button v-on:click="getBands">Refresh Notifications</button>
    <notification-card
      id="notificationCards"
      v-bind:notification="notification"
      v-for="notification in notifications"
      v-bind:key="notification.notificationId"
    />
  </div>
</template>

<script>
import BandItem from "./BandItem.vue";
import NotificationCard from "../components/NotificationCard.vue";
import BandService from "../services/BandService";
import MusicSearchService from "../services/MusicSearchService.js";

export default {
  props: [],
  components: {
    BandItem,
    NotificationCard,
  },
  data() {
    return {
      clicked: false,
      artist: {},
      bands: [],
      notifications: [],
    };
  },

  methods: {
    displayBands() {
      for (let i = 0; i < this.$store.state.follows.length; i++) {
        const spotify_token = this.$store.state.spotifyToken;
        MusicSearchService.getArtistById(
          this.$store.state.follows[i].bandId,
          spotify_token
        ).then((response) => {
          this.artist = response;
          this.artistUrl = response.images[0].url;
          this.artistSpotifyUrl = response.external_urls.spotify;
          this.bands.push(this.artist);
        });
      }
      this.clicked = true;
    },
    getBands() {
      BandService.getNotifications()
        .then((response) => {
          this.notifications = response.data;
          console.log('notifications set');
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },

  //   created() {
  //     this.displayBands()
  // }
}
</script> 

<style scoped>
#whole-card {
  width: 30vw;
  margin-left: 5rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://res.cloudinary.com/dhimvb83p/image/upload/v1723057524/tshrlsesbwjos4rygik2.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.6;
  background-repeat: no-repeat;
  background-attachment: scroll;
  z-index: -1;
 }
 #band-items{
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  
}
@media (max-width: 1200px) {
  #band-items {
  grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 576px) {
  #band-items {
  grid-template-columns: repeat(1, 1fr);
  }
}
</style>