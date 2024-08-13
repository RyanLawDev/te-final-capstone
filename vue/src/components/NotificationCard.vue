<template>
  <div>
    <section class="card" id="bandInfo">
        
          <div class="col-md-4">
          <img v-bind:src="artistUrl" class="card-img" alt="Artist Image" id="bandImage" />
          <h5 class="card-title"> {{ band.name }}</h5>
          </div>
        <div class="card-body">
          <div class="message">
            <h2>To all fans:</h2>
            {{ notification.message }}
          </div>
        </div>
        
      </section>
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
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 10%;
  background-color: #fcf5e5;
}

</style>