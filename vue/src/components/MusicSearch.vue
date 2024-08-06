<template>
    <div>
        <h2>Nasa Picture of the Day</h2>
        <button v-on:click="getInfo" type="button" class="btn btn-outline-primary">Click me to win a prize!!!</button>

        <div v-show="info != {}">
            <p> {{ info }}</p>
        </div>
    </div>
</template>
  
<script>

import MusicSearchService from '../services/MusicSearchService.js';

export default {

    data() {
        return {
            info: {}
        }
    },
    methods: {
        getInfo() {
            const spotify_token = this.$store.state.spotifyToken;
            console.log(spotify_token);
            MusicSearchService.getTrackInfo(spotify_token).then(response => {
                this.info = response.data;
            })
        }
    }
};
</script>
  
<style></style>