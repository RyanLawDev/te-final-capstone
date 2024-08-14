<template>
  <div class="background-image"></div>
  <div class="container">
    <div id="band-item">
      <h1>My Bands:</h1>
      <band-item :band="band" v-for="band in bands" v-bind:key="band.bandId">
      </band-item>
    </div>
  </div>
  <div>
    <notification-card
      id="notificationCards"
      v-bind:notification="notification"
      v-for="notification in this.$store.state.notifications"
      v-bind:key="notification.notificationId"
      />
      <button v-on:click="getBands">Refresh Notifications</button>
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
      pageReady : false
    };
  },

  methods: {
    displayBands() {
      
      
    BandService.fetchFollows().then(response => {
      console.log(response.data);
      this.$store.commit("SET_USER_FOLLOWS", response.data);
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
          console.log(this.artist.bandId)
        });
      }
    }).catch(error => {
      console.log(error)
    });
    },


    
    
      
    
    getBands() {
      BandService.getNotifications()
        .then((response) => {
          this.$store.state.notifications = response.data;
          console.log('notifications set');
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },

  computed: {

  },

    created() {
      this.displayBands()
      this.getBands()
  }
}
</script> 

<style scoped>

.container {
  display: flex;

}

.notification {
  flex-basis: 67%;
}

#whole-card {
  width: 30vw;
  height:25vh;
  margin-left: 5rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  min-height:fit-content;
}

#notificationCards {
  display: flex;
  width: 45vw;
  margin-left: 5rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.background-image {
  display: flex;
  justify-content: space-around;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://res.cloudinary.com/dhimvb83p/image/upload/v1723057524/tshrlsesbwjos4rygik2.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.5;
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