<template>
  <div class="dashboard">
    <div id="userDashboard">
      <h1 v-if="!isAdminUser">User Dashboard</h1>
      <h2 v-else>ADMIN DASHBOARD</h2>

    </div>
    <div>
      <user-dashboard-page id="dashboardCards" v-bind:artist="artist" v-bind:bands="bands" v-if="!isAdminUser"/>
      <new-notification-form id="newnotificationform" v-else />
      <div class="full-viewport">
    
    </div >
    <div v-if="notificationsReady">
      
    </div>
  </div>
  </div>
</template>

<script>
import UserDashboardPage from "../components/UserDashboardPage.vue";
import NotificationCard from "../components/NotificationCard.vue";
import BandService from "../services/BandService";
import MusicSearchService from "../services/MusicSearchService.js";
import NewNotificationForm from "../components/NewNotificationForm.vue";

export default {
  components: {
    UserDashboardPage,
    NewNotificationForm
  },
  data() {
    return {
      notifications : [],
      artist: {},
      bands: [],
      notificationsReady : false
    }
  },
  computed: {
    isAdminUser() {
      let isAdmin = '';
      console.log(this.$store.state.user.id);
      if(this.$store.state.user.id === 3) {
        isAdmin = true;
      } else {
        isAdmin = false;
      }
      return isAdmin;
    }

  },

  methods: {

    test() {
      console.log('here')
    },
    getBands() {

      BandService.getNotifications().then(response => {

        this.notifications = response.data;
        this.notificationsReady = true;
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
  },

  refresh() {
    if (this.$store.state.follows == '') {
    BandService.fetchFollows().then(response => {
      console.log(response.data);
      this.$store.commit("SET_USER_FOLLOWS", response.data);
    }).catch(error => {
      console.log(error)
    });
    }
  }

  },

  
  beforeCreate() {
      
      this.refresh
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