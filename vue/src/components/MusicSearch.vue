<template>
    <div>
        <h2>Search an Artist</h2>
        <input type="text" name="userString" id="userString" placeholder="Search for Artists .." v-model="this.userString">
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
            userString: '',
            info: {}
        }
    },
    methods: {
        getInfo() {
            const spotify_token = this.$store.state.spotifyToken;
            console.log(spotify_token);
            MusicSearchService.getTrackInfo(this.userString, spotify_token).then(response => {
                this.info = response.artists;
            })
        }
    }
};
</script>
  
<style></style>