<template>
  <div>
    <div class="card" id="bandInfo">
        <div id="card" class="row g-0">
          <div class="col-md-4">
      <img v-bind:src="artistUrl" class="card-img" alt="Artist Image" id="bandImage" />
      <div class="card-body">
        <h5 class="card-title"> {{ band.name }}</h5>
        <div class="message">
          {{ notification.message }}
        </div>
      </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import MusicSearchService from "../services/MusicSearchService.js";

export default {
    props: [
        'notification'
    ],
    data() {
        return {
            artistUrl : '',
            band : {}
        }
    },

    methods: {
        findBand() {
        const spotify_token = this.$store.state.spotifyToken;
        MusicSearchService.getArtistById(
          this.notification.bandId,
          spotify_token
        ).then((response) => {
          this.band = response
          this.artistUrl = response.images[0].url
        });
        
    },
},


    created() {
        this.findBand()
    }
}
</script>

<style scoped>

</style>