<template>

        <div class="card" style="width: 18rem;">
            <img v-bind:src="artistUrl" class="card-img-top" alt="...">
            <div class="card-body">
                <button v-on:click="toggleFollow(band.id)"  v-bind:disabled="isDisabled"> {{ this.$store.state.follows.includes(band.id) ? 'Unfollow' : 'Follow' }}
                </button>
                <h5 class="card-title">{{ artist.name }}</h5>
                <p class="card-text">{{artist.genres}}</p>

                <router-link class="btn btn-primary" v-bind:to="{name : 'bandPage', params: {id : band.id}}">Band Page</router-link>
            </div>
        </div>
       
  
</template>

<script>
import MusicSearchService from '../services/MusicSearchService';

export default {
    props: [
        'band'

    ],
    data() {
        return{
            artist: {},
            artistUrl: ''
        
        }
    },
    methods: {
        toggleFollow(bandId) {
            this.$store.commit("TOGGLE_FOLLOW", bandId)
        }
    },
    computed:{
    isDisabled(){
        return this.$store.state.token == ''}
    },
    created() {
      const bandId = this.band.id;
      const spotify_token = this.$store.state.spotifyToken;
      console.log(bandId);
      console.log(spotify_token);
      MusicSearchService.getArtistById(bandId, spotify_token).then(response => {
        console.log(response.images[0].url)
        this.artist = (response)
        this.artistUrl = (response.images[0].url)
      }
    )
    }

};
</script>

<style scoped>

</style>