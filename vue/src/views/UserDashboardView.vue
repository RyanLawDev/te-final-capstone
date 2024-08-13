<template>
  <div class="dashboard">
    <div id="userDashboard">
      <h1>User Dashboard</h1>

    </div>
    <div>
      <button v-on:click="displayBands">VIEW FOLLOWED ARTISTS</button>
      <user-dashboard-page id="dashboardCards" v-bind:artist="artist" v-bind:bands="bands"/>
      <div class="full-viewport">
    <button v-on:click="getBands">Refresh Notifications</button>
    </div>
      <notification-card id="notificationCards" v-bind:notification="notification" v-bind:bands="bands" v-for="notification in notifications" v-bind:key="notification.notificationId"/>
    </div>
  </div>
</template>

<script>
import UserDashboardPage from "../components/UserDashboardPage.vue";
import NotificationCard from "../components/NotificationCard.vue";
import BandService from "../services/BandService";
import MusicSearchService from "../services/MusicSearchService.js";

export default {
  components: {
    UserDashboardPage,
    NotificationCard
  },
  data() {
    return {
      notifications : [],
      artist: {},
      bands: []
    }
  },

  methods: {

    getBands() {

      BandService.getNotifications().then(response => {

        this.notifications = response.data;

      }).catch(error => {
      console.log(error)
    });

    },

    displayBands() {
      for(let i = 0; i < this.$store.state.follows.length; i++) {
      const spotify_token = this.$store.state.spotifyToken;
      MusicSearchService.getArtistById(this.$store.state.follows[i].bandId, spotify_token).then(response => {
        this.artist = (response)
        this.artistUrl = (response.images[0].url)
        this.artistSpotifyUrl = (response.external_urls.spotify)
        this.bands.push(this.artist)
    }
    )
    }
  }

  },

  created() {
    BandService.fetchFollows().then(response => {
      console.log(response.data);
      this.$store.commit("SET_USER_FOLLOWS", response.data);
    }).catch(error => {
      console.log(error)
    });

    this.getBands;
  }
};
</script>

<style scoped>
.dashboard {
  justify-content: center;
  align-items: center;
}

#dashboardCards {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

}

#userDashboard {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>