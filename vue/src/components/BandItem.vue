<template>
  <router-link href="#" v-bind:to="{ name: 'bandPage', params: { id: band.id } }">
    <div id="bandItem" class="card mb-3 shadow p-3 mb-5 bg-body-tertiary rounded" style="max-width: 95vw;">
      <div class="row g-0">
        <div class="col-md-4">
          <img id="bandImage" v-bind:src="band.images.length > 0 ? band.images[0].url : '...'" alt="Band Image"
            class="img-fluid rounded-start">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h3>
              {{ band.name }}
              <p></p>
              <small class="text-body-secondary" v-for="genre in band.genres" v-bind:key="genre">{{ genre
              }}&nbsp;|&nbsp;</small>
            </h3>

            <button id="spotifyLink" class="btn btn-outline-dark" v-on:click.stop="openLink(link)" v-bind:href="link"
              target="_blank" v-for="link in band.external_urls" v-bind:key="link">Artist Spotify Page</button>
            <button id="followButton" class="btn btn-outline-dark" v-on:click.stop="followBand"
              v-bind:disabled="this.$store.state.token == ''"> {{'Follow'}}
            </button>

            <!-- <add-follow v-bind:bandId=bandId v-on:click.stop/> -->
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
//import AddFollow from './AddFollow.vue';
import BandService from '../services/BandService';

export default {
  props: [
    'band'
  ],
  components: {
    //AddFollow
  },
  data() {
        return {
            bandId: this.band.id
        }

    },
  methods: {
    toggleFollow(bandId) {
      this.$store.commit("TOGGLE_FOLLOW", bandId)
    },
    stopPropagation(event) {
      event.stopPropagation();
    },
    openLink(url) {
      window.open(url, '_blank');
    },
    followBand() {
            
            BandService.createFollow(this.bandId).then((response) => {

            console.log(response.data);

            })
            .catch((error) => {
                console.log(error)
            });
        }
  }

};
</script>

<style scoped>
#bandImage {
  width: 150px;
  height: 150px;
}

a {
  text-decoration: none;
}

#spotifyLink {
  text-decoration: none;
  margin-right: 16px;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
}

#followButton {
  margin-right: 16px;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 2px rgb(0, 0, 0);
}
</style>